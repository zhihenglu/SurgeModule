# Mihomo 配置维护与上游更新

> 核对日期：2026-10-12。`mihomo.json` 是 Sub-Store 配置生成脚本；生成的完整配置及节点列表取决于运行时订阅输入。

## 上游版本

- **最新稳定版：v1.19.32**，发布于 2026-09-30（UTC）。该版本包含负载均衡 `hash-key`、MIP 栈、TCP MSS 等功能或维护变化；其中 TUN 栈默认值已调整为 `mips`。
- **最新预发布通道：Prerelease-Alpha**（滚动预览，不是固定的语义化版本号）。官方发布说明显示 Alpha 分支同步时间为 2026-10-11 10:16（CST）；列出的变化包括限制已放弃 DoH 查询的连接堆积、重载时保留 Fake-IP 分配状态，以及更新 Mieru 依赖。
- 当前脚本显式设置 `tun.stack: mixed`，因此不受稳定版默认栈调整影响。本轮保留该配置，以避免未经目标设备测试而改变既有 TUN 行为。

## 本仓库配置更新结论

- 稳定版及当前 Alpha 预览说明没有要求本配置迁移字段的变更；当前配置也未使用负载均衡组或 Alpha 提及的相关新增行为，因此不加入无关选项。
- 保留 `fake-ip-filter-mode: rule` 下已显式注明 `real-ip` 的规则动作：`cn_domain` 规则集及 `lan`、`local` 后缀规则均已指定动作。
- 继续采用 `MetaCubeX/meta-rules-dat` 的 `.mrs` 规则集，并保留现有 DNS、分流、策略组、订阅节点筛选及空地区组处理逻辑。本轮无需更改 `mihomo.json`。

## 校验记录

使用官方 Mihomo **v1.19.32**，通过 `mihomo.json` 的 `main()` 生成含一个测试 SOCKS5 节点的代表性配置，并运行 `mihomo -t`；配置检查通过。该样例用于验证脚本生成的配置结构，不代表真实订阅节点或目标设备上的 TUN 连通性测试。

## 上游更新记录

| 日期 | 版本/通道 | 与本配置相关的结论 |
|---|---|---|
| 2026-09-30（UTC） | v1.19.32（稳定） | TUN 栈默认值更新为 `mips`；本配置显式指定 `mixed`，保持现有行为。 |
| 2026-10-11 10:16（CST） | Prerelease-Alpha（滚动预览） | 发布说明列出 DoH 连接管理、Fake-IP 重载状态及 Mieru 维护更新；未发现需要本配置迁移的字段。 |

## 上游来源

- [Mihomo v1.19.32 发布说明](https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.32)
- [Mihomo Prerelease-Alpha 发布说明](https://github.com/MetaCubeX/mihomo/releases/tag/Prerelease-Alpha)
- [Mihomo 上游发布列表](https://github.com/MetaCubeX/mihomo/releases)
- [Mihomo TUN 官方配置说明](https://wiki.metacubex.one/en/config/inbound/tun/)
- [Mihomo DNS 官方配置说明](https://wiki.metacubex.one/en/config/dns/)

> 上游巡检与必要维护由仓库外的定时任务执行；仓库本身不包含自动更新器。每轮是否调整配置均以官方变更、配置适用性和实际校验结果为准。
