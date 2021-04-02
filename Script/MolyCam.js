/*转自TG
* QuantumultX
* ^https:\/\/pay\.wecut\.com\/apple\/iosVerifyReceipt\.php$ url script-response-body https://github.com/zhihenglu/SurgeModule/raw/master/Script/MolyCam.js
* MITM = pay.wecut.com
var obj = JSON.parse($response.body);
var obj = {
{
  "code": 0,
  "msg": "处理成功",
  "data": {
    "isValid": 1,
    "expiresTs": 1800000000
  }
}
$done({body: JSON.stringify(obj)});