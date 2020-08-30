const CryptoJS = require('crypto-js')

// 系统配置
const config = {
  // 请求地址
  hostUrl: "https://ntrans.xfyun.cn/v2/ots",
  host: "ntrans.xfyun.cn",
  //在控制台-我的应用-机器翻译获取
  appid: "5f40f835",
  //在控制台-我的应用-机器翻译获取
  apiSecret: "704ec3f806a0dcab579842ef991e85ab",
  //在控制台-我的应用-机器翻译获取
  apiKey: "0f3cfefc5c92cb50b472f5c98ec37da9",
  uri: "/v2/ots"
}

var transVar = {
  text: "你好世界！",//待翻译文本
  from: "cn",//源语种
  to: "en"//目标语种
}

// 获取当前时间 RFC1123格式
let date = (new Date().toUTCString())
var postBody = getPostBody(transVar.text, transVar.from, transVar.to)
var digest = getDigest(postBody)

var options = {
  url: config.hostUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json,version=1.0',
    'Host': config.host,
    'Date': date,
    'Digest': digest,
    'Authorization': getAuthStr(date, digest)
  },
  json: true,
  body: postBody
}

// 生成请求body
function getPostBody(text, from, to) {
  let digestObj = {
	//填充common
    common: {
      app_id: config.appid
    },
	//填充business
    business:{
      from: from,
      to : to
    },
	//填充data
    data:{
      text: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
    }
  }
  return digestObj
}

// 请求获取请求体签名
function getDigest(body) {
  return 'SHA-256=' + CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(JSON.stringify(body)))
}

// 鉴权签名
function getAuthStr(date, digest) {
  let signatureOrigin = `host: ${config.host}\ndate: ${date}\nPOST ${config.uri} HTTP/1.1\ndigest: ${digest}`
  let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret)
  let signature = CryptoJS.enc.Base64.stringify(signatureSha)
  let authorizationOrigin = `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line digest", signature="${signature}"`
  return authorizationOrigin
}

export function setTransform(text,from,to){
  transVar.text=text;
  transVar.from=from;
  transVar.to=to;
  postBody = getPostBody(transVar.text, transVar.from, transVar.to);
  digest = getDigest(postBody);
  options. headers= {
    'Content-Type': 'application/json',
    'Accept': 'application/json,version=1.0',
    'Host': config.host,
    'Date': date,
    'Digest': digest,
    'Authorization': getAuthStr(date, digest)
  };
}

export function requestUrl(){
  return new Promise((r,j)=>{
    wx.request({
      url: config.hostUrl,
      method:'POST',
      header:options.headers,
      data:postBody,
      success(res){
        // console.log(res);
        r(res);
      },
      fail(res){
        // console.log(res);
        j(res);
      }
    })
  })
}