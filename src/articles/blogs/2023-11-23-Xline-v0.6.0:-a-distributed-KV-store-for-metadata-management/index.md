---
label: Xline v0.6.0:一个用于元数据管理的分布式KV存储
description: Xline是一个基于Curp协议的，用于管理元数据的分布式KV存储。现有的分布式KV存储大多采用Raft共识协议，需要两次RTT才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个RTT，从而提高性能。因此，Xline旨在实现高性能的数据访问和跨数据中心场景下的强一致性。
cover: ./cover.png
location: 中国香港
author: [更新版本的]
tags: [Xline]
---

![封面](./cover.png)

## Xline 是什么？我们为什么要做 Xline？

**Xline 是一个基于 Curp 协议的，用于管理元数据的分布式 KV 存储。** 现有的分布式 KV 存储大多采用 Raft 共识协议，需要两次 RTT 才能完成一次请求。当部署在单个数据中心时，节点之间的延迟较低，因此不会对性能产生大的影响。

但是，当跨数据中心部署时，节点之间的延迟可能是几十或几百毫秒，此时 Raft 协议将成为性能瓶颈。Curp 协议就是为了解决这个问题而设计的。它可以在命令不冲突的情况下减少一个 RTT，从而提高性能。因此，**Xline 旨在实现高性能的数据访问和跨数据中心场景下的强一致性。**

## V0.6.0 版本有什么新功能？

**v0.6.0 新版本功能、修复问题以及重构如下：**

**⭐ 新功能**
- 为 CUPR 共识协议添加成员变更机制（详情请阅读设计文档 #306）
- 实现 cluster server 和 client #464、#465
- 实现优雅关机功能。
- 实现 xlinctl 与 xline 集群通信。目前，xlinectl 包括以下功能：
    - Compaction 和 member 命令：已在 pr #484 中实施
    - Txn、watch 和 lock 命令：在 pr #428 中实现
    - Role 命令：在 pr #427 中实现
    - User 命令 ：在 pr #426 中实施
    - Snapshot 和 auth 命令：在 pr #425 中实施
    - Delete 和 lease 命令：在 pr #424 中实施

**🪲Bug 修复**
- benchmark client 无法连接服务器 #462
- 删除模拟测试中的停止 #458
- 执行顺序错误 #454
- 检查领导者的密码 #435
- 移除 uncommitted pool 的恢复逻辑 #419
- CURP TLA+ 法定人数大小计算和属性检查 #418
- 修复 propose 不处理同步错误 #407

**🛠️ 重构**

- 减少代码重复 #407
- 考虑 TLA+ 中请求广播的交错状态 #429
- 完善 bench client 的实现 #496
- 简化错误处理逻辑 #480
- 提高启动错误的可读性 #432
- 在执行和同步后引入命令序列化 #421, #422

❤️ Contributors
@EAimTY
@MarkGaox
@Kikkon

**已知问题：** 如果在添加成员后立即关闭群集，领导节点可能无法正常关闭，会不断尝试向关闭的新节点发送条目。详情请阅读 #526 号问题。
