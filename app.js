//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log('用户信息:'+ res.code);
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        let scope=res.authSetting['scope.userInfo'];
        if (scope) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.openSetting({
            //如果点击了开启按钮，那么会调用成功回调。
              success: function(res) {
                //  打开之后再次获取
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    this.globalData.userInfo = res.userInfo
      
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(res)
                    }
                  },
                  fail:res=>{
                    console.log(res)
                  }
                })
              },
              fail:res=>{
                console.log(res)
              }
            })
        }
      }
    })
    // if(wx.canIUse('cloud')){
      //配置数据库信息
      wx.cloud.init({
        env:'yun-r0zzt',
        traceUser:true
      });
      this.cloudParameter.db=wx.cloud.database();
      this.cloudParameter.collection=this.cloudParameter.db.collection('xunfei_collection');
    // }else{
    //  wx.showToast({
    //    title: '请更新微信版本,\n否则部分功能不可用',
    //    icon:'none'
    //  })
    // }
  },
  globalData: {
    userInfo: null,
    userMsg:null
  },
  cloudParameter:{
    db:null,
    collection:null
  }
})