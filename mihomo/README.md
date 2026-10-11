# Mihomo 配置维护与上游更新

> 核对日期：2026-10-11。`mihomo.json` 是 Sub-Store 脚本，生成完整 Mihomo 配置；订阅实际包含哪些节点取决于运行时输入。

## 上游版本

- **最新稳定版：v1.19.32**，发布于 2026-09-30（UTC）。该版本加入负载均衡 `hash-key`（可按入站用户固定会话），并包含 TCP MSS、MIP 栈、OpenVPN、EasyTier 等修复和维护更新。
- **相关前序版本：v1.19.31**，新增 EasyTier 出站、ZeroTier `identity-secret` 支持及 TUN `stack: mips` 配置支持。
- 上述新功能不都适用于当前策略：本配置没有负载均衡组、EasyTier 或 ZeroTier 节点，因此不会为了“用上新功能”而加入无关选项。

## 本仓库配置更新

- **修复 fake-IP 规则格式**：配置使用 `fake-ip-filter-mode: rule` 时，过滤规则必须显式指定 `fake-ip` 或 `real-ip` 动作。为 `lan` 与 `local` 后缀补上 `real-ip`；`cn_domain` 规则集原本已指定 `real-ip`。此修改修复了 v1.19.32 实际配置检查报出的 `invalid action` 错误。
- **保留 `mixed` TUN 栈**：上游现已支持 MIPS 自研栈，但官方配置说明仍将 `mixed` 描述为无兼容问题时推荐的选项（TCP 使用 system，UDP 使用 gVisor）。因此本次保留既有 `mixed` 行为，不未经目标设备测试就切换到 `mips`。
- **规则集**：继续采用 `MetaCubeX/meta-rules-dat` 的 `.mrs` 格式，并保留现有 DNS、分流、策略组和订阅节点筛选逻辑。
- **策略组**：保留当前地区和服务组逻辑；脚本会依据订阅生成实际节点列表并处理空地区组。

## 校验记录

使用 Mihomo **v1.19.32** 和一个代表性测试节点生成配置并运行 `mihomo -t`。修正前，校验因 `DOMAIN-SUFFIX,lan` 缺少 rule action 失败；补齐 `real-ip` 后，生成配置校验通过。生产配置仍取决于订阅输入及目标平台，建议更新内核后在实际设备上验证 TUN 连通性。

## 上游来源

- [Mihomo v1.19.32 发布说明](https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.32)
- [Mihomo v1.19.31 发布说明](https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.31)
- [Mihomo 上游发布列表](https://github.com/MetaCubeX/mihomo/releases)
- [Mihomo TUN 官方配置说明](https://wiki.metacubex.one/en/config/inbound/tun/)
- [Mihomo DNS 官方配置说明](https://wiki.metacubex.one/en/config/dns/)

> 本文只记录可从仓库文件、上游发布页或官方配置文档核实的状态，不再声称该目录已接入定时自动更新或自动推送。
