# Mihomo 配置维护与上游更新

> 核对日期：2026-11-16。`mihomo.json` 是 Sub-Store 配置生成脚本；生成的完整配置及节点列表取决于运行时订阅输入。

## 上游版本

- **最新稳定版：v1.19.34**，发布于 2026-11-11（UTC）。新增 Snell v6 入站/出站、Shadowsocks listener 多用户及 CLI `ss-password` 生成；修复包括 TUN 自动路由规则、较新 Go 版本下的 TFO、SOCKS 域名长度计算、HTTP CONNECT 缓冲数据及 EasyTier 数据面等问题。
- **最新预发布通道：Prerelease-Alpha**（滚动预览，不是固定的语义化版本号）。官方页面显示最近同步于 2026-11-15 18:16:49（CST）；新增订阅用户信息解析错误的格式符修复，以及 Snell v6 outbound 可选 `userkey`。
- v1.19.34 的 TUN 自动路由修复通过更新内置 `sing-tun` 到 v0.4.29 带入，涉及 IPv6 自动路由规则优先级/顺序以及不支持内核 IPv6 时的严格路由处理。当前模板启用 IPv6、`tun.auto-route` 和 `strict-route`，因此该引擎修复相关；它没有要求增加或迁移 Mihomo 配置字段。本模板继续显式设置 `tun.stack: mixed`，并保持未设置 `tun.dns-mode`，避免改变既有平台相关 DNS 行为。

## 本仓库配置更新结论

- 稳定版新增协议、listener 和 CLI 能力，以及 TUN 引擎修复，均不要求本配置迁移字段；Snell v6 的可选 `userkey` 只在相应节点需要时使用，本模板没有要补写的固定节点参数。本轮不改动 `mihomo.json`。
- 保留 `fake-ip-filter-mode: rule` 下已显式注明 `real-ip` 的过滤规则：`cn_domain` 规则集及 `lan`、`local` 后缀规则均已有动作。
- 继续采用 `MetaCubeX/meta-rules-dat` 的 `.mrs` 规则集，并保留现有 DNS、分流、策略组、订阅节点筛选及空地区组处理逻辑；不以预发布内核替代稳定版作为验证基线。

## 校验记录

- **2026-11-16**：使用官方 Mihomo **v1.19.34**，通过 `mihomo.json` 的 `main()` 分别生成空订阅及含一个测试 SOCKS5 节点的配置；两者执行 `mihomo -t` 均通过。另确认 IPv6、`mixed` 栈、`auto-route`、`strict-route`、未设置 `dns-mode`、Fake-IP 规则动作、11 个 `.mrs` provider 及最终路由规则等输出不变量。下载资产 SHA-256 与官方发布值一致。
- **2026-11-09**：使用 v1.19.33 对空订阅及示例节点配置进行检查，均通过。

配置解析测试不替代真实订阅、远程规则集加载或目标设备上的 TUN 路由/IPv6 连通性测试。

## 上游更新记录

| 日期 | 版本/通道 | 与本配置相关的结论 |
|---|---|---|
| 2026-09-30（UTC） | v1.19.32（稳定） | TUN 栈默认值更新为 `mips`；本配置显式指定 `mixed`，保持现有行为。 |
| 2026-10-13 22:26:56（CST） | Prerelease-Alpha | DoH 连接管理、Fake-IP 重载状态、Mieru 更新及若干实现修复；不要求迁移配置。 |
| 2026-10-21（UTC） | v1.19.33（稳定） | 新增可选 TUN `dns-mode`；本配置保持未设置以保留原有平台相关 DNS 行为。 |
| 2026-10-25 08:43:14（CST） | Prerelease-Alpha | 新增 Mieru 空闲 TCP 连接关闭及 SOCKS 域名长度溢出修复；无需更改配置。 |
| 2026-10-30 17:50:47（CST） | Prerelease-Alpha | 新增 CLI `ss-password` 生成及 HTTP CONNECT 响应数据保留；无需更改配置。 |
| 2026-11-06 11:18:53（CST） | Prerelease-Alpha | 新增 Snell v6、EasyTier 数据面修复、httpupgrade 链接转换及 Shadowsocks 多用户支持；无需更改本配置。 |
| 2026-11-11（UTC） | v1.19.34（稳定） | 新增 Snell v6、Shadowsocks 多用户及 CLI 能力；内置 sing-tun v0.4.29 修复 TUN IPv6 自动路由；不要求本配置迁移。 |
| 2026-11-15 18:16:49（CST） | Prerelease-Alpha | 修正 `subscription-userinfo` 错误格式符，并为 Snell v6 outbound 增加可选 `userkey`；本配置无需改动。 |
| 2026-11-16（UTC） | 例行核查 | v1.19.34 的空订阅和示例节点生成配置检查通过；不改动生成脚本。 |

## 上游来源

- [Mihomo v1.19.34 发布说明](https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.34)
- [Mihomo Prerelease-Alpha 发布说明](https://github.com/MetaCubeX/mihomo/releases/tag/Prerelease-Alpha)
- [Mihomo v1.19.34 的 TUN 自动路由修复提交](https://github.com/MetaCubeX/mihomo/commit/478af2a57c48bdb8e85f6ed93b2c3735e90ceabd)
- [sing-tun v0.4.28 至 v0.4.29 变更](https://github.com/MetaCubeX/sing-tun/compare/v0.4.28...v0.4.29)
- [Mihomo 上游发布列表](https://github.com/MetaCubeX/mihomo/releases)
- [Mihomo TUN 官方配置说明](https://wiki.metacubex.one/en/config/inbound/tun/)
- [Mihomo DNS 官方配置说明](https://wiki.metacubex.one/en/config/dns/)

> 上游巡检与必要维护由仓库外的定时任务执行；仓库本身不包含自动更新器。每轮是否调整配置均以官方变更、配置适用性和实际校验结果为准。
