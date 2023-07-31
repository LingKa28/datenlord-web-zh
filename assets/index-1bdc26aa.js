const t=[],s={label:"创业公司为什么要选 Rust 做 RDMA 库？",description:"RDMA（Remote Direct Memory Access）是近年越来越热门的高速网络传输协议，被广泛应用于超算中心和高端存储领域，用于缩短网络延迟、提高网络带宽。但是 RDMA 的 API 接口非常难以使用，且错误地使用很容易造成程序错误甚至数据丢失。",location:"浙江",author:["施继成"],editor:["李慧文"],tags:["RDMA"],date:"2022-06-24",title:"Why should a startup choose Rust for an RDMA library"},o=[],R=`<p>RDMA（Remote Direct Memory Access）是近年越来越热门的高速网络传输协议，被广泛应用于超算中心和高端存储领域，用于缩短网络延迟、提高网络带宽。但是 RDMA 的 API 接口非常难以使用，且错误地使用很容易造成程序错误甚至数据丢失。</p>
<p>跨云存储厂商达坦科技（DatenLord）的联合创始人施继成曾在 Google、微软和阿里巴巴等一线大厂从事操作系统和分布式系统的研究和开发工作，为了更好地专注于自己喜欢的领域选择了创业。同时他也是 QCon+案例研习社的讲师，将在极客时间分享他们在 RDMA 中使用 Rust 的经验。InfoQ 有幸采访了他，请他来分享在云原生高性能存储平台方面创业的故事和经验。</p>
<p><strong>InfoQ：您为什么选择了云原生高性能存储平台这个赛道进行创业呢</strong><br>
<strong>施继成</strong>：选择云原生高性能存储的原因是这个领域还有比较多问题亟待解决，用户的使用还不太方便和快捷，比如我们正在专注的跨云存储领域现有的相关技术还不够成熟和完善。同时这些相关技术又很有深度和难度，这样有挑战性且能给用户提供帮助的事情就非常吸引我。</p>
<p><strong>从市场角度而言，跨云存储的需求量在最近几年将迎来巨大的增长</strong>：首先越来越多的客户采用多云或混合云架构，同时云厂商巨头由于商业利益的原因，在跨云场景缺乏技术革新的动机，这就激发出一片可观又值得进入的跨云市场。现在有一些创业公司在做离线冷数据的跨云迁移和备份，但是对于热数据的跨云访问问题还没有成熟的解决方案，这也正是我们在尝试取得突破的赛道。</p>
<p><strong>InfoQ：RDMA 高速网络协议被广泛使用于现代数据中心，它有什么技术痛点呢？</strong><br>
<strong>施继成</strong>：RDMA 现阶段已经得到大家的广泛认可，但是 RDMA 大规模使用的时候还存在一些技术痛点，例如大规模 RDMA 网络的流量控制、RDMA 应用的内存自动管理、如何让 RDMA 适配广域网场景等等。除了这些技术痛点，新手在接触 RDMA 相关技术时还面临着技术门槛高而导致的上手困难问题，比如出错信息晦涩，进而导致纠错难之类的问题等等。</p>
<p><strong>InfoQ：为什么您的团队选择了 Rust 做 RDMA 库呢？Rust 有什么核心特性，吸引了您的团队呢？能介绍下您的团队当时选型语言的思考吗？比如横向对比一下 Rust、C、Go 等热门语言，给读者提供一些语言选型参考呢？</strong><br>
<strong>施继成</strong>：我们团队选择 Rust 语言是看好其在高性能基础软件中的发展势头。当然，我们也考虑过其他编程语言，例如 Go 语言和 C/C++ 语言。</p>
<p>Go 语言在云原生领域具有统治地位，绝大多数的框架和库都是用 Go 语言完成的，但是 Go 语言的性能并不优异，和 C/C++ 这类语言比还有不小差距，而我们需要提供的是极致性能的存储产品，所以 Go 语言没有成为我们的主要编程语言。</p>
<p>C/C++ 性能非常好，也是基础系统最常使用的语言，但是这两门语言在使用上的规约性较少，程序员很容易写出不自知的 Bug，找出这些问题非常费时费力，因此也会影响系统的稳定性。</p>
<p>相比之下，<strong>Rust 语言在内存安全和多线程安全性方面有语言级别的支持，能够大大减少相关错误发生的概率；而且其零代价高层抽象的特性能够同时满足高性能需求和软件高级别抽象的需求。</strong></p>
<p><strong>Rust 语言在我看来就是新时代的 C 语言。</strong> 连 Linux 内核都开始尝试接收 Rust 语言作为第二门官方编程语言，可见其在基础底层软件开发上的受欢迎程度。</p>
<p>在实际项目中语言仅仅是工具，选择更多的是看需求，例如在容器领域 K8s 占据了主导地位，那么 Go 语言就非常适合在这个场景下开发，原因是周围的其他的库也都是这个语言，成熟的成功案例也比较好找，容易学习和开发。所以对开发语言的选型更多是根据使用场景，偏底层的基础软件系统开发适合用 Rust 或 C，偏上层的应用层适合用 Go 或 Java。</p>
<p><strong>InfoQ：您的团队通过 Rust 实现了 RDMA API 管理库，能否介绍一下该库的设计思路和实施方案呢？</strong>
**施继成：**我们实现的 Rust RDMA 库主要解决了以下几个问题：</p>
<ul>
<li>让 Rust 语言直接调用 RDMA 的 API</li>
<li>安全且高效地管理 RDMA 的内存资源</li>
<li>在底层的 RDMA ibverbs 接口上封装高级的抽象层，实现多台机器的内存资源能统一管理。</li>
</ul>
<p>我们主要利用了 Rust 语言的所有权机制和引用计数机制，保证了单机内存资源的安全访问和及时释放；同时我们利用了 Tokio 异步执行库的优势封装了异步接口，使得 RDMA 接口可以在 Rust 异步方法中被调用，提高了数据并发传输的效率；最后我们提供了一套上层接口，方便多台机器管理 RDMA 内存块，减少因为机器间协同出错造成性能下降的可能性。</p>
<p><strong>InfoQ：在使用 Rust 进行开发时，你们遇到的最大的难题是什么？是如何解决的呢？能否举个例子分享下呢？</strong><br>
<strong>施继成：</strong> 使用 Rust 语言我们遇到的最大困难点在于如何改变思维方式，按照传统的方式去设计程序往往会让 Rust 语言写起来特别痛苦，需要花大量时间和编译器作斗争。解决的方法也很直接，就是不断学习其他开源项目的经验，并在实践中不断总结经验，按照 Rust 那套“安全”的思路来设计程序，慢慢地就能够比较顺滑得使用 Rust 语言了。</p>
<p>举个例子，我们最开始使用 Rust 的时候往往摆脱不了 C/C++ 中指针传递的习惯，因为这是最廉价和高效的内存共享方式，然而不加节制的内存共享会导致内存访问的安全问题。因此 Rust 语言禁止这些行为的发生，也导致我们早期和编译器进行了不少的“搏斗”，最后通过对 Rust 背后设计理念的理解，优化我们产品设计的同时也提高了开发的效率。</p>
<p><strong>InfoQ：您觉得目前的 Rust，还有哪些亟需攻克的难点呢？</strong><br>
<strong>施继成：</strong> Rust 语言的上手难度还是比较大，对于初学者的要求比较高，学习曲线过于陡峭等问题会阻碍一部分爱好者深入了解的兴趣。Rust 语言本身和周边设施也存在一些问题需要解决，其中我们遇到的一个问题是异步执行器不统一，导致选择的时候需要“站队”，而同时支持多种异步执行器的库并不多，所以一旦选择了某个执行器很可能就无法使用某些很好用的库。这也是 Rust 生态在演化过程中带来的问题，相信随着 Rust 生态越来越成熟完善，这些框架不统一的问题会逐步消除。</p>
<p>现阶段这些问题是整个 Rust 社区共同需要面对的问题，大多也都还没有解决，因此我们也只能寻找一些折中的解决方案，比如在选择执行器方面我们会选择使用最广泛的异步执行器。当然我们也在尝试为社区提供一些解决方案，比如目前还在规划中的异步执行统一库，可以让用户在编译时动态选择想要使用的异步执行器，而不是在编码层面直接绑定。这些工作还在推进中，当然因为工作量着实不小，还需要不少时间来推进。</p>
<p><strong>InfoQ：作为一家创业公司，使用 Rust 这样较新、受众少的语言，会不会比较冒险呢？是否也会增加客户的学习成本呢？</strong><br>
<strong>施继成：</strong> 这个问题非常好，这的确是有一定的冒险性，这个冒险性主要在开发过程中，对于用户没有什么影响。Rust 现阶段虽然热度很高，但还算是小众语言，学的人很多，会的人很少，想要找到我们需要的人才就会相对困难一些。不过也有一些“意外”的好处，在我们的有限接触范围内发现，凡是对 Rust 语言能够深入学习了解和使用的工程师，往往在工程和技术层面都有不错的积累，会比较符合达坦科技对技术人员的要求，这可能是 Rust 语言本身高门槛带来的一些“好处”。</p>
<p><strong>InfoQ：在存储外，您觉得还有哪些场景特别适合 Rust 大展神通呢？</strong>
<strong>施继成：</strong> 上面有提到，Linux 系统已经在尝试使用 Rust 语言，可见 Rust 语言在操作系统领域是很有可能大展神通的。</p>
<p>此外，据我所知，Rust 语言在区块链领域也被广泛使用。</p>
<p><strong>InfoQ：作为一家创业公司的 CTO，您对新员工有什么期许吗？最看重应聘者的哪些特点呢？</strong>
<strong>施继成：</strong> 达坦科技（DatenLord）的招聘策略是少而精，我希望新员工有以下特质：</p>
<ol>
<li>拥抱开源：因为我们是国内首家同时开源 RDMA 软硬件解决方案的公司，开源写入了公司的基因。而且那些能够给开源社区积极做贡献的程序员往往也更加有主观能动性和创造力，公司也需要这样的人才。</li>
<li>基础扎实：创业团队每天都在做非常具有挑战的事情，技术方向上有时也会发生变化，只有基础扎实才能在这些攻坚和方向转变的时候表现良好。</li>
<li>积极主动：在当前疫情的影响下，达坦科技（DatenLord）响应政府的号召实行远程办公，这更需要员工有很强的自驱能力。</li>
</ol>
<p>此外，我们倾向于选择使用 Rust 的工程师。我觉得能够深入了解和掌握 Rust 语言本身就是一张很好的名片，体现了应聘者优秀的学习能力。对达坦科技（DatenLord)而言，会用 Rust 语言也会大大缩短“热身”时间，能尽快投入项目中，也就更受我们青睐。</p>`;export{t as assetURLs,R as default,s as metadata,o as toc};
