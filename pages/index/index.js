//index.js
//https://github.com/anrgct/utools-xunfei-ocr/blob/master/src/js/main.js
//获取应用实例
const app = getApp()
var xunfei =require('../../xunfeiUtil/handWriting');

import {wxPromisify} from '../../utils/wxPromisify'

var fsm=wx.getFileSystemManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    applictaion:[
      {
        titleName:'文字识别',
        subApp:[
          {
            imgUrl:"",
            appName:"第一个应用",
            nav:''
          }
        ]
      }
    ],

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '请等一下',
      duration:3000,
      icon:"loading",
      mask:true
    })
    this.addApplication();
    this.jumpNav();
    
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

  addApplication:function(){
    // var applictaion=this.data.applictaion;
    var applictaion=[
      {
        titleName:'文字识别',
        subApp:[
          {
            imgUrl:"https://6464-ddr-ebpze-1259562605.tcb.qcloud.la/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%8A%9F%E8%83%BD%E5%90%88%E9%9B%86/OCR.png?sign=1df2decffba49a99d40261a43048e5c9&t=1599131210",
            appName:"手写体识别",
            nav:'../ocrReading/ocrReading'          
          },
          // {
          //   imgUrl:"https://6464-ddr-ebpze-1259562605.tcb.qcloud.la/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%8A%9F%E8%83%BD%E5%90%88%E9%9B%86/bluetooth.png?sign=3a65fc4ec00dc92fe1cefb0ea55bb823&t=1591519399",
          //   appName:"手写体识别",
          //   nav:'../ocrReading/ocrReading'          
          // },
        ]
      },
      // {
      //   titleName:'图片识别',
      //   subApp:[
      //     {
      //       imgUrl:"https://6464-ddr-ebpze-1259562605.tcb.qcloud.la/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%8A%9F%E8%83%BD%E5%90%88%E9%9B%86/bluetooth.png?sign=3a65fc4ec00dc92fe1cefb0ea55bb823&t=1591519399",
      //       appName:"ble蓝牙",
      //       nav:''
      //     }
      //   ]
      // }
    ]
    // for(var i in applictaion){
    //   for(var j in applictaion[i].subApp){
    //     while(applictaion[i].subApp.length%4!=0){
    //       applictaion[i].subApp.push({
    //         imgUrl:"",
    //         appName:"",
    //         nav:''
    //       })
    //     }
    //   }
    // }
    this.setData({
      applictaion
    })
  },
  callPage:function(e){
    console.log(e);
    wx.setStorage({
      data: e.currentTarget.id,
      key: 'nav_url',
    })
    wx.navigateTo({
      url: e.currentTarget.id,
    })
  },
  jumpNav:function(){
    wx.getStorage({
      key: 'nav_url',
      success:function(res){
        wx.navigateTo({
          url: res.data,
        })
      },
      fail:function(){
        console.log('can not jump nav')
      }
    })
  },

})
