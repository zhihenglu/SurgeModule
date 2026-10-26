# Mihomo 配置维护与上游更新

> 核对日期：2026-10-26。`mihomo.json` 是 Sub-Store 配置生成脚本；生成的完整配置及节点列表取决于运行时订阅输入。

## 上游版本

- **最新稳定版：v1.19.33**，发布于 2026-10-21（UTC）。新增 TUN 的可选 `dns-mode` 配置，并包含 Shadowsocks listener、DoH 连接管理、`dialer-proxy` 环检测、TLS 安全及 Fake-IP 重载状态等修复与维护。
- **最新预发布通道：Prerelease-Alpha**（滚动预览，不是固定的语义化版本号）。官方发布说明显示 Alpha 分支同步时间为 2026-10-25 08:43:14（CST）；本次列出两项变更：Mieru inbound 可主动关闭空闲 TCP 连接，以及修复 SOCKS 域名长度计算溢出。
- 当前脚本显式设置 `tun.stack: mixed`，不受 v1.19.32 起稳定版默认栈调整为 `mips` 的影响。本脚本没有设置新的 `tun.dns-mode`；该字段控制操作系统 DNS 配置，官方文档说明省略时保留平台相关的 legacy 行为。因目标设备平台及预期 DNS 行为未作专项验证，本轮不添加该字段。

## 本仓库配置更新结论

- 稳定版及最新 Alpha 说明没有要求本配置迁移字段的变化。Alpha 的 Mieru 与 SOCKS 修复无须改写现有 DNS、策略组或代理节点配置，不以预发布内核替代稳定版作为验证基线。
- 保留 `fake-ip-filter-mode: rule` 下已显式注明 `real-ip` 的过滤规则：`cn_domain` 规则集及 `lan`、`local` 后缀规则均已有动作。
- 继续采用 `MetaCubeX/meta-rules-dat` 的 `.mrs` 规则集，并保留现有 DNS、分流、策略组、订阅节点筛选及空地区组处理逻辑。本轮无需更改 `mihomo.json`。

## 校验记录

- **2026-10-26**：使用官方 Mihomo **v1.19.33**，通过 `mihomo.json` 的 `main()` 分别生成空订阅及含一个测试 SOCKS5 节点的配置；两者执行 `mihomo -t` 均通过。另确认 `mixed` 栈、Fake-IP 规则动作、11 个 `.mrs` provider 及最终路由规则等输出不变量。下载资产 SHA-256 与官方发布值一致。
- **2026-10-19**：使用 v1.19.32 对空订阅和示例节点输出进行检查，均通过。

这些测试不替代真实订阅、远程规则集加载或目标设备上的 TUN / 系统 DNS 连通性测试。

## 上游更新记录

| 日期 | 版本/通道 | 与本配置相关的结论 |
|---|---|---|
| 2026-09-30（UTC） | v1.19.32（稳定） | TUN 栈默认值更新为 `mips`；本配置显式指定 `mixed`，保持现有行为。 |
| 2026-10-13 22:26:56（CST） | Prerelease-Alpha | DoH 连接管理、Fake-IP 重载状态、Mieru 更新及若干实现修复；不要求迁移配置。 |
| 2026-10-21（UTC） | v1.19.33（稳定） | 新增可选 TUN `dns-mode`；本配置保持未设置以保留原有平台相关 DNS 行为。 |
| 2026-10-25 08:43:14（CST） | Prerelease-Alpha | 新增 Mieru 空闲 TCP 连接关闭及 SOCKS 域名长度溢出修复；无需更改配置。 |
| 2026-10-26（UTC） | 例行核查 | v1.19.33 的空订阅与示例节点配置检查通过；不改动生成脚本。 |

## 上游来源

- [Mihomo v1.19.33 发布说明](https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.33)
- [Mihomo Prerelease-Alpha 发布说明](https://github.com/MetaCubeX/mihomo/releases/tag/Prerelease-Alpha)
- [Mihomo 上游发布列表](https://github.com/MetaCubeX/mihomo/releases)
- [Mihomo TUN 官方配置说明](https://wiki.metacubex.one/en/config/inbound/tun/)
- [Mihomo DNS 官方配置说明](https://wiki.metacubex.one/en/config/dns/)

> 上游巡检与必要维护由仓库外的定时任务执行；仓库本身不包含自动更新器。每轮是否调整配置均以官方变更、配置适用性和实际校验结果为准。
