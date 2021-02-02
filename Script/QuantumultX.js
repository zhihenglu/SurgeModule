hostname = m-api.nexon.com,trade-acs.m.taobao.com,api.m.jd.com,ios.prod.ftl.netflix.com,wapside.189.cn,weather-data.apple.com, api.weather.com,ifac*.iqiyi.com,*.video.qq.com,blindbox.jd.com,biz.caiyunapp.com,operation-api.jimistore.com, account.huami.com  


#枫之谷M
^https://m-api.nexon.com/sdk/enterToy.nx url script-response-body https://github.com/zhihenglu/SurgeModule/raw/master/All_pro.js

#Netflix评分
^https?://ios\.prod\.ftl\.netflix\.com/iosui/user/.+path=%5B%22videos%22%2C%\d+%22%2C%22summary%22%5D url script-request-header https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating.js

^https?://ios\.prod\.ftl\.netflix\.com/iosui/user/.+path=%5B%22videos%22%2C%\d+%22%2C%22summary%22%5D url script-response-body https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating.js

#JD比价
^https?://api\.m\.jd\.com/client\.action\?functionId=(wareBusiness|serverConfig|basicConfig) url script-response-body https://raw.githubusercontent.com/yichahucha/surge/master/jd_price.js

#TB比价
^http://.+/amdc/mobileDispatch url script-request-body https://raw.githubusercontent.com/yichahucha/surge/master/tb_price.js

^https?://trade-acs\.m\.taobao\.com/gw/mtop\.taobao\.detail\.getdetail url script-response-body https://raw.githubusercontent.com/yichahucha/surge/master/tb_price.js

#电信获取cookie
^https:\/\/wapside.189.cn:9001\/api\/home\/homeInfo url script-request-body https://raw.githubusercontent.com/chavyleung/scripts/master/10000/10000.cookie.js

#电信金豆cookie
^https:\/\/wapside.189.cn:9001\/api\/exchange\/consume url script-request-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/dianx/dianx.js

#京东获取cookie
https:\/\/api\.m\.jd\.com\/client\.action.*functionId=signBean url script-request-header https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js

# 爱奇艺获取cookie
^https?:\/\/iface(\d)?\.iqiyi\.com\/ url script-request-header https://raw.githubusercontent.com/NobyDa/Script/master/iQIYI-DailyBonus/iQIYI.js

# 腾讯视频获取cookie https://film.qq.com/
^https:\/\/access.video.qq.com\/user\/auth_refresh url script-request-header https://raw.githubusercontent.com/chavyleung/scripts/master/videoqq/videoqq.cookie.js
^https?:\/\/v.qq.com\/x\/bu\/mobile_checkin url script-request-header https://raw.githubusercontent.com/chavyleung/scripts/master/videoqq/videoqq.cookie.js

# 小米运动
^https:\/\/account\.huami\.com\/v2\/client\/login url script-response-body https://gitee.com/lxk0301/jd_scripts/raw/master/backUp/xmSports.js

#彩云天气
https:\/\/((weather-data\.apple)|(api.weather))\.com url script-request-header https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/caiyun.js

#彩云js
https?:\/\/biz\.caiyunapp\.com\/(membership_rights|v2\/user) url script-response-body https://raw.githubusercontent.com/githubdulong/Script/master/cytq.js

#AQI
//^https:\/\/weather-data\.apple\.com\/v1\/weather\/[\w-]+\/([0-9]+\.[0-9]+)\/([0-9]+\.[0-9]+)\? url script-response-body https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/iOS_Weather_AQI_Standard/index.js
