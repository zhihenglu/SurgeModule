# Surge 配置维护与上游更新

> 核对日期：2026-11-06。`Surge.conf` 是可直接导入 Surge 5 / Surge 6（iOS/macOS）的完整配置模板；节点与订阅地址需使用者自行填写，规则集引用上游公开仓库地址，不随本仓库分发。

## 上游版本

- **Surge iOS 稳定版：5.23.0**（2026-10-12 发布）。5.22 起的新特性：MASQUE 代理（基于 HTTP/3，自带 UDP 转发）、策略组级代理链（组级 `underlying-proxy`）、`event-script` 事件（`engine-started` / `profile-reloaded`）、Smart 组优先级编辑器、HTTP Controller 的 Prometheus `/metrics` 接口。
- **Surge iOS 6（TestFlight 测试版）**：面向 iOS 26 重构，新增 MCP 服务端（`http-api` + `http-api-mcp = true`，让 AI 客户端控制 Surge，默认关闭）、配置版本历史（Profile History）、规则集条目上限取消、内置 SOCKS5 支持 UDP 转发、QUIC 自适应拦截（仅拦截能回落 TCP 的 App）。App Store 仍为 Surge 5。介绍页：https://nssurge.com/surge-ios-6
- **Surge 测试版新特性 [IP Rewrite]**：在 VIF 的 IP 层按目标地址处理数据包（`reflect` / `reject` / `drop`），先于任何规则与策略生效。来源：NobyDa 频道 https://t.me/NobyDa/1141 ；本仓库 `surge/LocalDevVPN.module` 即该帖示例模块（本机开发回环），已接入 `Surge.conf` 的 `[Module]` 段。**该模块仅在含 [IP Rewrite] 的测试版上可用**，稳定版会忽略该段。
- **规则集上游**（`blackmatrix7/ios_rule_script`，`raw.githubusercontent.com` 直引，2026-11-06 复核全部有效）：
  - 国际：`rule/Surge/Global/Global.list` → 代理
  - 国内：`rule/Surge/China/China.list` → 直连
  - AI：`OpenAI` / `Claude` / `Anthropic` / `Gemini` / `Copilot` → 🤖 AI 助手策略组
- **模块**：`[Module]` 段仅引用 `LocalDevVPN.module`（测试版特性示例），通过 `raw.githubusercontent.com/zhihenglu/SurgeModule/master/surge/` 直引，随本仓库更新自动生效；本仓库自有模块未接入本配置。

## 本轮适配结论（2026-11-06）

- 规则集地址、规则分类（AI / 国际 / 国内）与策略组结构均无上游破坏性变化，`[Rule]` 段保持不变。
- 新版本能力以**注释示例**形式预置在配置中，默认不启用，需要时取消注释即可：`block-quic = all-proxy`（全局 QUIC 策略，5.14.6+）、`http-api` + `http-api-mcp`（Surge 6 MCP，密钥即全部权限、仅限可信网络）、MASQUE 代理行（5.22.0+）、`event-script` 事件脚本（5.22.0+）、组级 `underlying-proxy` 代理链说明（5.22.0+）。
- `extended-matching` 仍需 Surge 5.8.0+；Surge 6 已取消规则集条目上限，本配置的规则量级不受影响。

## 本仓库配置与维护结论

- `Surge.conf` 不含任何节点信息：`[Proxy]` 仅保留直连出口，节点由 `[Proxy Group]` 中的「🚀 我的节点」经 `policy-path` 订阅托管引入。使用者必须把 `你的订阅地址` 替换为自己的订阅链接，否则策略组无可用节点。
- 规则只分三类：AI（→ 🤖 AI 助手）、国际（→ ✈️ 节点选择）、国内（→ DIRECT），另有 LAN 与 GEOIP 兜底；不含去广告等附加规则集。
- `[General]` 中 `ipv6 = true` 为显式开启；若所在网络 IPv6 异常导致测速失败，可改回 `false`。
- 策略组采用「可见业务组 + 隐藏地区 smart 组」两层结构（节点选择 / AI 助手 / 地区组），地区组按节点名正则自动归类；订阅节点命名不含地区关键词时，对应地区组为空，属正常现象。
- `[MITM]` 默认仅占位：`ca-passphrase` 为示例值必须修改；`hostname = %APPEND%:` 保留各模块自带域名，使用抓包/重写类模块前需在 Surge 内生成并信任 CA 证书。
- 中国大陆网络首次导入时，`raw.githubusercontent.com` 可能直连不可达：规则集更新失败不影响已缓存规则的运行，但新设备首次导入建议在代理可用环境下进行。
- 规则集由上游仓库维护，本仓库不做快照；上游更新后 Surge 会自动拉取，无需手动同步。

## 快速上手

1. 把 `Surge.conf` 导入 Surge（iCloud Drive / 文件分享 / 托管配置均可）。
2. 在「策略组」里找到「🚀 我的节点」，填入订阅地址并更新。
3. 需要模块功能（去广告、任务、Cookie 等）时：生成并信任 MITM 证书后，在「模块」中启用对应模块。
4. `extended-matching` 相关规则若提示不支持，请将 Surge 升级到 5.8.0 以上；想用 `LocalDevVPN.module` 的本机回环功能需安装最新测试版。
5. 首次导入建议在代理可用网络下进行（规则集托管在 `raw.githubusercontent.com`）。

## 文件说明

| 文件 | 说明 |
|---|---|
| `Surge.conf` | 完整配置模板：通用、代理、策略组、规则、重写、MITM、模块 |
| `README.md` | 本说明：上游版本核对与维护结论 |
| `LocalDevVPN.module` | 测试版 [IP Rewrite] 示例模块：本机开发回环（来源 NobyDa） |
| `*.module` / `*.sgmodule` / `*.list` | 本仓库自有 Surge 模块与规则片段 |
