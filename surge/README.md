# Surge 配置维护与上游更新

> 核对日期：2026-10-12。`Surge.conf` 是可直接导入 Surge 5（iOS/macOS）的完整配置模板；节点与订阅地址需使用者自行填写，规则集引用上游公开仓库地址，不随本仓库分发。

## 上游版本

- **Surge 5（iOS/macOS）**：配置按 Surge 5 语法编写；`[Rule]` 中大规则集使用了 `extended-matching`，需要 Surge 5.8.0 及以上版本。
- **Surge 测试版新特性 [IP Rewrite]**：在 VIF 的 IP 层按目标地址处理数据包（`reflect` / `reject` / `drop`），先于任何规则与策略生效。来源：NobyDa 频道 https://t.me/NobyDa/1141 ；本仓库 `surge/LocalDevVPN.module` 即该帖示例模块（本机开发回环），已接入 `Surge.conf` 的 `[Module]` 段。**该模块仅在含 [IP Rewrite] 的测试版上可用**，稳定版会忽略该段。
- **规则集上游**（`blackmatrix7/ios_rule_script`，`raw.githubusercontent.com` 直引）：
  - 国际：`rule/Surge/Global/Global.list` → 代理
  - 国内：`rule/Surge/China/China.list` → 直连
  - AI：`OpenAI` / `Claude` / `Anthropic` / `Gemini` / `Copilot` → 🤖 AI 助手策略组
- **模块**：`[Module]` 段仅引用 `LocalDevVPN.module`（测试版特性示例），通过 `raw.githubusercontent.com/zhihenglu/SurgeModule/master/surge/` 直引，随本仓库更新自动生效；本仓库自有模块未接入本配置。

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
