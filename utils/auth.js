var crypto = require('crypto-js')

exports.AUTH_PARAMS_ERROR = -1;
exports.AUTH_SECRET_ID_KEY_ERROR = -2;

exports.genSign = function(appid, secretkey, expired) {
  if (!expired) {
    return module.exports.AUTH_PARAMS_ERROR;
  }

  if (!secretkey) {
    return module.exports.AUTH_SECRET_ID_KEY_ERROR;
  }

  var now = parseInt(Date.now() / 1000);
  var rdm = parseInt(Math.random() * Math.pow(2, 32));

  var origin = 'a=' + appid + '&t=' + now + '&e=' + expired + '&r=' + rdm;

  var res = crypto.HmacSHA1(origin, secretkey);

  var sign = res.concat(crypto.enc.Utf8.parse(origin));

  return sign.toString(crypto.enc.Base64);
}