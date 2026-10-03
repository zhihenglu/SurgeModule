const { type, name } = $arguments
const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}

let compatible
let config = JSON.parse($files[0])
let proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})

config.outbounds.push(...proxies)

// 提取所有有效节点的 Tag 集合
let proxyTags = new Set(proxies.map(p => p.tag))

config.outbounds.map(i => {
  if (['all', 'all-auto'].includes(i.tag)) i.outbounds.push(...getTags(proxies));
  if (['jp', 'jp-auto'].includes(i.tag)) i.outbounds.push(...getTags(proxies, /日本|jp|japan|🇯🇵|韩|kr|korea|🇰🇷/i));
  if (['tw', 'tw-auto'].includes(i.tag)) i.outbounds.push(...getTags(proxies, /台|tw|taiwan/i));
  if (['hk', 'hk-auto'].includes(i.tag)) i.outbounds.push(...getTags(proxies, /港|hk|hongkong|🇭🇰/i));
  if (['sg', 'sg-auto'].includes(i.tag)) i.outbounds.push(...getTags(proxies, /新|sg|singapore|🇸🇬/i));
  if (['us', 'us-auto'].includes(i.tag)) i.outbounds.push(...getTags(proxies, /美|us|unitedstates|🇺🇸/i));
})

// 1. 自动处理空策略组（防止启动报错）
config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds)) {
    // 过滤掉依赖中不存在的节点名称
    outbound.outbounds = outbound.outbounds.filter(tag => proxyTags.has(tag) || ['direct', 'proxy', 'COMPATIBLE', 'GLOBAL', 'hk', 'tw', 'jp', 'sg', 'us', 'all'].includes(tag))
    
    if (outbound.outbounds.length === 0) {
      if (!compatible) {
        config.outbounds.push(compatible_outbound)
        compatible = true
      }
      outbound.outbounds.push(compatible_outbound.tag);
    }
  }
  
  // 2. 自动修正单节点 detour 依赖失效问题 (修复 dependency not found 报错)
  if (outbound.detour && !proxyTags.has(outbound.detour) && !['direct', 'proxy'].includes(outbound.detour)) {
    delete outbound.detour;
  }
});

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}
