hostname = ios.prod.ftl.netflix.com,weather-data.apple.com, api.weather.com,ifac*.iqiyi.com,*.video.qq.com,blindbox.jd.com,biz.caiyunapp.com,operation-api.jimistore.com,testflight.apple.com,mb3admin.com,ms.jr.jd.com, me-api.jd.com,account.huami.com,api.revenuecat.com,*.bilibili.com,api.m.jd.com

#Netflix评分
^https?://ios\.prod\.ftl\.netflix\.com/iosui/user/.+path=%5B%22videos%22%2C%\d+%22%2C%22summary%22%5D url script-request-header https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating.js

^https?://ios\.prod\.ftl\.netflix\.com/iosui/user/.+path=%5B%22videos%22%2C%\d+%22%2C%22summary%22%5D url script-response-body https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating.js


^https?://ios\.prod\.ftl\.netflix\.com/iosui/warmer/.+type=show-ath url script-response-body https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating_season.js

# 获取京东Cookie. 
^https:\/\/(api\.m|me-api)\.jd\.com\/(client\.action\?functionId=signBean|user_new\/info\/GetJDUserInfoUnion\?) url script-request-header https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js

# 爱奇艺获取cookie
^https?:\/\/iface(\d)?\.iqiyi\.com\/ url script-request-header https://raw.githubusercontent.com/NobyDa/Script/master/iQIYI-DailyBonus/iQIYI.js

# 腾讯视频获取cookie https://film.qq.com/
^https:\/\/access.video.qq.com\/user\/auth_refresh url script-request-header https://raw.githubusercontent.com/chavyleung/scripts/master/videoqq/videoqq.cookie.js
^https?:\/\/v.qq.com\/x\/bu\/mobile_checkin url script-request-header https://raw.githubusercontent.com/chavyleung/scripts/master/videoqq/videoqq.cookie.js

#BiliBili
^https:\/\/(www|live)\.bilibili\.com\/?.? url script-request-header https://raw.githubusercontent.com/chavyleung/scripts/master/bilibili/bilibili.cookie.js

# 小米运动获取Token
^https:\/\/account\.huami\.com\/v2\/client\/login url script-response-body https://github.com/zhihenglu/SurgeModule/raw/master/Script/xmSports.js   

#彩云天气
https:\/\/((weather-data\.apple)|(api.weather))\.com url script-request-header https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/caiyun.js

#彩云js
https?:\/\/biz\.caiyunapp\.com\/(membership_rights|v2\/user) url script-response-body https://raw.githubusercontent.com/githubdulong/Script/master/cytq.js

#TF区域限制
^https?:\/\/testflight\.apple\.com\/v\d\/accounts\/.+?\/install$ url script-request-body https://gist.githubusercontent.com/NobyDa/9be418b93afc5e9c8a8f4d28ae403cf2/raw/TF_Download.js

#vsco
^https:\/\/api\.revenuecat\.com\/v\d\/subscribers\/\d+$ url script-response-body https://github.com/zhihenglu/SurgeModule/raw/master/Script/vsco.js

#京粉
^https?://api\.m\.jd\.com/(client\.action|api)\?functionId=(wareBusiness|serverConfig|basicConfig|lite_wareBusiness|pingou_item) url script-response-body https://raw.githubusercontent.com/Tartarus2014/Script/master/jdjf_price.js
