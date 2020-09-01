var isDebug ; //控制是否打印日志的开关
var loadingIsShow = false;

var showTimer;

if (__wxConfig.envVersion == 'release') {
  isDebug = false;
} else {
  isDebug = true;
}

function debugToast(title) { //显示Toast
  if (isDebug) {
    if (title == '') {
      return;
    }
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 2000,
      mask: true,
    })
    return;
  } else {
    return;
  }
}

function showToast(title) { //显示Toast
  if (title == '') {
    return;
  }
   wx.showToast({
    title: title,
    icon: 'none',
    duration: 1500,
    mask: true,
  })
  return;
}

function log(title, content) { //显示log
  if (isDebug) {
    if (content == null) {
      return console.log(title);
    }
    return console.log(title, content);
  }
  return;
}

function showLoading(title) {
  if (title == undefined) {
    return;
  } else {
    clearTimeout(showTimer);
    showTimer=setTimeout(()=>{
      hideLoading();
      showLoading=false;
    },10000)
    if (!loadingIsShow) {
      wx.showLoading({
        title: title,
        mask: true
      })

      loadingIsShow=true

    }
  }
}

function hideLoading() {
  if(loadingIsShow){
    wx.hideLoading();
    loadingIsShow= false
  }
}

function showModal(title,content){
  if(typeof content=='undefined'){
    wx.showModal({
      title: '',
      content: content,
    })
  }else{
    wx.showModal({
      title: title,
      content: content,
    })
  }
}

module.exports = {
  debugToast: debugToast,
  showToast: showToast,
  log: log,
  showModal: showModal,
  showLoading:showLoading,
  hideLoading:hideLoading
}