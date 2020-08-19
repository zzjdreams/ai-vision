var auth = require('./auth.js');
var strUtil=require('./strUtil')

var appid = '20132';
var secret_key = 'ggBSNNo8VzWXdT47zwb9nfERGA4';

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
  url: '/api/json/ai/GetMultiAI',
  method:'POST',
  header: {
      "Content-Type": "application/json",
      "Content-Length": str.byteLength
  },
  data:str,
  success (res) {
    console.log(res.data)
  },
  fail(res){
    console.log(res.data)
  }
  
})