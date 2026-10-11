# sing-box 配置维护与上游更新

> 核对日期：2026-10-11。配置由 `box.json` 与 Sub-Store 脚本 `sub-store.js` 共同生成；请以两者生成的完整配置为准。

## 上游版本

- **最新稳定版：v1.14.3**，发布于 2026-10-09（UTC）。该版本的发布说明为修复与改进，没有要求本仓库配置新增或迁移字段。
- **最新预览版：v1.15.0-alpha.12**，发布于 2026-10-11（UTC）。该预览版本的说明同样为修复与改进；它不是稳定版，不作为默认生产基线。
- sing-box 1.15 预览系列自 alpha.3 起引入 sing-tun 自有 TCP/IP 协议栈，并弃用 TUN 的 `stack` 字段；移除该字段后使用 sing-tun 自有协议栈。该迁移说明只适用于 1.15 系列及后续版本，不应把预览版行为描述成 1.14.3 稳定版特性。

## 本仓库配置与维护说明

- `box.json` 是带有空地区策略组的模板；`sub-store.js` 会根据订阅节点填充节点与策略组、清理失效 `detour`，并为无匹配节点的组补入兼容出口。因此应在脚本生成完整配置后再校验，不能单独把未处理模板当作最终运行配置。
- TUN 配置没有显式填写 `stack`。这与 sing-box 1.15 迁移方向一致，同时避免把 1.15 预览版专属行为误标为稳定版行为；在 1.14.3 上由该版本自身的默认行为处理。
- 当前 DNS、路由规则使用非 legacy 的 `action` 语法；规则集格式为二进制 `srs`。以 sing-box v1.14.3 对 `sub-store.js` 生成的代表性配置执行 `sing-box check`，校验通过。
- 节点名处理与分组逻辑：台区旗帜统一映射为 `🇨🇳`，补齐旗帜与名称之间的空格；日本组可纳入韩国节点，美国组可纳入德国、澳大利亚及英国节点。

## 上游更新记录

| 日期（UTC） | 版本 | 与本配置相关的结论 |
|---|---|---|
| 2026-10-09 | v1.14.3（稳定） | 发布说明为修复与改进；本次没有发现需要迁移的配置字段。 |
| 2026-10-11 | v1.15.0-alpha.12（预览） | 发布说明为修复与改进；1.15 预览系列延续自有 TUN 栈方向，保留“不显式设置 `stack`”的兼容策略。 |

## 官方来源

- [sing-box 稳定版 v1.14.3 发布说明](https://github.com/SagerNet/sing-box/releases/tag/v1.14.3)
- [sing-box 预览版 v1.15.0-alpha.12 发布说明](https://github.com/SagerNet/sing-box/releases/tag/v1.15.0-alpha.12)
- [sing-box 上游发布列表](https://github.com/SagerNet/sing-box/releases)
- [sing-box 官方变更日志](https://sing-box.sagernet.org/changelog/)
- [sing-box TUN 官方配置说明](https://sing-box.sagernet.org/configuration/inbound/tun/)

> 本文只记录可从仓库文件、上游发布页或官方配置文档核实的状态，不再声称该目录已接入定时自动更新或自动推送。
