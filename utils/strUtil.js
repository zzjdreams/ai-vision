/**
* ArrayBuffer转16进制字符串
*/
function arrayBuffer2HexString(buf) {
  var out = "";
  var u8a = new Uint8Array(buf);
  var single;
  for (var i = 0; i < u8a.length; i++) {
    single = u8a[i].toString(16)
    while (single.length < 2) single = "0".concat(single);
    out += single;
  }
  return out;
}


/**
* 字符串转换为十六进制
* 主要使用 charCodeAt()方法，此方法返回一个字符的 Unicode 值，该字符位于指定索引位置。
*/
function stringToHex(str) {
  var val = "";
  for (var i = 0; i < str.length; i++) {
    val += str.charCodeAt(i).toString(16);
  }
  return val;
}


/**
 * 将字符串按字符分隔成数组
 * 过滤 0到127外的内容 （中文字体）
 */
function filterChinese(str) {
  var tmp = str.split(''), arr = [];
  for (var i = 0, c = tmp.length; i < c; i++) {
    var s = tmp[i].charCodeAt();
    if (s > 0 && s < 127) {
      arr.push(tmp[i]);
    }
  }
  return arr;
};

/**
 * 将16进制字符串转为16进制数据
 * 
 */
function strToHex(hex, isFilterChinese) {
  //将数组中字符连成字符串
  hex = isFilterChinese ? filterChinese(hex).join('') : convertChinese(hex).join('');
  //清除所有空格
  hex = hex.replace(/\s/g, "");
  //若字符个数为奇数，补一个空格
  hex += hex.length % 2 != 0 ? " " : "";

  var c = hex.length / 2, arr = [];
  for (var i = 0; i < c; i++) {
    arr.push(parseInt(hex.substr(i * 2, 2), 16));
  }
  return arr;
};


/**
* 16进制字符串转ArrayBuffer
*/
function hexString2ArrayBuffer(hexStr) {
   //若字符个数为奇数，补一个0
  hexStr= (hexStr.length % 2 != 0 ? "0" : "")+hexStr;
  //将小写字符转为大写
  // hexStr = hexStr.toUpperCase;
  var count = hexStr.length / 2;
  let buffer = new ArrayBuffer(count);
  let dataView = new DataView(buffer);
  for (var i = 0; i < count; i++) {
    var curCharCode = parseInt(hexStr.substr(i * 2, 2), 16);
    dataView.setUint8(i, curCharCode);
  }
  return buffer;
}


/**
* 字符串转为ArrayBuffer对象，参数为字符串
*/
function string2ArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

/**
* ArrayBuffer转为字符串对象，参数为字符串
*/
function arrayBuffer2String(arrayBuffer) {
  let unit8Arr = new Uint8Array(arrayBuffer);
  let encodedString = String.fromCharCode.apply(null, unit8Arr)
  // decodedString = decodeURIComponent(escape((encodedString))); //没有这一步中文会乱码
  //  decodedString = decodeURI(escape((encodedString)));
  return encodedString;
}

//十进制转字节数组
function intTobytes(n) {
  var bytes = [];
  for (var i = 0; i < 2; i++) {
    bytes[i] = n >> (8 - i * 8);
  }
  return bytes;
}

/**
 * 判断是否为数组
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

/**
 * 判断是否为字符串
 */
function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]';
};



function strToByte(str) {
  var tmp = str.split(''), arr = [];
  for (var i = 0, c = tmp.length; i < c; i++) {
    var j = encodeURI(tmp[i]);
    if (j.length == 1) {
      arr.push(j.charCodeAt());
    } else {
      var b = j.split('%');
      for (var m = 1; m < b.length; m++) {
        arr.push(parseInt('0x' + b[m]));
      }
    }
  }
  return arr;
};

function convertChinese(str) {
  var tmp = str.split(''), arr = [];
  for (var i = 0, c = tmp.length; i < c; i++) {
    var s = tmp[i].charCodeAt();
    if (s <= 0 || s >= 127) {
      arr.push(s.toString(16));
    }
    else {
      arr.push(tmp[i]);
    }
  }
  return arr;
};

// function filterChinese(str) {
//   var tmp = str.split(''), arr = [];
//   for (var i = 0, c = tmp.length; i < c; i++) {
//     var s = tmp[i].charCodeAt();
//     if (s > 0 && s < 127) {
//       arr.push(tmp[i]);
//     }
//   }
//   return arr;
// };

// function strToHex(hex, isFilterChinese) {
//   hex = isFilterChinese ? filterChinese(hex).join('') : convertChinese(hex).join('');

//   //清除所有空格
//   hex = hex.replace(/\s/g, "");
//   //若字符个数为奇数，补一个空格
//   hex += hex.length % 2 != 0 ? " " : "";

//   var c = hex.length / 2, arr = [];
//   for (var i = 0; i < c; i++) {
//     arr.push(parseInt(hex.substr(i * 2, 2), 16));
//   }
//   return arr;
// };

function padLeft(s, w, pc) {
  if (pc == undefined) {
    pc = '0';
  }
  for (var i = 0, c = w - s.length; i < c; i++) {
    s = pc + s;
  }
  return s;
};

function toString(arr, isReverse) {
  if (typeof isReverse == 'undefined') {
    isReverse = true;
  }
  var hi = arr[0], lo = arr[1];
  return padLeft((isReverse ? hi + lo * 0x100 : hi * 0x100 + lo).toString(16).toUpperCase(), 4, '0');
};


/**
* 16进制字符串异或处理
*
* @param str1
* @param str2
* @return
*/
function stringXor(str1, str2) {
  if (!str1 && !str2) {
    return "";
  }
  if (!str1 && str2) {
    return str2;
  }
  if (str1 && !str2) {
    return str1;
  }
  var longStr;
  var shortStr;
  if (str1.length >= str2.length) {
    longStr = str1;
    shortStr = str2;
  } else {
    longStr = str2;
    shortStr = str1;
  }
  var count = parseInt(shortStr.length / 2);
  var leftCount = longStr.length - shortStr.length;
  var resultStr = "";
  if (leftCount > 0) {
    resultStr += longStr.substr(0, leftCount);
  }
  for (var i = 0; i < count; i++) {
    var shortCharCode = parseInt(shortStr.substr(i * 2, 2), 16);
    var longCharCode = parseInt(longStr.substr(leftCount + i * 2, 2), 16);
    var resultCode = shortCharCode ^ longCharCode;
    var single = resultCode.toString(16);
    while (single.length < 2) single = "0".concat(single);
    resultStr += single;
  }
  return resultStr.toUpperCase();
}


/**
* 指令两个16进制字符串异或处理
*
* @param command
* @param secretKey
* @return
*/
function getSecretEncoding(command, secretKey) {
  if (!command || !secretKey) {
    return "";
  }
  var secretLength = secretKey.length;
  var length = parseInt(command.length / secretLength);
  console.log(`command(${command.length})/secretLength(${secretLength}) = ${length}`);
  var resultCmd = "";
  console.log(`secretKey(${secretKey.length}):${secretKey}`);
  for (var i = 0; i < length; i++) {
    var part = command.substr(i * secretLength, secretLength);
    resultCmd += stringXor(part, secretKey);
    console.log(`part${i}:${stringXor(part, secretKey)}`);
  }
  var lastLen = command.length % secretLength;
  if (lastLen > 0) {
    console.log(`lastCMD:${command.substr(command.length - lastLen, lastLen)}`);
    console.log(`lastSecretKey:${secretKey.substr(0, lastLen)}`);
    var lastPart = command.substr(command.length - lastLen, lastLen);
    var lastCmd = stringXor(lastPart, secretKey.substr(0, lastLen));
    resultCmd += lastCmd;
    console.log(`lastPart:${lastCmd}`);
  }
  return resultCmd;
}
/**
* 2、十六进制转换为字符串
*主要使用 fromCharCode()方法，此方法将 Unicode 码转换为与之对应的字符。
*/
function hexToString(str) {
  var val = "";
  var arr = str.split(",");
  for (var i = 0; i < arr.length; i++) {
    val += arr[i].fromCharCode(i);

  }
  return val;
}

/**
* 获取随机长度16进制字符串
*/
function getRamNumber(length) {
  var result = '';
  for (var i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 16).toString(16);//获取0-15并通过toString转16进制
  }
  //默认字母小写，手动转大写
  return result.toUpperCase();//另toLowerCase()转小写
}


/**
* 得到BCD码时间字符串
*
* @param datetime
* @return
*/
function getBCDTime(datetime, needWeek) {
  if (typeof datetime == 'undefined') {
    datetime = new Date();
  }
  if (typeof needWeek == 'undefined') {
    needWeek = true;
  }
  var year = datetime.getFullYear() - 2000; //获取年份,从2000年开始计算
  if (year < 0) year = 0; // 不允许小于2000年的年份出现
  var month = datetime.getMonth() + 1;//获取月份 0-11 所以需要加1
  var day = datetime.getDate();//获取日
  var hour = datetime.getHours();//小时
  var minute = datetime.getMinutes();//分
  var second = datetime.getSeconds();//秒
  if (needWeek) {
    var dayOfWeek = datetime.getDay();//一周的第几天 0-6
    return formatNumber(year) + formatNumber(month) + formatNumber(day) + formatNumber(dayOfWeek)
      + formatNumber(hour) + formatNumber(minute) + formatNumber(second);// 得到BCD码的时间字符串
  } else {
    return formatNumber(year) + formatNumber(month) + formatNumber(day)
      + formatNumber(hour) + formatNumber(minute) + formatNumber(second);// 得到BCD码的时间字符串
  }
}
function formatNumber(n) {
  n = n.toString()
  return (n[1] ? n : '0' + n) + "";
}



/**
* 判断一个字符串是否包含子串
*/
function isContains(str, substr) {

  var strUp = str.toUpperCase();
  var substrUp = substr.toUpperCase()

  return new RegExp(substrUp).test(strUp);
}

/**
* 去除字符串中特定的字符
*/
function removeBytes(str, substr) {
  var items = str.split(substr)
  // 会得到一个数组，数组中包括利用o分割后的多个字符串（不包括o）
  var newStr = items.join("");
  return newStr
  // }

}


module.exports = {
  isString:isString,
  isArray:isArray,
  hexString2ArrayBuffer: hexString2ArrayBuffer,
  arrayBuffer2HexString: arrayBuffer2HexString,
  string2ArrayBuffer: string2ArrayBuffer,
  arrayBuffer2String: arrayBuffer2String,
  // getCRCCmd: getCRCCmd,
  getBCDTime: getBCDTime,
  stringToHex: stringToHex,
  stringXor: stringXor,
  getSecretEncoding: getSecretEncoding,
  hexToString: hexToString,
  intTobytes: intTobytes,
  getRamNumber: getRamNumber,
  isContains: isContains,
  removeBytes: removeBytes
}
