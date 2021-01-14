/*

QX:

^https://m-api.nexon.com/sdk/enterToy.nx url script-response-body All_pro.js

surge:
http-response ^https://m-api.nexon.com/sdk/enterToy.nx requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/honjow/MyScripts/master/JS/MapleStoryM/All_pro.js

[MITM]
hostname = m-api.nexon.com

*/

let body = $response.body
// console.log("All_pro ++++++++++++++++\n" + body)

body = `{"errorCode":0,"result":{"service":{"title":"MapleStory M Global","buildVer":"2","policyApiVer":"2","termsApiVer":"2","useTPA":0,"loginUIType":"1","clientId":"MTY3MDg3NDAy","useMemberships":[101,103,102,9999],"useMembershipsInfo":{"nexonNetSecretKey":"","nexonNetProductId":"","nexonNetRedirectUri":""}},"endBanner":{},"basePlate":[],"country":"CN","termsAgree":[],"isPrivacyConsigned":-1,"useLocalPolicy":["0","0"],"enableLogging":false,"offerwall":{"id":0,"title":""}},"errorText":"1","errorDetail":""}`
$done({body})