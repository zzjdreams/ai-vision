/**
  *	
  * 运行前：请先填写Appid、APIKey以及图片的路径
  *
  *手写文字识别WebAPI接口调用示例接口文档(必看):https://www.xfyun.cn/doc/words/wordRecg/API.html
  *图片属性：jpg/png/bmp,最短边至少15px，最长边最大4096px,编码后大小不超过4M,识别文字语种：中英文
  *webapi OCR服务参考帖子(必看)：http://bbs.xfyun.cn/forum.php?mod=viewthread&tid=39111&highlight=OCR
  *(Very Important)创建完webapi应用添加服务之后一定要设置ip白名单，找到控制台--我的应用--设置ip白名单，如何设置参考：http://bbs.xfyun.cn/forum.php?mod=viewthread&tid=41891
  *错误码链接：https://www.xfyun.cn/document/error-code (code返回错误码时必看)
  *@author iflytek
  */
const CryptoJS = require('crypto-js')
var request = require('request')
var log = require('log4node')
var fs = require('fs')

// 系统配置
const config = {
  // OCR手写文字识别服务webapi接口地址
  hostUrl: "https://webapi.xfyun.cn/v1/service/v1/ocr/handwriting",
  host: "webapi.xfyun.cn",
  //在控制台-我的应用-手写文字识别获取
  appid: "********",
  // 接口密钥(webapi类型应用开通手写文字识别后，控制台--我的应用---手写文字识别---相应服务的apikey)
  apiKey: "**************************",
  uri: "/v1/ise",
  // 本地上传图片
  file: "./ocr.jpg"
}

// 获取当前时间戳
let ts = parseInt(new Date().getTime() / 1000)

let options = {
  url: config.hostUrl,
  headers: getReqHeader(),
  form: getPostBody()
}
// 返回识别结果json串
request.post(options, (err, resp, body) => {
  if (err) {
    log.error(err)
  }
  let res = JSON.parse(body)
  if (res.code != 0) {
    log.error(`发生错误，错误码：${res.code} 错误原因：${res.desc} sid：${res.sid}`)
    log.error(`请前往https://www.xfyun.cn/document/error-code?code=${res.code}查询解决办法`)
  }
  // 打印当前任务sid，如有问题请提供至技术人员排查
  log.info(`sid：${res.sid}`)
  log.info('【手写文字识别 】' + JSON.stringify(res.data))
})

// 组装业务参数
function getXParamStr() {
  let xParam = {
    language: 'en'
  }
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(xParam)))
}

// 组装请求头
function getReqHeader() {
  let xParamStr = getXParamStr()
  let xCheckSum = CryptoJS.MD5(config.apiKey + ts + xParamStr).toString()
  return {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'X-Appid': config.appid,
    'X-CurTime': ts + "",
    'X-Param': xParamStr,
    'X-CheckSum': xCheckSum
  }
}

// 组装postBody
function getPostBody() {
  let buffer = fs.readFileSync(config.file)
  return {
    image: buffer.toString('base64'),
  }
}