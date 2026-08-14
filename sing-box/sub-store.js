const { type, name } = $arguments

const compatibleOutbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}

let compatibleAdded = false
const config = JSON.parse($files[0])
const proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})

config.outbounds.push(...proxies)

config.outbounds.forEach(outbound => {
  if (!Array.isArray(outbound.outbounds)) {
    return
  }

  if (outbound.tag === 'all') {
    outbound.outbounds.push(...getTags(proxies))
  }
  if (outbound.tag === 'hk') {
    outbound.outbounds.push(...getTags(proxies, /港|hk|hongkong|hong kong|🇭🇰/i))
  }
  if (outbound.tag === 'tw') {
    outbound.outbounds.push(...getTags(proxies, /台|tw|taiwan|🇨🇳/i))
  }
  if (outbound.tag === 'jp') {
    outbound.outbounds.push(...getTags(proxies, /日本|jp|japan|🇯🇵|韩国|韓國|韩|韓|kr|korea|🇰🇷/i))
  }
  if (outbound.tag === 'sg') {
    outbound.outbounds.push(...getTags(proxies, /^(?!.*(?:us)).*(新|sg|singapore|🇸🇬)/i))
  }
  if (outbound.tag === 'us') {
    outbound.outbounds.push(...getTags(proxies, /美|us|unitedstates|united states|🇺🇸|🇩🇪|🇦🇺/i))
  }
})

config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatibleAdded) {
      config.outbounds.push(compatibleOutbound)
      compatibleAdded = true
    }
    outbound.outbounds.push(compatibleOutbound.tag)
  }
})

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(proxy => regex.test(proxy.tag)) : proxies).map(proxy => proxy.tag)
}