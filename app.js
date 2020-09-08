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
        console.log('用户信息:'+ res.code);
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
          method:'GET',
          data:{
            appid:'wx5f037b7ad8d5228d',
            secret:'ed8cf5efa72f8192ef2dfab1c71c2c03',
            js_code:res.code,
            grant_type:'authorization_code'
          },
          success:res=>{
            // console.log('success',res);
            this.globalData.userMsg=res.data;
            // console.log(this.globalData.userMsg)
          },
          fail(res){
            console.log('fail',res)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
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
        }
      }
    })
    // if(wx.canIUse('cloud')){
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