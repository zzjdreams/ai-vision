//index.js
//https://github.com/anrgct/utools-xunfei-ocr/blob/master/src/js/main.js
//获取应用实例
const app = getApp()
var openAi =require('../../utils/openAi');
var xunfei =require('../../utils/xunfei');

import {wxPromisify} from '../../utils/wxPromisify'

var fsm=wx.getFileSystemManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    line:[],
    imgSrc:'../../images/ocr.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var fsm=wx.getFileSystemManager();
    // // var img=fsm.readFileSync('../../images/ocr.jpg','base64');
    // var img=fsm.access({
    //   path:'../../images/ocr.jpg',
    //   success(res){
    //     console.log(res);
    //   },
    //   fail(res){
    //     console.log(res)
    //   }
    // });
    // console.log(img);
    
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

   chooseImg:function(){
     const that=this;
    wx.chooseImage({
      count:1,
      success(res){
        console.log(res.tempFilePaths[0]);
        var img=fsm.readFileSync(res.tempFilePaths[0],'base64');
        that.data.imgSrc=res.tempFilePaths[0];
        xunfei.requestUrl(img).then(
          res=>{
            console.log(res);
            that.data.line=res.data.data.block[0].line;
            
            that.setData(that.data);
            that.data.line.forEach(item=>{
              console.log(item)
            })
          },
          res=>{console.log(res)});
      },
      fail:(res)=>{
        console.log(res,'识别失败')
      }
    })
  }
})
