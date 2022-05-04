# Task配置 By FrancH
# Loon群组：https://t.me/Loon0x00

#京东
cron "5 0 * * *" tag=京东多合一签到, script-path=https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js

#取关京东店铺商品
cron "55 23 * * *" script-path=https://raw.githubusercontent.com/ChuheGit/1/main/Script/jd_scripts/jd_unsubscribe.js,tag=取关京东店铺商品

#京东资产变动通知
cron "2 9 * * *" script-path=https://github.com/zhihenglu/SurgeModule/raw/master/Script/jd_bean_change.js, tag=京东资产变动通知

# 爱奇艺签到
cron "0 9 * * *" script-path=https://raw.githubusercontent.com/NobyDa/Script/master/iQIYI-DailyBonus/iQIYI.js

#一言
cron "0 9-21/12 * * *" script-path=https://github.com/zhihenglu/SurgeModule/raw/master/Script/one_day.js, tag=一言

#彩云
cron "0 6-23/1 * * *" script-path=https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/caiyun.js, tag=彩云

#小米运动
cron "15 17 * * *" script-path=https://github.com/zhihenglu/SurgeModule/raw/master/Script/xmSports.js, tag=小米运动    

