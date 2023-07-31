const t="/datenlord-web-zh/assets/image1-6f352053.png",s=[t],r={label:"精彩回顾 I Rust China Hackathon 2022 达坦科技组",description:"由Rust中文社区举办的题为「Rust For Fun」的首届Rust China Hackathon已经顺利完赛。达坦科技作为本届Hackathon的协办方，赞助参与本次企业组赛道。达坦科技组的赛题有关Concurrent Indexing，我们邀请参赛者通过创建一个并发索引来解决处理来自客户端的对于分布式元数据KV存储器的高并发请求。",location:"新加坡",date:"2023-01-12",title:"Rust China Hackathon 2022 Datan Technology Group"},n=[{label:"评选结果",level:2},{label:"二等奖获奖点评",level:2},{label:"三等奖获奖点评",level:2},{label:"获奖快问快答",level:2}],o=`<p>由 Rust 中文社区举办的题为 <strong>「Rust For Fun」<strong>的</strong>首届 Rust China Hackathon</strong> 已经顺利完赛。达坦科技作为本届 Hackathon 的协办方，赞助参与本次企业组赛道。达坦科技组的赛题有关 Concurrent Indexing，我们邀请参赛者通过创建一个并发索引来解决处理来自客户端的对于分布式元数据 KV 存储器的高并发请求。</p>
<p>这个赛题吸引了不少对 Rust 语言有学习热情，并有志于提高 Rust 应用实践能力伙伴前来进行思维的碰撞。最终有 6 支队伍在比赛通关关闭之前提交了代码，他们中有上班族，也有在校学生。达坦科技组 Concurrent Indexing 赛题评审委员会按照代码完成度和性能表现两个维度进行综合评判，最终做出如下评审结果。</p>
<h2 id="评选结果">评选结果</h2>
<p><strong>一等奖：</strong> 无</p>
<p><strong>二等奖：</strong> 摆摆队</p>
<p><strong>三等奖：</strong> Day Day Rust 队</p>
<p><strong>参与奖：</strong> 除了以上二等奖和三等奖外，所有最终参加 Rust China Hackathon 2022 达坦科技组的参赛队伍，共四支，分别为：Plus1s，Xlv，孤独摇滚！，BuckWang。</p>
<h2 id="二等奖获奖点评">二等奖获奖点评</h2>
<p><strong>二等奖，500 美金：摆摆队-钟弋辰</strong></p>
<p><strong>获奖队伍简介：</strong><br>
团队成员均为大学在校生：<br>
队长：钟弋辰-东华大学研一<br>
队员：苏金阳-合肥工业大学大学大二；陈靖珏-成都信息工程大学大四；刘涵铭-成都信息工程大学大三；田书繁-成都信息工程大学大四</p>
<p><strong>评委会点评：</strong><br>
<strong>综述：</strong> 摆摆队在较短的时间内根据论文实现了一个无所跳表结构，虽然性能仍然不如开源的 crossbeam-skiplist，但是鉴于无锁数据结构的复杂性和代码较高的完成度，这是一次非常成功的尝试。</p>
<p><strong>代码完成度：</strong> 4 分 根据文论实现了一个无锁 skiplist，完成了论文中的基础能力。是本次参赛队伍中唯一成功完成一个无锁数据结构的选手。</p>
<p><strong>性能表现 ：</strong> 3 分 项目中也与 crossbeam-skiplist 版本进行比较， 性能稍稍落后，因此以 crossbeam-skiplist 的版本为准。</p>
<p><strong>代码链接：</strong><br>
<a href="https://github.com/ActivePeter/rustChinaHackathon22">https://github.com/ActivePeter/rustChinaHackathon22</a></p>
<h2 id="三等奖获奖点评">三等奖获奖点评</h2>
<p><strong>三等奖，300 美金：daydayrust-陈歌</strong></p>
<p><strong>获奖队伍简介：</strong><br>
陈歌，硕士毕业于上海交通大学-电子信息与电气工程学院-网络安全技术研究院，现就职于零幺宇宙（上海）科技有限公司，负责区块链优化和分布式数字身份搭建。</p>
<p><strong>评委会点评：</strong><br>
<strong>综述：</strong> daydayrust 虽然只有 crossbeam 封装版本的代码能够正确运行，但是仍然观察到行业内的其他开源解决方案，并且尝试将其移植到该项目进行性能对比。虽然移植的部分最终没有完全完成，但是鉴于时间的长度对于项目移植来说过于紧张，这仍然是一次很棒的尝试。</p>
<p><strong>代码完成度：</strong> 3.5 分 能够运行的代码使用的是 crossbeam-skiplist 的二次封装。代码中有尝试 port 微软的 KV 系统 faster， 并且实现了 binding，该实现在并发写方面理论上更具有优势，是一次不错的尝试。</p>
<p><strong>性能表现：</strong> 3 分 可以运行的版本是基于 crossbeam-skiplist 为基础，因此以此为准。</p>
<p><strong>代码链接：</strong><br>
<a href="https://github.com/cgair/rustChinaHackathon22">https://github.com/cgair/rustChinaHackathon22</a></p>
<h2 id="获奖快问快答">获奖快问快答</h2>
<p><strong>Q：为什么选择达坦科技 Concurrent Indexing 这个赛题？参赛前后，你对 Concurrent Indexing 的认识和了解有什么变化？</strong></p>
<p><strong>钟弋辰：</strong> 一是技术上对存储和性能优化比较感兴趣，并发是一个比较核心的性能优化问题，之前没用 rust 写过 KV 的数据结构，看到这个题目感觉很有意思，是一个很好的锻炼机会。二是对达坦科技这家公司感兴趣，之前在一个 rust conf 大会了解到这家公司，做软硬件结合的混合云存储，个人对云存储比较感兴趣。参赛前后就这一赛题整体感觉是对技术实现和应用在思考解法时会更加具体化，比如具体的实现并发的跳表，要做很多细节上的权衡。</p>
<p><strong>陈歌：</strong> 首先我个人倾向于解决一些明确的问题。主要因为在公司做的是 system 相关，所以会喜欢解决问题类的题目。<br>
同时达坦的这个题目本身和自己的专业经验比较 match，之前在学校和公司里分布式存储相关的经验会比较多。最后是希望通过这个比赛提升自己的专业技术能力。此次参赛，让我对 CI 的认识变化，或者说更具体到 Lock-Free Programming 和 rust 的 lock-free data structure 的理解和认识有加深。对生产中一些轮子的源码、工具等有了更深的认识。最主要的不是代码本身，更多是对知识的学习、理解和应用会更深刻，这个是对个人有非常大的价值的。</p>
<p><strong>Q：你对于要求实现一个高速并发的 Index 数据结构，一开始想到哪些设计思路？</strong></p>
<p><strong>钟弋辰：</strong> 一开始想到的如果是 hash 的 key ，可以做一个分段分桶锁的操作；但题目给的是只有 ord 接口，那么可以考虑的方案就是实现并发的树结构或者跳表。树结构我了解的 b+树中通过 crabing lock 局部加锁来提高锁的并发性。最后选择跳表，因为其结构相对于 b 树简单，实现起来更有把握。链表结构更便于实现无锁化的操作，同时范围查询时直接扫描链表，效率比较高。</p>
<p><strong>陈歌：</strong> 目前索引的实现是 Lock + Btree，但是，这会产生一些影响（抑制 scalability、deadlocks 等）。我首先想到的是使用 reader-writer lock，但是在写入频率高的场景下，我希望找到一种方法，让并发写入不互斥地进行，这就需要 lock-free 的数据结构。</p>
<p><strong>Q：在具体设计和实现的过程中，你碰到最大的难点或挑战是什么？</strong></p>
<p><strong>钟弋辰：</strong> 第一是实现并发跳表的 insert ，一开始参考的 levelDB 跳表没有实现并发的保证，所以要去探索一下如何做并发。一开始想着局部化锁，这样可以将加锁范围减小到插入值的位置不影响其他插入位置，经过实践发现性能不太好。后来想到用无锁化操作，参考了比较多的文章和开源库，通过 cas 操作来保证插入链表时线程安全，同时在冲突时直接放弃完整的构建，只保证跳表最底层的插入。<br>
第二是性能优化。仅仅做了无锁后性能还是有欠缺，后来试了下把每个节点的内存动态化，根据其 tower 高度来决定申请多少内存，减少了额外内存开销，同时测试性能有了比较大的提升。<br>
第三是 unsafe 编程，回到了手动管理内存的模式，需要仔细的考虑数据结构的生命周期。</p>
<p><strong>陈歌：</strong> 在做生成 Microsoft faster C++ 的 binding 时遇到了麻烦。这使得我只能移植一个旧版本，导致后续花了很多的额外时间，最终的提交的作品不是一个非常完善的版本，略有遗憾。</p>
<p><strong>Q：在最终提交的设计上，你做过怎样的权衡？你的设计最大的亮点是什么？</strong></p>
<p><strong>钟弋辰：</strong> 权衡可能没有，思考主要都是在过程里，所以最后提交的时候就是成稿了。个人觉得亮点会有几点（也欢迎大家给批评建议或者更多观点）：</p>
<p>1、无锁化的并发，相对于加锁开销更小，避免了线程间切换，陷入内核的情况；
2、应用 grow only 的数据结构，这样最大限度的减少了调整时需要同步耗费的时间；
3、delete，直接通过清除 value，不改变结构，也是尽量减少了调整。</p>
<p><strong>陈歌：</strong> 所做的权衡有关于 Skip List 相对于 RwLock 的利弊。好处是，它允许并发写入在没有互斥的情况下进行。但是，当写入频率较低时，此优势就没有那么有用了（faster 同理）。所以对这些方法应该持有保留态度，实践中的性能应该按照实际情况做取舍。亮点的话，我觉得如果在把 faster cache 友好的 hash 索引的设计，与纯内存 allocator 结合使用并用 pure Rust 实现，将会是一个亮点。</p>
<p><strong>Q：参与此次 Rust Chinai Hackathon 达坦科技组的活动，你有哪些收获或者感受？</strong></p>
<p><strong>钟弋辰：</strong> 技术上的收获：学习巩固了跳表，无锁操作这些知识。另外就是感受到了测试的重要性，很多时候写代码容易陷入局部优化，没有抓到核心性能问题。<br>
整体的感受：Rust 是一门门槛比较高的语言，比较对标 C++，更加注重安全性和编程整体的规约。在相对于 C++有很多更方便和现代化的特性，但也对编程的门槛也很高，所以希望 rust 可以越来越普及，越来越好用。</p>
<p><strong>陈歌：</strong> 首先感受到了 rust 社区的热情。之前接触到的技术类的活动比较少，在论坛上看到这个比赛，感受到国内对 rust 语言学习的热情是在向上走，这是个很好的现象。希望后续会有更多的活动，让更多人投身于 rust 建设中。另外个体来讲，希望能通过这个活动认识更多人，不论是线上还是线下，分享交流等，让 rust 有热情的人不孤单。</p>
<p>最终获得优胜奖的两支队伍，将于 <strong>2023 年 1 月 15 日(周日) 下午 16:00-17:00</strong> 在线上举办一场<strong>空中路演</strong>。欢迎所有的参赛队伍和对 <strong>Concurrent Indexing</strong> 感兴趣的伙伴，届时参与聆听获奖小组的分享：他们是如何思考拆解赛题的？在着手设计时碰到哪些难点和挑战？以及最终提交的代码设计思路和亮点。</p>
<p><strong>直播预约：</strong><br>
欢迎您预约直播，或者登陆腾讯会议观看直播：<br>
会议号：482-326-186</p>
<p><img src="${t}" alt="图片"></p>`;export{s as assetURLs,o as default,r as metadata,n as toc};
