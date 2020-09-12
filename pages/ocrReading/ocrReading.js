// pages/ocrReading/ocrReading.js
//导入手写体识别
var handWrite = require('../../xunfeiUtil/handWriting');
var ost=require('../../xunfeiUtil/ots');
var logUtil=require('../../utils/logUtil');
const app=getApp();
const fsm = wx.getFileSystemManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    language:'英文->中文',
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
    showText: "",
    translateText: ""
  },

  chooseImg: function () {
    const that = this;
    var fileID=null;
    wx.chooseImage({
      count: 1,
      success(res) {
        console.log(res.tempFilePaths[0]);
        var img = fsm.readFileSync(res.tempFilePaths[0], 'base64');
        that.data.imgSrc = res.tempFilePaths[0];
        console.log(res) 
        logUtil.showToast('图片加载成功');
        logUtil.showLoading('图片上传中...')
        handWrite.requestUrl(img).then(
          res => {
            // console.log(res);
            if (res.data.data) {
              logUtil.hideLoading();
              logUtil.showToast('图片识别成功');
              that.data.line = res.data.data.block[0].line;
              that.setData(that.data);
              that.data.line.forEach(item => {
                // console.log(item)
              });
              if( app.cloudParameter.db){
                wx.cloud.uploadFile({
                  cloudPath:`ocrImg/${new Date().valueOf()}.png`,
                  filePath: that.data.imgSrc,
                  success(res){
                    // console.log(that.analyzeLine(that.data.line));
                    fileID=res.fileID;
                    app.cloudParameter.collection.add({
                      data:{
                        // openid:app.globalData.userMsg.openid,
                        date:new Date(),
                        type:0,
                        source:fileID,
                        destination:that.analyzeLine(that.data.line)
                      }
                    });
                  },
                  fail(res){
                    console.log(res);
                  }
                })
              }
            }
          },
          res => {
            console.log(res);
            logUtil.hideLoading();
            logUtil.showToast('文件上传失败');
          });
      },
      fail: (res) => {
        logUtil.showToast('文件选择失败');
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
  //去到页面底部
  toButtom: function () {
    wx.createSelectorQuery().select('#the-id').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      wx.pageScrollTo({
        scrollTop: rect.bottom
      })
    }).exec()
  },
  //去到页面顶部
  toTop: function () {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  //复制文本
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
  //全选
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

  analyzeLine:function(lines){
    var showText='';
    for(var i in lines){
      for(var j in lines[i].word){
        showText=showText+ lines[i].word[j].content+' ';
      }
      showText+='\r\n';
    }
    return showText;
  },
  clearText:function(){
    this.setData({
      showText:'',
      translateText:''
    })
  },
  translateText:function(){
    const that=this;
    if(this.data.showText!=''){
      logUtil.showLoading('翻译中');
      if(this.data.languageInd==0){
        ost.setTransform(this.data.showText,'en','cn');
      }else{
        ost.setTransform(this.data.showText,'cn','en');
      }
      ost.requestUrl().then((res)=>{
        logUtil.log(res);
        if(res.data.data){
          this.setData({
            translateText:res.data.data.result.trans_result.dst
          });
          if(wx.cloud){
            app.cloudParameter.collection.add({
              data:{
                // openid:app.globalData.userMsg.openid,
                date:new Date(),
                type:1,
                source:that.data.showText,
                destination:that.data.translateText
              }
            });
          }
          logUtil.showToast('翻译成功');
        }   
        logUtil.hideLoading(); 
      },res=>{
        console.log(res);
        logUtil.showToast('翻译失败');
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
      language='中文->英文';
      languageInd=1;
    }else{
      language='英文->中文';
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