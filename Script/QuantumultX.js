hostname = ios-*.prod.ftl.netflix.com,ios.prod.ftl.netflix.com, api.weather.com,passport.iqiyi.com,blindbox.jd.com,biz.caiyunapp.com,operation-api.jimistore.com,mb3admin.com,ms.jr.jd.com, me-api.jd.com,account.huami.com,api.m.jd.com

#Netflix评分
^https?://ios(-.*)?\.prod\.ftl\.netflix\.com/iosui/user/.+path=%5B%22videos%22%2C%\d+%22%2C%22summary%22%5D url script-request-header https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating.js
^https?://ios(-.*)?\.prod\.ftl\.netflix\.com/iosui/user/.+path=%5B%22videos%22%2C%\d+%22%2C%22summary%22%5D url script-response-body https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating.js

# 获取京东Cookie. 
^https:\/\/(api\.m|me-api)\.jd\.com\/(client\.action\?functionId=signBean|user_new\/info\/GetJDUserInfoUnion\?) url script-request-header https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js

# 爱奇艺获取cookie
^https:\/\/passport\.iqiyi\.com\/apis\/user\/ url script-request-header https://raw.githubusercontent.com/NobyDa/Script/master/iQIYI-DailyBonus/iQIYI.js

# 小米运动获取Token
^https:\/\/account\.huami\.com\/v2\/client\/login url script-response-body https://github.com/zhihenglu/SurgeModule/raw/master/Script/xmSports.js   

#彩云天气
https:\/\/((weather-data\.apple)|(api.weather))\.com url script-request-header https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/caiyun.js