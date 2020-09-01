// pages/ocrReading/ocrReading.js
//导入手写体识别
var handWrite = require('../../xunfeiUtil/handWriting');
var ost=require('../../xunfeiUtil/ots');
var logUtil=require('../../utils/logUtil');

const fsm = wx.getFileSystemManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    language:'en->cn',
    languageInd:0,
    line: [{
      "confidence": 1,
      "word": [{
        "content": "The"
      }, {
        "content": "terrible"
      }, {
        "content": "earthquake"
      }, {
        "content": "and"
      }, {
        "content": "the"
      }, {
        "content": "following"
      }, {
        "content": "tsunami"
      }]
    }, {
      "confidence": 1,
      "word": [{
        "content": "have"
      }, {
        "content": "caused"
      }, {
        "content": "so"
      }, {
        "content": "many"
      }, {
        "content": "people's"
      }, {
        "content": "injuries"
      }, {
        "content": "and"
      }, {
        "content": "deaths."
      }]
    }, {
      "confidence": 1,
      "word": [{
        "content": "Besides,"
      }, {
        "content": "many"
      }, {
        "content": "citizens"
      }, {
        "content": "become"
      }, {
        "content": "homeless."
      }, {
        "content": "We"
      }, {
        "content": "chinese"
      }, {
        "content": "feel"
      }]
    }, {
      "confidence": 1,
      "word": [{
        "content": "greatly"
      }, {
        "content": "sorry"
      }, {
        "content": "for"
      }, {
        "content": "the"
      }, {
        "content": "pains"
      }, {
        "content": "you"
      }, {
        "content": "are"
      }, {
        "content": "suffering."
      }, {
        "content": "And"
      }, {
        "content": "I"
      }]
    }, {
      "confidence": 1,
      "word": [{
        "content": "do"
      }, {
        "content": "hope"
      }, {
        "content": "you"
      }, {
        "content": "can"
      }, {
        "content": "overcome"
      }, {
        "content": "those"
      }, {
        "content": "great"
      }, {
        "content": "difficulties."
      }]
    }, {
      "confidence": 1,
      "word": [{
        "content": "Please"
      }, {
        "content": "remember"
      }, {
        "content": "Japan"
      }, {
        "content": "isn't"
      }, {
        "content": "alone.People"
      }, {
        "content": "all"
      }, {
        "content": "over"
      }, {
        "content": "the"
      }]
    }, {
      "confidence": 1,
      "word": [{
        "content": "world"
      }, {
        "content": "are"
      }, {
        "content": "lending"
      }, {
        "content": "hands"
      }, {
        "content": "to"
      }, {
        "content": "the"
      }, {
        "content": "areas"
      }, {
        "content": "struck"
      }, {
        "content": "by"
      }, {
        "content": "tsunam"
      }]
    }, {
      "confidence": 1,
      "word": [{
        "content": "and"
      }, {
        "content": "earthquake.Now"
      }, {
        "content": "that"
      }, {
        "content": "the"
      }, {
        "content": "disaster"
      }, {
        "content": "has"
      }, {
        "content": "happened"
      }]
    }, {
      "confidence": 1,
      "word": [{
        "content": "we"
      }, {
        "content": "should"
      }, {
        "content": "face"
      }, {
        "content": "it"
      }, {
        "content": "bravely"
      }, {
        "content": "and"
      }, {
        "content": "rebuild"
      }, {
        "content": "the"
      }, {
        "content": "homes."
      }, {
        "content": "thus"
      }]
    }, {
      "confidence": 1,
      "word": [{
        "content": "creating"
      }, {
        "content": "a"
      }, {
        "content": "stronger"
      }, {
        "content": "country."
      }, {
        "content": "Tomorrow"
      }, {
        "content": "is"
      }, {
        "content": "another"
      }, {
        "content": "day."
      }]
    }, {
      "confidence": 1,
      "word": [{
        "content": "All"
      }, {
        "content": "the"
      }, {
        "content": "things"
      }, {
        "content": "will"
      }, {
        "content": "be"
      }, {
        "content": "better."
      }]
    }],
    imgSrc: '../../images/ocr.jpg',
    showLoading: false,
    showText: "",
    translateText: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  chooseImg: function () {
    const that = this;
    that.setData({
      showLoading: true
    })
    wx.chooseImage({
      count: 1,
      success(res) {
        console.log(res.tempFilePaths[0]);
        var img = fsm.readFileSync(res.tempFilePaths[0], 'base64');
        that.data.imgSrc = res.tempFilePaths[0];
        logUtil.showLoading('正在上传图片');
        handWrite.requestUrl(img).then(
          res => {
            // console.log(res);
            if (res.data.data) {

              that.data.line = res.data.data.block[0].line;
              that.setData(that.data);
              that.data.line.forEach(item => {
                console.log(item)
              })
            }
            logUtil.hideLoading();
          },
          res => {
            console.log(res);
            logUtil.hideLoading();
          });
      },
      fail: (res) => {
        console.log(res, '识别失败')
      },
      complete: (res) => {
        that.setData({
          showLoading: false
        });
        logUtil.hideLoading();
      }
    })
  },
  seletorWord: function (e) {
    const that = this;
    var showText = that.data.showText + ' ' + e.target.id;
    that.setData({
      showText
    })
    // console.log(e)
  },
  toButtom: function () {
    wx.createSelectorQuery().select('#the-id').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
  },
  toTop: function () {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  copyText:function(){
    const that=this;
    if(that.data.showText==''){
      wx.showToast({
        title: '复制的内容为空',
      })
    }else{
      wx.setClipboardData({
        data: that.data.showText,
        success:function(){
          wx.showToast({
            title: '复制成功',
            icon:'success'
          })
        },
        fail(){
          wx.showToast({
            title: '复制失败',
          })
        }
      })
    }
  },
  seletorAll:function(){
    var showText=this.data.showText;
    var lines=this.data.line;
    for(var i in lines){
      for(var j in lines[i].word){
        showText=showText+ lines[i].word[j].content+' ';
      }
      showText+='\r\n';
    }
    this.setData({
      showText
    })

  },
  clearText:function(){
    this.setData({
      showText:'',
      translateText:''
    })
  },
  translateText:function(){
    if(this.data.showText!=''){
      logUtil.showLoading('翻译中');
      if(this.data.languageInd==0){
        ost.setTransform(this.data.showText,'en','cn');
      }else{
        ost.setTransform(this.data.showText,'cn','en');
      }
      ost.requestUrl().then((res)=>{
        console.log(res);
        if(res.data.data){
          this.setData({
            translateText:res.data.data.result.trans_result.dst
          })
        }   
        logUtil.hideLoading(); 
      },res=>{
        console.log(res);
        logUtil.hideLoading(); 
      })
    }else{
      wx.showToast({
        title: '内容为空',
        icon:'none'
      })
    }
  },
  transformLan:function(){
    var language=this.data.language;
    let languageInd=this.data.languageInd;
    if(languageInd===0){
      language='cn->en';
      languageInd=1;
    }else{
      language='en->cn';
      languageInd=0;
    }
    this.setData({
      language,
      languageInd
    })
  },
  textListener:function(e){
    this.setData({
      showText:e.detail.value
    })
  }

})