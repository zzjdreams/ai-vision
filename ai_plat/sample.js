var http = require('http');
var auth = require('./auth.js');

var appid = '填入你的APPID';
var secret_key = '填入你的SecretKey';
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

var request = new http.request({
    hostname: "openai.qq.com",
    port: 80,
    path: "/api/json/ai/GetMultiAI",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
    }},
    function(res){
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response:\n' + chunk);
    });
  });

request.end(body);
