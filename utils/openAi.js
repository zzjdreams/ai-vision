var auth = require('./auth.js');
var strUtil=require('./strUtil')

var appid = '20169';
var secret_key = 'ggRm3DJfrbev6w8iyUbjBgPRwVA';

// will expire in one day
var auth_key = auth.genSign(appid, secret_key, Math.ceil(Date.now() / 1000 + 3600));

var body = JSON.stringify({
  base: {
      appid: appid,
      auth_key: auth_key,
      cmds: ['CvOldPhotoRecovery']
      },
  media_url: 'http://openai.qq.com/docs/pics/bwdemo.jpg'
});
var str=strUtil.string2ArrayBuffer(body);

var request=wx.request({
  url: 'http://openai.qq.com/api/json/ai/GetMultiAI',
  method:'POST',
  header: {
      "Content-Type": "application/json",
      "Content-Length": str.byteLength
  },
  data:str,
  success (res) {
    console.log(res)
  },
  fail(res){
    console.log(res)
  }
  
})