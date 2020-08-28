const CryptoJS = require('crypto-js')
// 16530800941
// 登陆密码
// 123qwe
// 支付密码
// 111111

var appid = '5f40f835';
var APISecret='704ec3f806a0dcab579842ef991e85ab';
var APIKey='58ee81bdcc7f8546343b595e888aa74d';

// 系统配置
const config = {
  // OCR手写文字识别服务webapi接口地址
  hostUrl: "https://webapi.xfyun.cn/v1/service/v1/ocr/handwriting",
  host: "webapi.xfyun.cn",
  //在控制台-我的应用-手写文字识别获取
  appid: '5f40f835',
  // 接口密钥(webapi类型应用开通手写文字识别后，控制台--我的应用---手写文字识别---相应服务的apikey)
  apiKey: "58ee81bdcc7f8546343b595e888aa74d",
  uri: "/v1/ise",
  // 本地上传图片
  file: "./ocr.jpg"
}

// 获取当前时间戳
let ts = parseInt(new Date().getTime() / 1000)

// 组装业务参数
function getXParamStr() {
  let xParam = {
    language: 'cn|en'
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

// let options = {
//   url: config.hostUrl,
//   headers: getReqHeader(),
//   form: getPostBody()
// }


export function requestUrl(img){
  return new Promise((r,j)=>{
    var postBody={
      image:img
    }
    var xunfeiRequest=wx.request({
      url: config.hostUrl,
      header:getReqHeader(),
      data:postBody,
      method:'POST',
      success(res){
        // console.log(res);
        // console.log(res.data.data.block[0].line);
        r(res);
      },
      fail(res){
        console.log(res);
        j(res);
      }
    });
    console.log(getReqHeader())
  })
  
}
export function upLoadImg(img,base64){
  
  wx.uploadFile({
    filePath: img,
    name: 'image',
    url: config.hostUrl,
    header:getReqHeader(),
    formData:{
      image:base64
    },
    success(res){
      console.log(res);
    },
    fail(res){
      console.log(res);
    },
    
  })
}




