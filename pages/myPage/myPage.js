// pages/myPage/myPage.js
const app = getApp()
var logUtil=require('../../utils/logUtil');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBox:false,
    longPress:false,
    userIcon:'../../images/userInfo/userIcon.png',
    username:'点击头像进行登录',
    welcomeMsg:'欢迎您的使用',
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dbInfo:[],
    imgSrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        userIcon:app.globalData.userInfo.avatarUrl,
        username:app.globalData.userInfo.nickName
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          userIcon:app.globalData.userInfo.avatarUrl,
          username:app.globalData.userInfo.nickName
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            userIcon:app.globalData.userInfo.avatarUrl,
            username:app.globalData.userInfo.nickName
          })
        }
      })
    }
    if(this.data.userInfo){
      this.queryDb();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if(this.data.userInfo){
      this.queryDb();
    }
    this.setData(this.data);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfo:function(e){ 
    console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

          if (!app.globalData.userInfo){
            wx.getUserInfo({
              success:res=>{
                app.globalData.userInfo =  res.userInfo;
                this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true,
                  userIcon:res.userInfo.avatarUrl,
                  username:res.userInfo.nickName
                })
                this.queryDb();
              },fail(res){
                logUtil.log(res)
              }
            })
          }
        }
      },fail(res){
        console.log(res);
      }
    })
   
  },
    queryDb:function(){
    if(wx.cloud){
      //  app.cloudParameter.collection.where({
      //   openid:app.globalData.userMsg.openid
      // }).orderBy(
      //   "date","desc"
      // ).get()
      // .then(res=>{
      //   // console.log(res.data);
      //   this.setData(({
      //     dbInfo:res.data
      //   }))
      // // console.log(JSON.stringify(this.data.dbInfo) )
      // })
      // .catch(res=>{
      //   console.log(res);
      // })

      app.cloudParameter.collection.orderBy(
        "date","desc"
      ).get()
      .then(res=>{
        // console.log(res.data);
        this.setData(({
          dbInfo:res.data
        }))
      // console.log(JSON.stringify(this.data.dbInfo) )
      })
      .catch(res=>{
        console.log(res);
      })
    }
    
  },
  //监听长按事件，显示删除按钮
  delFun:function(e){
    this.setData({
      longPress:true
    })
    setTimeout(()=>{
      this.setData({
        longPress:false
      })
    },10000);
    // console.log(e)
  },
  //删除数据库中的记录
  delDb:function(e){
    // console.log(e.currentTarget.id);
    app.cloudParameter.collection.doc(e.currentTarget.id)
    .remove()
    .then(()=>{
      logUtil.showModal('数据情况','删除成功');
      // console.log('删除成功');
      this.queryDb();
    })
    .catch(()=>{
      logUtil.showModal('数据情况','删除失败');
      // console.log('删除失败');
    })
  },
  //打开列表中的图片
  openImg(e){
    // console.log(e)
    if(e.currentTarget.dataset.type==0){
      this.setData({
        imgSrc:e.currentTarget.dataset.text,
        showBox:true
      })
    }
  },
  closeImg(){
    this.setData({
      showBox:false
    })
  }
})