const { type, name } = $arguments
const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}

let compatible
let config = JSON.parse($files
let proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})

config.outbounds.push(...proxies)

// 1. 移除模板中原有的自动测速组（urltest 类型，tag 以 -auto 结尾）
config.outbounds = config.outbounds.filter(o => !/-auto$/.test(o.tag))

// 2. 清理其他出站中对自动测速组的引用及 default 指向
config.outbounds.forEach(o => {
  if (Array.isArray(o.outbounds)) {
    o.outbounds = o.outbounds.filter(t => !/-auto$/.test(t))
  }
  if (typeof o.default === 'string' && /-auto$/.test(o.default)) {
    o.default = o.default.replace(/-auto$/, '')
  }
})

// 3. 仅为手动选择组分配节点（已无 -auto 组）
config.outbounds.map(i => {
  if (['all'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies))
  }
  if (['hk'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /港|hk|hongkong|hong kong|🇭🇰/i))
  }
  if (['tw'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /台|tw|taiwan|🇨🇳/i))
  }
  if (['jp'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /日本|jp|japan|🇯🇵/i))
  }
  if (['sg'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^(?!.*(?:us)).*(新|sg|singapore|🇸🇬)/i))
  }
  if (['us'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /美|us|unitedstates|united states|🇺🇸/i))
  }
})

config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatible) {
      config.outbounds.push(compatible_outbound)
      compatible = true
    }
    outbound.outbounds.push(compatible_outbound.tag);
  }
});

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}
