const e=[],s={label:"Rust无锁编程之Crossbeam Epoch算法解析",description:"上次的文章介绍了无锁数据结构的内存管理机制 EBR，该机制相较于其他的内存管理机制具有更高的执行效率。然而由于理念的复杂性，EBR 的实现并不容易，为每一个无锁数据结构从头实现 EBR 也无必要，因此很自然得大家会考虑将 EBR 的核心理念 epoch 抽取出来变成库，让大家能够复用。Crossbeam-epoch 是一套成熟的被大家广泛使用的 EBR 库，本文将从实现原理部分进行较为详细的解析，并且在此过程中进行。",location:"河南",author:["施继成"],tags:["Rust"],date:"2022-05-27",title:"Crossbeam Epoch Algorithm for Lock Free Programming in Rust"},a=[{label:"Pin 到底做了什么",level:2},{label:"垃圾回收机制",level:2},{label:"List",level:3},{label:"Queue",level:3},{label:"总结",level:2}],l=`<p>上次的文章介绍了无锁数据结构的内存管理机制 EBR，该机制相较于其他的内存管理机制具有更高的执行效率。然而由于理念的复杂性，EBR 的实现并不容易，为每一个无锁数据结构从头实现 EBR 也无必要，因此很自然得大家会考虑将 EBR 的核心理念 epoch 抽取出来变成库，让大家能够复用。Crossbeam-epoch 是一套成熟的被大家广泛使用的 EBR 库，本文将从实现原理部分进行较为详细的解析，并且在此过程中进行。</p>
<p><strong>Guard 只是最外层的壳</strong><br>
如前文所述，大家一般在和 Crossbeam-epoch 进行交互时仅仅使用 guard，如下所示：</p>
<pre><code class="hljs language-rust"><span class="hljs-comment">/// delete data</span>
{
    <span class="hljs-keyword">let</span> <span class="hljs-variable">guard</span> = epoch::<span class="hljs-title function_ invoke__">pin</span>();
    guard.<span class="hljs-title function_ invoke__">defer</span>(<span class="hljs-keyword">move</span> || mem.<span class="hljs-title function_ invoke__">release</span>());
}

<span class="hljs-comment">/// get data for reading</span>
{
    <span class="hljs-keyword">let</span> <span class="hljs-variable">guard</span> = epoch::<span class="hljs-title function_ invoke__">pin</span>();
    <span class="hljs-keyword">let</span> <span class="hljs-variable">value</span> = map.<span class="hljs-title function_ invoke__">get</span>(&#x26;key, &#x26;guard);
    <span class="hljs-comment">/// ... Use the value</span>
}
</code></pre>
<p>在读取数据的时候，guard 扮演的角色仅仅是生命周期守护者，其确保获取出来的 data 引用（上述代码中的 value）生命周期一定不长于 guard，当 guard 被销毁时，value 也一定被销毁。删除数据过程中，guard 扮演的角色要更复杂一些，其负责将销毁函数注册到 defer 延迟执行的队列中。至于该销毁函数何时被调用，则需要进一步深入了解其内部实现细节。</p>
<h2 id="pin-到底做了什么">Pin 到底做了什么</h2>
<p>epoch::pin() 到底做了什么，官方的代码注释中给出了解释，即将当前的 thread pin 住，以便将堆上数据的指针放到栈上。该解释其实只解释了上述读取数据本分的内容，其底层执行的操作如下：</p>
<ol>
<li>将当前线程注册到 Global 收集器，该注册过程每个线程仅仅做一次。</li>
<li>获取当前全局 Epoch 并设置到当前线程，表示在 pin 有效的这段时间，当前线程属于哪个 Epoch。</li>
<li>记录当前线程已经被 pin 的次数，当次数达到一定数量，尝试让 Global 收集器推进 Epoch 增长，回收垃圾。</li>
<li>增加 guard_count 计数，记录有多少 guard 被创建出来且还没有被销毁。</li>
</ol>
<p>这里提及的 Global 收集器负责所有资源的回收工作，其从各个线程收集需要回收的垃圾，并在适当的时机进行回收。</p>
<p><strong>Epoch 推进</strong><br>
Epoch Number 需要不停向前迭代，在迭代的过程中，垃圾回收器将隶属与老的 Epoch Number 的可回收垃圾回收掉。每次 Global 收集器想要回收垃圾时都会尝试推进 Epoch Number，满足下列条件则 Epoch Number 向前推进成功：</p>
<ol>
<li>所有注册的线程都处于当前的 Epoch，即不存在线程处于上一个 Epoch。</li>
</ol>
<p>如果条件不满足则 Epoch 推进失败。具体实现请参见 internal.rs 文件中 <code>Global</code> struct 的 <code>try_advance</code> 方法。</p>
<h2 id="垃圾回收机制">垃圾回收机制</h2>
<p>如果所有的线程都将待回收的垃圾注册到 Global 收集器，那么会出现非常巨大的竞争关系，线程越多操作越频繁则性能影响越大。为了解决共享数据结构造成的竞争，每个线程都会维护自己的垃圾回收队列，队列长度为 62（神奇的 magic number，猜测和 CPU cache line 相关）。当队列被装满时，线程会将本地的队列中的数据统一移动到到 Global 收集器，放到收集器的垃圾链表当中。这里值得注意的是，放入链表的除了垃圾回收函数，还有该垃圾产生的 Epoch Number，该数字被用于决定是否可以回收对应的垃圾。</p>
<p>垃圾回收的触发点有两个，一个主动一个被动。主动的触发点为 Guard 的 flush 方法，调用该方法则会使得 Global 收集器尝试收集垃圾链表中的垃圾。被动的触发点为 Guard 的 pin 方法，即 pin 每被调用 128 次会触发一次垃圾回收。</p>
<p>满足下列条件的垃圾可以被回收：</p>
<ol>
<li>(Global Epoch Number) > ((Garbage Epoch Number) + 1)，即垃圾对应的 Epoch 至少比当前 Epoch 早两个世代。</li>
</ol>
<p>具体实现请参见 <code>internal.rs</code> 文件中 <code>Global</code> struct 的 <code>collect</code> 方法。</p>
<p><strong>内部数据结构</strong><br>
其内部数据结构值得一提有两个，一个 List，一个 Queue。List 被用于管理注册的线程，Queue 被用于管理等待被回收的垃圾。这两个数据结构的共同点是被多个线程同时操作，为了高效的实现，crossbeam 没有使用 Lock 来保护数据结构，而是实现了内部的无锁数据结构。</p>
<h3 id="list">List</h3>
<p>List 有新元素插入方法，插入的方法就是将新元素插入到 List 的 head 位置，实现中使用了 CAS 原子操作。在多线程同时进行插入时，同一时间只有一个能够成功，失败的操作会获得新的 header 值进行再次尝试。</p>
<p>List 删除操作并不真正移除元素，而是在该元素上进行标记，最后在某次 Iteration 过程中被真正删除，该删除操作也使用了 CAS 原子操作。如果有多个线程在尝试删除同一个元素，只有一个能够成功。如果在删除某个元素时发现其前一个元素也被标记为可被删除，则通知 Iteration 调用方需要重头再遍历一次。当然调用方可以根据情况重头遍历，还是留给其他人来处理。</p>
<p>具体实现请参见 list.rs 文件。</p>
<h3 id="queue">Queue</h3>
<p>Queue 的插入和 List 类似，区别在于插入点为 tail。Queue 的删除操作叫做 pop，从 Queue 的 head 开始弹出数据，如果弹出数据出错则说明有其他线程也在进行弹出操作，那么需要重新使用获取 head 的位置再次尝试。</p>
<p>那些从 List 和 Queue 中删除的元素如何处理呢？crossbeam 采用了自举的方法，即也放入垃圾回收队列中，等待之后的某次操作触发垃圾回收。</p>
<h2 id="总结">总结</h2>
<p>Crossbeam-epoch 给大家提供了一个极其方便的工具，将 epoch 的实现细节隐藏在库中，暴露给用户极其简单的接口，使得大家在实现无锁数据结构时更多关注数据结构的细节，将内存回收工作交给 Crossbeam-epoch 来处理即可。</p>`;export{e as assetURLs,l as default,s as metadata,a as toc};
