/**
 * wxPromisify
 * @fn 传入的函数，如wx.request、wx.download
 */

function wxPromisify(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        resolve(res)
        console.log(res)
      }

      obj.fail = function(res) {
        reject(res)
        console.log(res)
      }
      fn(obj) //执行函数，obj为传入函数的参数
    })
  }
}


function promisify(res) {
  return new Promise(function(resolve, reject) {
    resolve(res);
  });
}

module.exports = {
  wxPromisify: wxPromisify,
  promisify: promisify
}