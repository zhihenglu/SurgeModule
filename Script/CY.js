// Author:Pih
// 该小组件为在作者Pih的基础上进行的UI界面修改及相关代码调整Telegram @anker1209
// Update time:2021/01/09

// ###########初始化设定##############
const files = FileManager.local()  //文件存储位置
const currentDate = new Date()
const apiKey = "FDyAMqSjPK5sIK24"  //彩云天气apiKey，自行申请
const lockLocation = false  //是否锁定定位信息
const locale = "zh_cn" //时间显示语言
const newBG = false  //是否设置或者使用新的背景图片
const removeBG = false //是否需要清空背景图片
const numberOfEvents = 3 //显示事件数量
const targetDate = 360 //显示未来多少天内的日历事件
const ignoreCal = "" //添加你需要不显示的事件的日历名称，多个日历用逗号分割，例如："中国节假日", "工作", "生日"
const showYY = true //是否只显示一言，否则优先显示日历事件

// ######颜色设置#######
const gColor = "003366" //全局颜色，如果想调整各部分颜色，修改下方相应颜色即可 天蓝色3691be 黑灰色1b2026
const dayColor = "3691be"
const nightColor = "1b2026"
const bgcolor = new Color("808080", 1) //背景颜色
const timecolor = new Color("000000", 1) //时间颜色
const ctcolor = new Color("239676", 1) //实时温度颜色
const ctbgcolor = new Color("003366", 0.2) //实时温度条背景颜色
const ctfgcolor = new Color(gColor, 1) //实时温度条前景颜色
const todaycolor = new Color(gColor, 1) //今日最低最高温度颜色
const aircolor = new Color(gColor, 0.8) //AQI空气质量颜色
const dotcolor = new Color("FF0000", 0.3) //虚线颜色
const etitlecolor = new Color(gColor, 1) //事件标题颜色
const etimecolor = new Color(gColor, 0.6) //事件时间颜色
const hourlycolor = new Color("003366", 1) //小时预报文字颜色
const hourlybgcolor = new Color("FF3B30", 0.2) //小时预报温度条背景颜色
const hourlyfgcolor = new Color(gColor, 1) //小时预报温度条前景颜色
const daybarcolor = new Color("EB4310", 0.6) //星期预报分割条颜色
const daycolor = new Color("333399", 1) //星期预报文字颜色
const rainycolor = new Color("0283d3", 1) //下雨天温度字体颜色
const yycolor = new Color("003366", 1) //一言颜色
const btcolor = new Color(gColor, 1) //下雨天温度字体颜色

const scale = Device.screenScale()
const widgetHeight = getWidgetSize().h
const widgetWidth = getWidgetSize().w
// 背景调整
const firstRibbonPosition = 10
const secondRibbonPosition = 71
const defaultfontsize = 20
const slipPosition = 370
const daystoShow = 6 

const providepoetry = await poetry()
// ######数据设定#######
const caiyun = await getCaiyunData()
const alertInfo =caiyun.dataToday.result.alert.content[0]
// log ("预警信息"+alertInfo)
const dailyTemperature = caiyun.dataToday.result.daily.temperature
const rainIndex = caiyun.dataToday.result.hourly.precipitation
const comfortindex = caiyun.dataToday.result.realtime.life_index.comfort.index
const feelslikeT = Math.round( caiyun.dataToday.result.realtime.temperature)
const currentTemperature = feelslikeT+"º"
const feeling = caiyun.dataToday.result.realtime.life_index.comfort.desc
const realtimeweather = caiyun.dataToday.result.realtime.skycon
const todaysunrise = caiyun.dataToday.result.daily.astro[0].sunrise.time.slice(0, 5)
const todaysunset = caiyun.dataToday.result.daily.astro[0].sunset.time.slice(0, 5)
const data = caiyun.dataToday.result.hourly.temperature
const dailydata = caiyun.dataToday.result.daily.temperature
const Mainweather = caiyun.dataToday.result.daily.skycon
const CHNAQI = caiyun.dataToday.result.realtime.air_quality.aqi.chn.toString()
const CHNAQIDes = caiyun.dataToday.result.realtime.air_quality.description.chn
// log(CHNAQI)
const USAQI = caiyun.dataToday.result.realtime.air_quality.aqi.usa.toString()
// log(USAQI)

const weatherDesc = caiyun.dataToday.result.forecast_keypoint

const probabilityOfRain = caiyun.dataToday.result.minutely.probability
// log(probabilityOfRain)
const maxProbability = (Math.max(probabilityOfRain[0],probabilityOfRain[1],probabilityOfRain[2],probabilityOfRain[3])*100).toString().slice(0, 2)+"%"


// ######字体设置#######

const widget = new ListWidget()
widget.setPadding(0, 0, 0, 0)
widget.backgroundColor = bgcolor

// ………………背景选择………………

const path = files.joinPath(files.documentsDirectory(), "testPath")
    if (newBG && config.runsInApp)
{
  const img = await Photos.fromLibrary()
      widget.backgroundImage = img
      files.writeImage(path, img)
}else{
    if (files.fileExists(path)) { 
      try {
    widget.backgroundImage = files.readImage(path)
    log("读取图片成功")
} catch (e){
  widget.backgroundColor = bgcolor
  log(e.message)
}    
    } 
}
    if (removeBG && files.fileExists(path)) {
      try {
    files.remove(path)
    log("背景图片清理成功")
} catch (e){
    widget.backgroundColor = bgcolor
    log(e.message)
  }
}

// …………………………………………
const topDrawing = new DrawContext()
topDrawing.size = new Size(642, secondRibbonPosition+17)
topDrawing.opaque = false
topDrawing.respectScreenScale=true

// 顶部虚线绘制
 for (i=0;i<78;i++)
 {drawLine(topDrawing,30+i*7.5, 84, 35+i*7.5, 84, dotcolor, 2)}

// 空气质量颜色以及程度
var AQIcolor 
// 选择 AQI 数据 USAQI or CHNAQI
let AQIData = CHNAQI
if (AQIData<= 50)
{ ac = "00e400"  
}else if (AQIData<=100)
{ ac = "f8c50a"  
}else if (AQIData<=150)
{ ac = "ff7e00"
}else if (AQIData<=200)
{ ac = "ff0000"
}else if (AQIData<=300)
{ ac = "ba0033"  
}else
{ ac = "7e0023"
}
AQIcolor = new Color(ac,1)

// ######右侧底色#######

fillRect(topDrawing,522, 58, 90, 18, 6, AQIcolor)

// ######日期显示#######

const df = new DateFormatter()
df.locale=locale
const date = currentDate
// 农历信息
const lunarInfo = await getLunar(date.getDate() - 1)

// 星期 EEEE星期几 EEE周几
df.dateFormat = "EEE"
let week = df.string(date)
// 日期格式
df.dateFormat = "MMMd日"
let dateFormat = df.string(date)

drawText(topDrawing,30, 50, 150, 54,dateFormat + " "+ week, timecolor, "regular",22,"left") 

// 获取周数
// let beginDate = new Date(date.getFullYear(), 0, 1);
// let week = "第 "+ Math.ceil((parseInt((date - beginDate) / (24 * 60 * 60 * 1000)) + 1 + beginDate.getDay()) / 7) + " 周"
// log("开始时间"+beginDate)
// log("计算结果"+Math.ceil((parseInt((date - beginDate) / (24 * 60 * 60 * 1000)) + 1 + beginDate.getDay()) / 7))
// log(week)

// 获取农历信息
let lunarJoinInfo = lunarInfo.infoLunarText+ " " + lunarInfo.holidayText
log("农历信息："+lunarJoinInfo)

// 周数 or 农历信息
drawText(topDrawing,90, firstRibbonPosition+40+1, 215, 24, lunarJoinInfo, timecolor, "regular",22,"right")

// 当前天气
drawIcon(topDrawing,365, 30, realtimeweather,40)
// 当前温度
drawText(topDrawing,420, 25, 100, 54, currentTemperature, ctcolor, "regular",50,"center")

// 空气质量&下雨概率
var textColortoShow
textColortoShow = aircolor
drawText(topDrawing, 522, 57, 90, 17, AQIData + " - " + CHNAQIDes, textColortoShow, "bold",16,"center")

// 温度条位置
var tempHeight
if (feelslikeT < Math.round(dailyTemperature[0].min))
{ tempHeight = 8 }
if (feelslikeT > Math.round(dailyTemperature[0].max))
{ tempHeight = 90 }
if (feelslikeT >= Math.round(dailyTemperature[0].min) && feelslikeT <= Math.round(dailyTemperature[0].max))
{ tempHeight = (feelslikeT-Math.round(dailyTemperature[0].min))*82/(Math.round(dailyTemperature[0].max)-Math.round(dailyTemperature[0].min))+8 }

// ######温度条#######
fillRect(topDrawing,522, 47, 90, 8, 4, ctbgcolor)
fillRect(topDrawing,522, 47, tempHeight, 8, 4, ctfgcolor)

// 今天最高最低温度
drawText(topDrawing,522, 25, 45,18, Math.round(dailyTemperature[0].min).toString(), todaycolor, "semibold",18,"left")
drawText(topDrawing,566, 25, 45,18, Math.round(dailyTemperature[0].max).toString(), todaycolor, "semibold",18,"right")


const contentStack = widget.addStack()
contentStack.layoutVertically()
contentStack.size = new Size(widgetWidth/scale, widgetHeight/scale)

const topStack = contentStack.addStack()
topStack.size = new Size(widgetWidth/scale, widgetHeight*98/296/scale)
topStack.addImage(topDrawing.getImage())
// contentStack.url = 'calshow:' + (Math.floor(currentDate.getTime() / 1000) - 978307200)

// ######获取日程#######
const eventDrawing = new DrawContext()
eventDrawing.size = new Size(355, 255-98)
eventDrawing.opaque = false
eventDrawing.respectScreenScale=true


currentDate.setDate(currentDate.getDate())
console.log(`Filter event by start date ${currentDate}`)
  // 结束时间设置为当日"+targetDate"天的日期
const endDate = new Date()
endDate.setDate(endDate.getDate() + targetDate)
console.log(`Filter event by end date ${endDate}`)

const allEvents = await CalendarEvent.between(currentDate, endDate, [])
console.log(`Get ${allEvents.length} events from this time range`)
const futureEvents = enumerateEvents()
const eventsAreVisible = (futureEvents.length > 0) && (numberOfEvents > 0)

// ##############
// ##############
  if (numberOfEvents == 0) { return }
  
  for (let i = 0; i < numberOfEvents; i++) 
    {
    const event = futureEvents[i]
    if (!event) { break }
    const eventColor = event.calendar.color
    log(eventColor)
    fillRect(eventDrawing, 30, (88-88)+i*55, 5, 45, 2, eventColor)
// 标题
    const title = event.title  
    
    drawText(eventDrawing, 45, (86-88)+i*55, 305, 24, title, etitlecolor, "bold", 22, "left")
// 限制行高。
    if (futureEvents.length >= 3) { title.lineLimit = 1 }
// 格式化时间信息。
    let df = new DateFormatter()
    df.useShortDateStyle()
// 剩余时间(日)
const timeLeft = ((df.date(df.string(event.startDate)))-(df.date(df.string(currentDate))))/(1000*60*60*24)

    const eventSeconds = Math.floor(currentDate.getTime() / 1000) - 978307200 + timeLeft*3600*24
    
    const duration = ((df.date(df.string(event.endDate)))-(df.date(df.string(event.startDate))))/(1000*60*60*24) //事件持续时间
    
// log(timeLeft)
// 事件时间提醒    
var timeText
var eventTimeColor
    if (timeLeft==0)
    {
    df.useNoDateStyle()
    df.useShortTimeStyle()
     eventTimeColor = new Color('ffff00')
      if (event.isAllDay)
        {timeText = ("今天全天")
        } else { 
        timeText = ("今天"+df.string(event.startDate))
        console.log(`${df.date (df.string(event.startDate))}`)
}}
//     } else { 
    if(timeLeft < 0 
//     && duration > 0
    )
       {let df = new DateFormatter()
       const longEventDate = ("d日HH:mm")
       df.dateFormat = longEventDate
      timeText = (df.string(event.startDate)+"-"+df.string(event.endDate))
       // 今日事件字体颜色
       eventTimeColor = new Color('ffff00')      
    } 
//       else {
    if (timeLeft == 1)
    {df.useNoDateStyle()
    df.useShortTimeStyle()
      if (event.isAllDay)
        {timeText = ("明天全天")
        eventTimeColor = new Color('ffff00')
        } else { 
        timeText = ("明天"+df.string(event.startDate))
        eventTimeColor = new Color('ffff00')
        }
      }
//         else{ 
    if(timeLeft>1)
    {let df = new DateFormatter()
      let startTime = event.startDate
      let finishTime = event.endDate
      df.dateFormat = "EEE"
      let eee = df.string(startTime)
      df.dateFormat = "MMMd日"
      let ddd = df.string(startTime)
      let sep = '-'
      df.dateFormat="h:mm"
      let detailTimes = df.string(startTime)+sep+df.string(finishTime)
      if (event.isAllDay)
        {timeText = (eee + " " + ddd + "  [" + timeLeft + "]")
        } else {
          timeText = (eee + " " + ddd + " " + detailTimes + "  [" + timeLeft + "]")
        }
          eventTimeColor = etimecolor
//         log(timeText)
    }
//         log (timeText)
    drawText(eventDrawing, 45, (88-88)+i*55+25, 305, 30, timeText, eventTimeColor, "medium", 18, "left")
    
}
const middleStack = contentStack.addStack()
middleStack.layoutHorizontally()
const eventStack = middleStack.addStack()
eventStack.size = new Size(widgetWidth*355/642/scale, widgetHeight*(255-88)/296/scale)
if (futureEvents.length == 0 || showYY) {
	eventStack.layoutVertically()
	eventStack.setPadding(0, 16, 0, 10)
	eventStack.addSpacer()

	let yy = providepoetry.hitokoto
	let yyshow = eventStack.addText(yy)
	yyshow.font = Font.lightSystemFont(14)
	yyshow.textColor = yycolor
	eventStack.addSpacer()

	const r1 = eventStack.addStack()
	r1.addSpacer()
	let author_who = r1.addText(providepoetry.from_who + "   " + providepoetry.from)
	author_who.font = Font.lightSystemFont(10)
	author_who.textColor = yycolor
	author_who.textOpacity = 0.8
	author_who.linelimit = 1
	eventStack.addSpacer(6)
		}else{
		eventStack.addImage(eventDrawing.getImage())
		}
eventStack.url = 'calshow:' + (Math.floor(currentDate.getTime() / 1000) - 978307200)


// ######天气预报#######
const weatherDrawing = new DrawContext()
weatherDrawing.size = new Size(642-355, (255-98))
weatherDrawing.opaque = false
weatherDrawing.respectScreenScale=true


const deltaX = (610-slipPosition)/(daystoShow*2)
const firstPointtoLeft = slipPosition+deltaX

const ToTop = (120-98)
var min, max, diff;
	for(var i = 0; i<daystoShow ;i++)
  {
	let	temp = Math.round(data[i].value);
		min = (temp < min || min == undefined ? temp : min)
		max = (temp > max || max == undefined ? temp : max)
	}

diff = max-min

if (diff == 0) {diff= diff+1
max=max+0.3}

for (i=0;i<daystoShow-1;i++){ 
  
  let timeText = data[i].datetime.slice(11, 13)
}
// ########小时预报#######
for (i=0;i<daystoShow;i++){ 
// 颜色定义
var temperaturetextcolor
var temeratureBarcolor
if (rainIndex[i*2].value>=0.06)
{temperaturetextcolor = rainycolor
temeratureBarcolor = rainycolor}
else{temperaturetextcolor = hourlycolor
temeratureBarcolor = hourlyfgcolor}

// 温度条位置
if (Math.round(data[i*2].value) < Math.round(dailyTemperature[0].min))
{ tempHeight = 8 }
if (Math.round(data[i*2].value) >= Math.round(dailyTemperature[0].max))
{ tempHeight = 40 }

if (Math.round(data[i*2].value) >=Math.round(dailyTemperature[0].min) && Math.round(data[i*2].value) < Math.round(dailyTemperature[0].max))
tempHeight = (Math.round(data[i*2].value)-Math.round(dailyTemperature[0].min))*32/(Math.round(dailyTemperature[0].max)-Math.round(dailyTemperature[0].min))+8

// ######温度条#######
fillRect(weatherDrawing, firstPointtoLeft-4+(2.15*i)*deltaX-355-5,115-98+3, 8, 40, 4, hourlybgcolor)
fillRect(weatherDrawing, firstPointtoLeft-4+(2.15*i)*deltaX-355-5,150-tempHeight-98+3+5, 8, tempHeight, 4, temeratureBarcolor)

// 温度
drawText(weatherDrawing, firstPointtoLeft+deltaX*i*2.15-20-355-5,150-98+10, 40,20,Math.round(data[i*2].value)+"º",temperaturetextcolor,"regular",16,"center")

// 时间
let weathertimeText = data[i*2].datetime.slice(11, 13)
if (i==0) {weathertimeText="现在"}
else { weathertimeText = weathertimeText
// + ":00"
}
drawText(weatherDrawing, firstPointtoLeft+deltaX*i*2.15-20-355-5, 100-98-3, 40, 30, weathertimeText,temperaturetextcolor,"regular",16,"center")

}


// ####每日预报########
for (i=1;i<4;i++){
//   log(Mainweather[i].value)
  
// 图标
drawIcon(weatherDrawing,10+88*(i-1)+40-1-3, 196-98-10+3, Mainweather[i].value, 30 )


// 每日温度
let dMax = Math.round(dailydata[i].max)+"º"
let dMin = Math.round(dailydata[i].min)+"º"
fillRect(weatherDrawing,5+88*(i-1)+6+1,173-98+40+16+2, 70, 4, 2, daybarcolor)
drawText(weatherDrawing,5+88*(i-1)+6+1,173-98+20+62-18, 40,20,dMin,daycolor,"regular",18,"left")
drawText(weatherDrawing,5+88*(i-1)+6+40+1,173-98+20+62-18, 30,20,dMax,daycolor,"regular",18,"right")

// 每日日期
const weatherDate = new Date()
weatherDate.setDate(weatherDate.getDate() + i)
// log(weatherDate)
df.dateFormat = "E"
drawText(weatherDrawing, 5+88*(i-1)-1,173-98+20, 50,20,df.string(weatherDate),daycolor,"a",16,"center")
}

const weatherStack = middleStack.addStack()
weatherStack.size = new Size(widgetWidth*(642-355)/642/scale, widgetHeight*(255-98)/296/scale)
weatherStack.addImage(weatherDrawing.getImage())
weatherStack.url = "https://caiyunapp.com/weather/"


// ######底部信息展示#######
const bottomDrawing = new DrawContext()
bottomDrawing.size = new Size(642, (296-255))
bottomDrawing.opaque = false
bottomDrawing.respectScreenScale=true

// 底部虚线绘制
 for (i=0;i<78;i++)
 {drawLine(bottomDrawing,30+i*7.5, 1, 35+i*7.5, 1, 
 dotcolor, 2)}

// 如果没有预警信息，显示天气描述
var content
var alertTextColor
// log (alertInfo)
  if (alertInfo == undefined)
  {
  content = weatherDesc
}else{
  content = "注意："+alertInfo.title
  }
  drawText(bottomDrawing, 0, 7, 642, 25, content, btcolor,"default",20,"center")

const bottomStack = contentStack.addStack()
bottomStack.size = new Size(widgetWidth/scale, widgetHeight*(296-255)/296/scale)
bottomStack.addImage(bottomDrawing.getImage())

// ###############

Script.setWidget(widget)
widget.presentMedium()
Script.complete()

// ######画线######
function drawLine(drawing,x1,y1,x2,y2,color,width)
{
  const path = new Path()
  path.move(new Point(Math.round(x1),Math.round(y1)))
  path.addLine(new Point(Math.round(x2),Math.round(y2)))
  
  drawing.addPath(path)
  drawing.setStrokeColor(color)
  drawing.setLineWidth(width)
  drawing.strokePath()
}

// ######绘制文字#######
function drawText(drawing, x, y, width,height,text,color,font,fontsize,alignment)
  {
    if (font=="a"){
drawing.setFont(Font.boldRoundedSystemFont(fontsize))}
if (font=="default"){
drawing.setFont(Font.lightMonospacedSystemFont(fontsize))}
if (font=="semibold"){
drawing.setFont(Font.semiboldSystemFont(fontsize))}
if (font=="bold"){
drawing.setFont(Font.boldSystemFont(fontsize))}
if (font=="medium"){
drawing.setFont(Font.mediumSystemFont(fontsize))}
if (font=="regular"){
drawing.setFont(Font.regularSystemFont(fontsize))}
  drawing.setTextColor(color)
  if(alignment == "left")
  {drawing.setTextAlignedLeft()}
  if(alignment == "center")
  {drawing.setTextAlignedCenter()}
  if(alignment == "right")
  {drawing.setTextAlignedRight()}
  drawing.drawTextInRect(text, new Rect(x, y, width, height))

}

// ######绘制主要天气图标#######
function drawIcon(drawing,x1,y1,WeatherCondition,size)
{
 if (WeatherCondition=="CLOUDY"
  )
  {y1=y1+8}
  if(WeatherCondition=="LIGHT_RAIN"||
  WeatherCondition=="MODERATE_RAIN"||
  WeatherCondition=="HEAVY_RAIN"||
  WeatherCondition=="STORM_RAIN"
  )
  {y1=y1+4}
drawing.drawImageAtPoint(provideSymbol(WeatherCondition, 0,size), new Point(x1, y1)) 
}

// ######提供天气图标名称#######
function provideSymbol(cond,night,size) {
//   log("字体大小"+size)
  let symbols = {
    
"CLEAR_DAY": function() {return"sun.max.fill"},
"CLEAR_NIGHT": function() {return"moon.stars.fill"},
"PARTLY_CLOUDY_DAY": function() {return"cloud.sun.fill"},
"PARTLY_CLOUDY_NIGHT": function() {return"cloud.moon.fill"},
"CLOUDY": function() {return"cloud.fill"},
"LIGHT_HAZE": function() {return night? "cloud.fog.fill":"sun.haze.fill"},
"MODERATE_HAZE": function() {return night? "cloud.fog.fill":"sun.haze.fill"},
"HEAVY_HAZE": function() {return night? "cloud.fog.fill":"sun.haze.fill"},
"LIGHT_RAIN": function() {return"cloud.drizzle.fill"},
"MODERATE_RAIN": function() {return"cloud.rain.fill"},
"HEAVY_RAIN": function() {return"cloud.rain.fill"},
"STORM_RAIN": function() {return"cloud.heavyrain.fill"},
"FOG": function() {return"cloud.fog.fill"},
"LIGHT_SNOW": function() {return"cloud.sleet.fill"},
"MODERATE_SNOW": function() {return"cloud.snow.fill"},
"HEAVY_SNOW": function() {return"cloud.snow.fill"},
"STORM_SNOW": function() {return"snow"},
"DUST": function() {return night? "cloud.fog.fill":"sun.dust.fill"},
"SAND": function() {return night? "cloud.fog.fill":"sun.dust.fill"},
"WIND": function() {return"wind"},
    
  }
  let sfs = SFSymbol.named(symbols[cond]())
  sfs.applyFont(Font.systemFont(size))
return sfs.image
}

function drawSfs (drawing,x1,y1,symblos,size)
{
let sfs = SFSymbol.named(symblos).image
sfs.applyBoldWeight()
sfs.tintColor = new Color("000000", 1)
sfs.applyFont(Font.systemFont(size))

let a = drawing.drawImageAtPoint(sfs.image, new Point(x1, y1))  
}

function fillRect (drawing,x,y,width,height,cornerradio,color)
{
let path = new Path()
let rect = new Rect(x, y, width, height)
path.addRoundedRect(rect, cornerradio, cornerradio)
drawing.addPath(path)
drawing.setFillColor(color)
drawing.fillPath()
}


function drawPoint(drawing,x1,y1,color,diaofPoint)
{
let currPath = new Path()
  currPath.addEllipse(new Rect(x1, y1, diaofPoint, diaofPoint))
  drawing.addPath(currPath)
  drawing.setFillColor(color)
  drawing.fillPath()
}

// ######获取彩云天气数据#######
async function getCaiyunData()
  {
// 设定天气数据缓存路径
const cachePath = files.joinPath(files.documentsDirectory(), "Caiyuncache-Pih")
const cacheExists = files.fileExists(cachePath)
const cacheDate = cacheExists ? files.modificationDate(cachePath) : 0
var data
// 假设存储器已经存在且距离上次请求时间不足60秒，使用存储器数据
if (cacheExists && (currentDate.getTime() - cacheDate.getTime()) < 60000) {
  const cache = files.readString(cachePath)
  data = JSON.parse(cache)
  log("==>请求时间间隔过小，使用缓存数据")

// 否则利用 api 得到新的数据
} else {
 
try {
const weatherReq = "https://api.caiyunapp.com/v2.5/"+ apiKey +"/"+ await getLocation()+ "/weather.json?alert=true&dailysteps=7&lang=zh_CN"
const dataToday = await new Request(weatherReq).loadJSON()
log(weatherReq)
  data = {dataToday}
  files.writeString(cachePath, JSON.stringify(data))
  log("==>天气信息请求成功")}
  catch(e){
  data = JSON.parse(files.readString(cachePath))
  log("==>天气信息请求失败，使用缓存数据/"+e.message)}
}
return data
}

// ######获取定位信息#######
async function getLocation()
{
  // 设定位置缓存数据路径
const locationPath = files.joinPath(files.documentsDirectory(), "Mylocation-Pih")
var latitude, longitude
var locationString
// 如果位置设定保存且锁定了，从缓存文件读取信息

if (lockLocation && files.fileExists(locationPath)) {
locationString = files.readString(locationPath)
log("位置锁定，使用缓存数据"+locationString)
// return locationString
// 否则，从系统获取位置信息
} else {
  try {
  const location = await Location.current()
  latitude = location.latitude
  longitude = location.longitude
  locationString = longitude+","+latitude
  files.writeString(locationPath, locationString)
  log("==>定位成功")}
  catch(e){
  locationString = files.readString(locationPath)
  log("==>无法定位，使用缓存定位数据")}
  locationString = locationString

//   return locationString
}
log("地址"+locationString)
return locationString
}


// 未来事件
function enumerateEvents() {
  let futureEvents = []
  for (const event of allEvents) {
    if (event.endDate.getTime() > currentDate.getTime() && !event.title.startsWith("Canceled:") && ![ignoreCal].includes(event.calendar.title)) {
      futureEvents.push(event)
    }
  }
  return futureEvents
}

// #####获取一言######
async function poetry()
  {
const poetryCachePath = files.joinPath(files.documentsDirectory(), "Caiyunweather-Pih")
var poetryData
try {
poetryData = await new Request("https://v1.hitokoto.cn/?c=i&encode=json&max_length=40").loadJSON()
files.writeString(poetryCachePath, JSON.stringify(poetryData))
log("==>一言获取成功")
} catch(e){
  poetryData = JSON.parse(files.readString(poetryCachePath))
  log("==>获取一言失败，使用缓存数据")
}

return poetryData
}

async function getLunar(day) {
    // 缓存key
    const cacheKey = "lsp-lunar-cache"
    // 万年历数据
    let response = undefined
    try {
        const request = new Request("https://wannianrili.51240.com/")
        const defaultHeaders = {
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36"
        }
        request.method = 'GET'
        request.headers = defaultHeaders
        const html = await request.loadString()
        let webview = new WebView()
        await webview.loadHTML(html)
        var getData = `
            function getData() {
                try {
                    infoLunarText = document.querySelector('div#wnrl_k_you_id_${day}.wnrl_k_you .wnrl_k_you_id_wnrl_nongli').innerText
                    holidayText = document.querySelectorAll('div.wnrl_k_zuo div.wnrl_riqi')[${day}].querySelector('.wnrl_td_bzl').innerText
                    if(infoLunarText.search(holidayText) != -1) {
                        holidayText = ''
                    }
                } catch {
                    holidayText = ''
                }
                return {infoLunarText: infoLunarText, holidayText: holidayText}
            }
            
            getData()
            `
        // 节日数据  
        response = await webview.evaluateJavaScript(getData, false)
        Keychain.set(cacheKey, JSON.stringify(response))
        console.log(`农历输出：${JSON.stringify(response)}`);
    } catch (e) {
        console.error(`农历请求出错：${e}`)
        if (Keychain.contains(cacheKey)) {
            const cache = Keychain.get(cacheKey)
            response = JSON.parse(cache)
        }
    }

    return response
}

/*function Addblur (Img)
{
  const drawing = new DrawContext()
  drawing.size = Img.size
  const rect = new Rect(0, 0, drawing.size.width, drawing.size.height)
  drawing.drawImageInRect(Img, rect)
  drawing.setFillColor(new Color("000000", 0.08))
  drawing.fillRect(rect)
  drawing.setStrokeColor(new Color("ffffff", 0.4))
  

//   for (i=0;i<5;i++)
// {drawwhiteline(slipPosition+i*1.5, 70-i, 610+i*1.5, 70-i, AQIcolor, 60/(40+15*i)),drawing}
drawing.setLineWidth(4)
// drawing.strokeRect(rect)

  let blurImg = drawing.getImage()
return blurImg

}*/



function getWidgetSize ()
{
let deviceSize = (Device.screenSize().height*scale).toString()
let deviceInfo = 
  {  "2778": {
    "models"  : ["12 Pro Max"],
    "small"   : { "w": 510,   "h":  510 },
    "medium"  : { "w": 1092,  "h": 510 },
    "large"   : { "w": 1092,  "h": 1146}
  },

  "2532": {
    "models"  : ["12", "12 Pro"],
    "small"   : {"w": 474,  "h": 474 },
    "medium"  : {"w": 1014, "h": 474 },
    "large"   : {"w": 1014, "h": 1062 }
  },
   
  "2688": {
    "models"  : ["Xs Max", "11 Pro Max"],
    "small"   : {"w": 507,  "h": 507},
    "medium"  : {"w": 1080, "h": 507},
    "large"   : {"w": 1080, "h": 1137}
  },
  
  "1792": {
    "models"  : ["11", "Xr"],
    "small"   : {"w": 338, "h": 338},
    "medium"  : {"w": 720, "h": 338},
    "large"   : {"w": 720, "h": 758}
  },
  
  "2436": {
    "models"  : ["X", "Xs", "11 Pro"],
    "small"   : {"w": 465, "h": 465},
    "medium"  : {"w": 987, "h": 465},
    "large"   : {"w": 987, "h": 1035}
  },
  
  "2208": {
    "models"  : ["6+", "6s+", "7+", "8+"],
    "small"   : {"w": 471, "h": 471},
    "medium"  : {"w": 1044, "h": 471},
    "large"   : {"w": 1044, "h": 1071}
  },
  
  "1334": {
    "models"  : ["6","6s","7","8"],
    "small"   : {"w": 296, "h": 296},
    "medium"  : {"w": 642, "h": 296},
    "large"   : {"w": 642, "h": 648}
  },

  "1136": {
    "models"  : ["5","5s","5c","SE"],
    "small"   : {"w": 282, "h": 282},
    "medium"  : {"w": 584, "h": 282},
    "large"   : {"w": 584, "h": 622}
  }
}

let widgetSize = deviceInfo[deviceSize].medium
return widgetSize
// 
}

