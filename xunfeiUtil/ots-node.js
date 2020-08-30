/**
 * 机器翻译2.0(niutrans) WebAPI 接口调用示例
 * 运行前：请先填写Appid、APIKey、APISecret
 * 运行方法：直接运行 main() 即可 
 * 结果： 控制台输出结果信息
 * 
 * 1.接口文档（必看）：https://www.xfyun.cn/doc/nlp/niutrans/API.html
 * 2.错误码链接：https://www.xfyun.cn/document/error-code （错误码code为5位数字）
 * 3.个性化翻译术语自定义：
 * ***登陆开放平台 https://www.xfyun.cn/
 * ***在控制台--机器翻译(niutrans)--自定义翻译处
 * ***上传自定义翻译文件（打开上传或更新窗口，可下载示例文件）
 * @author iflytek
 */
const CryptoJS = require('crypto-js')
var request = require('request')
var log =require('log4node')

// 系统配置
const config = {
  // 请求地址
  hostUrl: "https://ntrans.xfyun.cn/v2/ots",
  host: "ntrans.xfyun.cn",
  //在控制台-我的应用-机器翻译获取
  appid: "********",
  //在控制台-我的应用-机器翻译获取
  apiSecret: "********************************",
  //在控制台-我的应用-机器翻译获取
  apiKey: "********************************",
  uri: "/v2/ots"
}

let transVar = {
  text: "你好世界！",//待翻译文本
  from: "cn",//源语种
  to: "en"//目标语种
}

// 获取当前时间 RFC1123格式
let date = (new Date().toUTCString())
let postBody = getPostBody(transVar.text, transVar.from, transVar.to)
let digest = getDigest(postBody)

let options = {
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

request.post(options, (err, resp, body) => {
  if(err) {
    log.error('error ' + err)
  }
  if(body.code != 0) {
    log.error(`发生错误，错误码：${body.code}错误原因：${body.message}`)
  }
  log.info(`sid：${body.sid}`)
  log.info(`原文：[${body.data.result.from}] ${body.data.result.trans_result.src}`)
  log.info(`译文：[${body.data.result.to}] ${body.data.result.trans_result.dst}`)
})

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