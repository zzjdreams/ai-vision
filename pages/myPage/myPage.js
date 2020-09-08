// pages/myPage/myPage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longPress:false,
    userIcon:'../../images/userInfo/userIcon.png',
    username:'点击头像进行登录',
    welcomeMsg:'欢迎您的使用',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dbInfo:null
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
    this.queryDb();
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
    this.queryDb();
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
    if (app.globalData.userInfo){
      wx.getUserInfo({
        success:res=>{
          app.globalData.userInfo = e.detail.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            userIcon:res.userInfo.avatarUrl,
            username:res.userInfo.nickName
          })
        }
      })
    }
   
  },
    queryDb:function(){
    // if(wx.cloud){
    //   console.log('openid',app.globalData.userMsg)
    //    app.cloudParameter.collection.where({
    //     openid:app.globalData.userMsg.openid
    //   }).orderBy(
    //     "date","desc"
    //   ).get()
    //   .then(res=>{
    //     console.log(res.data);
    //     this.setData(({
    //       dbInfo:res.data
    //     }))
    //   console.log(JSON.stringify(this.data.dbInfo) )
    //   })
    //   .catch(res=>{
    //     console.log(res);
    //   })
    // }
    this.setData({
      dbInfo:[{"_id":"65825b355f560a0600f23cd96d28e97b","_openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","date":"2020-09-07T10:23:02.119Z","destination":"20:06 \nX Small Program Cloud Development Challenge-Competition Rules WeChat... \n1. Projects whose works need to be developed between August and September 2020 are not allowed to be taken. \nRepeated submissions are made for projects, unless significant functional overlap is made based on existing projects. \nGeneration.  \n2. The work should have the characteristics of easy deployment, high availability, low cost and high efficiency.  \n3. The works should be designed and developed with originality according to the actual application requirements, and the small and medium-sized works should be designed and developed. \nProgram applications need to conform to WeChat's \"open service categories for small programs.\" \nFixed, and must follow WeChat applet design guidelines, development standards and \"WeChat \nRelevant agreements and regulations such as \"Operation Specification for Small Program Platforms\"; Public Number Application \nRelevant agreements and regulations such as WeChat Public Number Developer Specification must be followed.  \n4. There is no limit to the theme of the work. Participants can choose by themselves, including but \nNot limited to public welfare, health care, environmental protection, energy, pension, organization and management, \nSmart Campus, Smart Transportation, Smart City, Smart Logistics, and Social Services \nRelevant Internet of Things, food safety direction, etc.  \nSpecification for submission of entries: \n1. Specification for introduction of works: The introduction of works is mainly used for preliminary referendums, which is very convenient. \nHome knows the details of the work.  \n2. Title Format: # Cloud Development Challenge #-Name of Work-Name of Team (50 words \nWithin). \n3. Introduction module: including but not limited to application scenarios, target users and implementation ideas \nRoads, architecture diagrams, effect screenshots, code links, and work experience QR codes (such as \nOnline), Team/Author Profile. \n4. Publishing Platform: WeChat Open Community-# Cloud Development Section-Select Publishing Text \nChapter.  \n5. Source Code Specification of Works: Participants can complete the work by submitting the code hosting address. \nWork source code submission, code work specification, please refer to \nHttps://developers.weixin.qq.com/community/develop/do \nC/000ee888f74ae00633ca634df55409.  \n5. Description of Competition System \nCollect Comments \nThe competition is divided into five stages: registration-team formation, submission of works, case fee, re-fee and volumetric fee. \n","openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","source":"20:06 \r\n×小程序云开发挑战赛——大赛规程|微信…… \r\n1、作品需在2020年8月-9月期间研发的项目，不允许拿已 \r\n有项目进行重复提交，除非基于已有项目进行重大功能迭 \r\n代。 \r\n2、作品需具有易部署、高可用、低成本、高效率等特性。 \r\n3、作品应结合实际应用需求进行原创性的设计与开发，小 \r\n程序类应用需要符合微信《小程序开放的服务类目》的规 \r\n定，且必须遵循微信小程序设计指南、开发标准和《微信 \r\n小程序平台运营规范》等相关协议及规定；公众号类应用 \r\n必须遵循微信公众号开发者规范等相关协议及规定。 \r\n4、对于作品主题不限，参赛者可以自行选择，可以包括但 \r\n不限于公益、健康医疗、环保、能源、养老、组织管理、 \r\n智慧校园、智慧交通、智慧城市、智慧物流、与社会服务 \r\n相关的物联网、食品安全方向等。 \r\n参赛作品提交规范： \r\n1、作品介绍规范：作品介绍主要用于初赛公投时，方便大 \r\n家了解作品详情。 \r\n2、标题格式：#云开发挑战赛#-作品名称-团队名称（50字 \r\n以内）。 \r\n3、介绍模块：包括但不限于应用场景，目标用户，实现思 \r\n路、架构图、效果截图、代码链接、作品体验二维码（如 \r\n已上线）、团队/作者简介。 \r\n4、发布平台：微信开放社区-#云开发板块-选择发布文 \r\n章。 \r\n5、作品源码规范：参赛者通过提交代码托管地址方式完成 \r\n作品源码提交，代码作品规范，请参见 \r\nhttps://developers.weixin.qq.com/community/develop/do \r\nc/000ee888f74ae00633ca634df55409。 \r\n五、赛制说明 \r\n★收藏 评论 \r\n大赛分为报名&组队、提交作品、例费、复费、伏费5个阶 \r\n","type":1},{"_id":"ac5f38825f5609f2012431aa0f21d4e0","_openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","date":"2020-09-07T10:22:41.459Z","destination":"[{\"confidence\":1,\"word\":[{\"content\":\"20:06\"}]},{\"confidence\":1,\"word\":[{\"content\":\"×小程序云开发挑战赛——大赛规程|微信……\"}]},{\"confidence\":1,\"word\":[{\"content\":\"1、作品需在2020年8月-9月期间研发的项目，不允许拿已\"}]},{\"confidence\":1,\"word\":[{\"content\":\"有项目进行重复提交，除非基于已有项目进行重大功能迭\"}]},{\"confidence\":1,\"word\":[{\"content\":\"代。\"}]},{\"confidence\":1,\"word\":[{\"content\":\"2、作品需具有易部署、高可用、低成本、高效率等特性。\"}]},{\"confidence\":1,\"word\":[{\"content\":\"3、作品应结合实际应用需求进行原创性的设计与开发，小\"}]},{\"confidence\":1,\"word\":[{\"content\":\"程序类应用需要符合微信《小程序开放的服务类目》的规\"}]},{\"confidence\":1,\"word\":[{\"content\":\"定，且必须遵循微信小程序设计指南、开发标准和《微信\"}]},{\"confidence\":1,\"word\":[{\"content\":\"小程序平台运营规范》等相关协议及规定；公众号类应用\"}]},{\"confidence\":1,\"word\":[{\"content\":\"必须遵循微信公众号开发者规范等相关协议及规定。\"}]},{\"confidence\":1,\"word\":[{\"content\":\"4、对于作品主题不限，参赛者可以自行选择，可以包括但\"}]},{\"confidence\":1,\"word\":[{\"content\":\"不限于公益、健康医疗、环保、能源、养老、组织管理、\"}]},{\"confidence\":1,\"word\":[{\"content\":\"智慧校园、智慧交通、智慧城市、智慧物流、与社会服务\"}]},{\"confidence\":1,\"word\":[{\"content\":\"相关的物联网、食品安全方向等。\"}]},{\"confidence\":1,\"word\":[{\"content\":\"参赛作品提交规范：\"}]},{\"confidence\":1,\"word\":[{\"content\":\"1、作品介绍规范：作品介绍主要用于初赛公投时，方便大\"}]},{\"confidence\":1,\"word\":[{\"content\":\"家了解作品详情。\"}]},{\"confidence\":1,\"word\":[{\"content\":\"2、标题格式：#云开发挑战赛#-作品名称-团队名称（50字\"}]},{\"confidence\":1,\"word\":[{\"content\":\"以内）。\"}]},{\"confidence\":1,\"word\":[{\"content\":\"3、介绍模块：包括但不限于应用场景，目标用户，实现思\"}]},{\"confidence\":1,\"word\":[{\"content\":\"路、架构图、效果截图、代码链接、作品体验二维码（如\"}]},{\"confidence\":1,\"word\":[{\"content\":\"已上线）、团队/作者简介。\"}]},{\"confidence\":1,\"word\":[{\"content\":\"4、发布平台：微信开放社区-#云开发板块-选择发布文\"}]},{\"confidence\":1,\"word\":[{\"content\":\"章。\"}]},{\"confidence\":1,\"word\":[{\"content\":\"5、作品源码规范：参赛者通过提交代码托管地址方式完成\"}]},{\"confidence\":1,\"word\":[{\"content\":\"作品源码提交，代码作品规范，请参见\"}]},{\"confidence\":1,\"word\":[{\"content\":\"https://developers.weixin.qq.com/community/develop/do\"}]},{\"confidence\":1,\"word\":[{\"content\":\"c/000ee888f74ae00633ca634df55409。\"}]},{\"confidence\":1,\"word\":[{\"content\":\"五、赛制说明\"}]},{\"confidence\":1,\"word\":[{\"content\":\"★收藏\"},{\"content\":\"评论\"}]},{\"confidence\":1,\"word\":[{\"content\":\"大赛分为报名&组队、提交作品、例费、复费、伏费5个阶\"}]}]","openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","source":"cloud://yun-r0zzt.7975-yun-r0zzt-1302999632/ocrImg/1599474159644.png","type":0},{"_id":"ac5f38825f56098b012429e67e952156","_openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","date":"2020-09-07T10:20:58.761Z","destination":"可怕的地震和随之而来的海啸\n造成了这么多人的伤亡。\n此外，许多市民变得无家可归。我们中国人觉得\n对你所遭受的痛苦深表歉意。而我\n我真希望你能克服那些巨大的困难。\n请记住，日本并不孤单，世界各地的人们\n世界各国向遭受海啸袭击的地区伸出援手\n还有地震。现在灾难已经发生了\n我们应该勇敢面对，重建家园。因此\n创造一个更强大的国家。明天又是新的一天。\n一切都会好起来的。\n","openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","source":"The terrible earthquake and the following tsunami \r\nhave caused so many people's injuries and deaths. \r\nBesides, many citizens become homeless. We chinese feel \r\ngreatly sorry for the pains you are suffering. And I \r\ndo hope you can overcome those great difficulties. \r\nPlease remember Japan isn't alone.People all over the \r\nworld are lending hands to the areas struck by tsunam \r\nand earthquake.Now that the disaster has happened \r\nwe should face it bravely and rebuild the homes. thus \r\ncreating a stronger country. Tomorrow is another day. \r\nAll the things will be better. \r\n","type":1},{"_id":"aa133ce55f56088700e431115658c2a6","_openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","date":"2020-09-07T10:16:38.969Z","destination":"[{\"confidence\":1,\"word\":[{\"content\":\"The\"},{\"content\":\"terrible\"},{\"content\":\"earthquake\"},{\"content\":\"and\"},{\"content\":\"the\"},{\"content\":\"following\"},{\"content\":\"tsunami\"}]},{\"confidence\":1,\"word\":[{\"content\":\"have\"},{\"content\":\"caused\"},{\"content\":\"so\"},{\"content\":\"many\"},{\"content\":\"people's\"},{\"content\":\"injuries\"},{\"content\":\"and\"},{\"content\":\"deaths.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Besides,\"},{\"content\":\"many\"},{\"content\":\"citizens\"},{\"content\":\"become\"},{\"content\":\"homeless.\"},{\"content\":\"We\"},{\"content\":\"chinese\"},{\"content\":\"feel\"}]},{\"confidence\":1,\"word\":[{\"content\":\"greatly\"},{\"content\":\"sorry\"},{\"content\":\"for\"},{\"content\":\"the\"},{\"content\":\"pains\"},{\"content\":\"you\"},{\"content\":\"are\"},{\"content\":\"suffering.\"},{\"content\":\"And\"},{\"content\":\"I\"}]},{\"confidence\":1,\"word\":[{\"content\":\"do\"},{\"content\":\"hope\"},{\"content\":\"you\"},{\"content\":\"can\"},{\"content\":\"overcome\"},{\"content\":\"those\"},{\"content\":\"great\"},{\"content\":\"difficulties.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Please\"},{\"content\":\"remember\"},{\"content\":\"Japan\"},{\"content\":\"isn't\"},{\"content\":\"alone.People\"},{\"content\":\"all\"},{\"content\":\"over\"},{\"content\":\"the\"}]},{\"confidence\":1,\"word\":[{\"content\":\"world\"},{\"content\":\"are\"},{\"content\":\"lending\"},{\"content\":\"hands\"},{\"content\":\"to\"},{\"content\":\"the\"},{\"content\":\"areas\"},{\"content\":\"struck\"},{\"content\":\"by\"},{\"content\":\"tsunam\"}]},{\"confidence\":1,\"word\":[{\"content\":\"and\"},{\"content\":\"earthquake.Now\"},{\"content\":\"that\"},{\"content\":\"the\"},{\"content\":\"disaster\"},{\"content\":\"has\"},{\"content\":\"happened\"}]},{\"confidence\":1,\"word\":[{\"content\":\"we\"},{\"content\":\"should\"},{\"content\":\"face\"},{\"content\":\"it\"},{\"content\":\"bravely\"},{\"content\":\"and\"},{\"content\":\"rebuild\"},{\"content\":\"the\"},{\"content\":\"homes.\"},{\"content\":\"thus\"}]},{\"confidence\":1,\"word\":[{\"content\":\"creating\"},{\"content\":\"a\"},{\"content\":\"stronger\"},{\"content\":\"country.\"},{\"content\":\"Tomorrow\"},{\"content\":\"is\"},{\"content\":\"another\"},{\"content\":\"day.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"All\"},{\"content\":\"the\"},{\"content\":\"things\"},{\"content\":\"will\"},{\"content\":\"be\"},{\"content\":\"better.\"}]}]","openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","source":"cloud://yun-r0zzt.7975-yun-r0zzt-1302999632/ocrImg/1599473798063.png","type":0},{"_id":"6518b7395f5606c3011a21f0296c6207","_openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","date":"2020-09-07T10:09:07.267Z","destination":"[{\"confidence\":1,\"word\":[{\"content\":\"The\"},{\"content\":\"terrible\"},{\"content\":\"earthquake\"},{\"content\":\"and\"},{\"content\":\"the\"},{\"content\":\"following\"},{\"content\":\"tsunami\"}]},{\"confidence\":1,\"word\":[{\"content\":\"have\"},{\"content\":\"caused\"},{\"content\":\"so\"},{\"content\":\"many\"},{\"content\":\"people's\"},{\"content\":\"injuries\"},{\"content\":\"and\"},{\"content\":\"deaths.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Besides,\"},{\"content\":\"many\"},{\"content\":\"citizens\"},{\"content\":\"become\"},{\"content\":\"homeless.\"},{\"content\":\"We\"},{\"content\":\"chinese\"},{\"content\":\"feel\"}]},{\"confidence\":1,\"word\":[{\"content\":\"greatly\"},{\"content\":\"sorry\"},{\"content\":\"for\"},{\"content\":\"the\"},{\"content\":\"pains\"},{\"content\":\"you\"},{\"content\":\"are\"},{\"content\":\"suffering.\"},{\"content\":\"And\"},{\"content\":\"I\"}]},{\"confidence\":1,\"word\":[{\"content\":\"do\"},{\"content\":\"hope\"},{\"content\":\"you\"},{\"content\":\"can\"},{\"content\":\"overcome\"},{\"content\":\"those\"},{\"content\":\"great\"},{\"content\":\"difficulties.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Please\"},{\"content\":\"remember\"},{\"content\":\"Japan\"},{\"content\":\"isn't\"},{\"content\":\"alone.People\"},{\"content\":\"all\"},{\"content\":\"over\"},{\"content\":\"the\"}]},{\"confidence\":1,\"word\":[{\"content\":\"world\"},{\"content\":\"are\"},{\"content\":\"lending\"},{\"content\":\"hands\"},{\"content\":\"to\"},{\"content\":\"the\"},{\"content\":\"areas\"},{\"content\":\"struck\"},{\"content\":\"by\"},{\"content\":\"tsunam\"}]},{\"confidence\":1,\"word\":[{\"content\":\"and\"},{\"content\":\"earthquake.Now\"},{\"content\":\"that\"},{\"content\":\"the\"},{\"content\":\"disaster\"},{\"content\":\"has\"},{\"content\":\"happened\"}]},{\"confidence\":1,\"word\":[{\"content\":\"we\"},{\"content\":\"should\"},{\"content\":\"face\"},{\"content\":\"it\"},{\"content\":\"bravely\"},{\"content\":\"and\"},{\"content\":\"rebuild\"},{\"content\":\"the\"},{\"content\":\"homes.\"},{\"content\":\"thus\"}]},{\"confidence\":1,\"word\":[{\"content\":\"creating\"},{\"content\":\"a\"},{\"content\":\"stronger\"},{\"content\":\"country.\"},{\"content\":\"Tomorrow\"},{\"content\":\"is\"},{\"content\":\"another\"},{\"content\":\"day.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"All\"},{\"content\":\"the\"},{\"content\":\"things\"},{\"content\":\"will\"},{\"content\":\"be\"},{\"content\":\"better.\"}]}]","openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","source":"cloud://yun-r0zzt.7975-yun-r0zzt-1302999632/ocrImg/1.png","type":0},{"_id":"65825b355f5606ad00f21a7a31342035","_openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","date":"2020-09-07T10:08:45.271Z","destination":"[{\"confidence\":1,\"word\":[{\"content\":\"The\"},{\"content\":\"terrible\"},{\"content\":\"earthquake\"},{\"content\":\"and\"},{\"content\":\"the\"},{\"content\":\"following\"},{\"content\":\"tsunami\"}]},{\"confidence\":1,\"word\":[{\"content\":\"have\"},{\"content\":\"caused\"},{\"content\":\"so\"},{\"content\":\"many\"},{\"content\":\"people's\"},{\"content\":\"injuries\"},{\"content\":\"and\"},{\"content\":\"deaths.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Besides,\"},{\"content\":\"many\"},{\"content\":\"citizens\"},{\"content\":\"become\"},{\"content\":\"homeless.\"},{\"content\":\"We\"},{\"content\":\"chinese\"},{\"content\":\"feel\"}]},{\"confidence\":1,\"word\":[{\"content\":\"greatly\"},{\"content\":\"sorry\"},{\"content\":\"for\"},{\"content\":\"the\"},{\"content\":\"pains\"},{\"content\":\"you\"},{\"content\":\"are\"},{\"content\":\"suffering.\"},{\"content\":\"And\"},{\"content\":\"I\"}]},{\"confidence\":1,\"word\":[{\"content\":\"do\"},{\"content\":\"hope\"},{\"content\":\"you\"},{\"content\":\"can\"},{\"content\":\"overcome\"},{\"content\":\"those\"},{\"content\":\"great\"},{\"content\":\"difficulties.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Please\"},{\"content\":\"remember\"},{\"content\":\"Japan\"},{\"content\":\"isn't\"},{\"content\":\"alone.People\"},{\"content\":\"all\"},{\"content\":\"over\"},{\"content\":\"the\"}]},{\"confidence\":1,\"word\":[{\"content\":\"world\"},{\"content\":\"are\"},{\"content\":\"lending\"},{\"content\":\"hands\"},{\"content\":\"to\"},{\"content\":\"the\"},{\"content\":\"areas\"},{\"content\":\"struck\"},{\"content\":\"by\"},{\"content\":\"tsunam\"}]},{\"confidence\":1,\"word\":[{\"content\":\"and\"},{\"content\":\"earthquake.Now\"},{\"content\":\"that\"},{\"content\":\"the\"},{\"content\":\"disaster\"},{\"content\":\"has\"},{\"content\":\"happened\"}]},{\"confidence\":1,\"word\":[{\"content\":\"we\"},{\"content\":\"should\"},{\"content\":\"face\"},{\"content\":\"it\"},{\"content\":\"bravely\"},{\"content\":\"and\"},{\"content\":\"rebuild\"},{\"content\":\"the\"},{\"content\":\"homes.\"},{\"content\":\"thus\"}]},{\"confidence\":1,\"word\":[{\"content\":\"creating\"},{\"content\":\"a\"},{\"content\":\"stronger\"},{\"content\":\"country.\"},{\"content\":\"Tomorrow\"},{\"content\":\"is\"},{\"content\":\"another\"},{\"content\":\"day.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"All\"},{\"content\":\"the\"},{\"content\":\"things\"},{\"content\":\"will\"},{\"content\":\"be\"},{\"content\":\"better.\"}]}]","openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","source":"cloud://yun-r0zzt.7975-yun-r0zzt-1302999632/ocrImg/1.png","type":0},{"_id":"7498b5fe5f56060e01215bae15d22d54","_openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","date":"2020-09-07T10:06:05.444Z","destination":"[{\"confidence\":1,\"word\":[{\"content\":\"The\"},{\"content\":\"terrible\"},{\"content\":\"earthquake\"},{\"content\":\"and\"},{\"content\":\"the\"},{\"content\":\"following\"},{\"content\":\"tsunami\"}]},{\"confidence\":1,\"word\":[{\"content\":\"have\"},{\"content\":\"caused\"},{\"content\":\"so\"},{\"content\":\"many\"},{\"content\":\"people's\"},{\"content\":\"injuries\"},{\"content\":\"and\"},{\"content\":\"deaths.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Besides,\"},{\"content\":\"many\"},{\"content\":\"citizens\"},{\"content\":\"become\"},{\"content\":\"homeless.\"},{\"content\":\"We\"},{\"content\":\"chinese\"},{\"content\":\"feel\"}]},{\"confidence\":1,\"word\":[{\"content\":\"greatly\"},{\"content\":\"sorry\"},{\"content\":\"for\"},{\"content\":\"the\"},{\"content\":\"pains\"},{\"content\":\"you\"},{\"content\":\"are\"},{\"content\":\"suffering.\"},{\"content\":\"And\"},{\"content\":\"I\"}]},{\"confidence\":1,\"word\":[{\"content\":\"do\"},{\"content\":\"hope\"},{\"content\":\"you\"},{\"content\":\"can\"},{\"content\":\"overcome\"},{\"content\":\"those\"},{\"content\":\"great\"},{\"content\":\"difficulties.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Please\"},{\"content\":\"remember\"},{\"content\":\"Japan\"},{\"content\":\"isn't\"},{\"content\":\"alone.People\"},{\"content\":\"all\"},{\"content\":\"over\"},{\"content\":\"the\"}]},{\"confidence\":1,\"word\":[{\"content\":\"world\"},{\"content\":\"are\"},{\"content\":\"lending\"},{\"content\":\"hands\"},{\"content\":\"to\"},{\"content\":\"the\"},{\"content\":\"areas\"},{\"content\":\"struck\"},{\"content\":\"by\"},{\"content\":\"tsunam\"}]},{\"confidence\":1,\"word\":[{\"content\":\"and\"},{\"content\":\"earthquake.Now\"},{\"content\":\"that\"},{\"content\":\"the\"},{\"content\":\"disaster\"},{\"content\":\"has\"},{\"content\":\"happened\"}]},{\"confidence\":1,\"word\":[{\"content\":\"we\"},{\"content\":\"should\"},{\"content\":\"face\"},{\"content\":\"it\"},{\"content\":\"bravely\"},{\"content\":\"and\"},{\"content\":\"rebuild\"},{\"content\":\"the\"},{\"content\":\"homes.\"},{\"content\":\"thus\"}]},{\"confidence\":1,\"word\":[{\"content\":\"creating\"},{\"content\":\"a\"},{\"content\":\"stronger\"},{\"content\":\"country.\"},{\"content\":\"Tomorrow\"},{\"content\":\"is\"},{\"content\":\"another\"},{\"content\":\"day.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"All\"},{\"content\":\"the\"},{\"content\":\"things\"},{\"content\":\"will\"},{\"content\":\"be\"},{\"content\":\"better.\"}]}]","openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","source":"cloud://yun-r0zzt.7975-yun-r0zzt-1302999632/ocrImg/1.png","type":0},{"_id":"b5416b755f560569014eab371e6dbf98","_openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","date":"2020-09-07T10:03:21.074Z","destination":"[{\"confidence\":1,\"word\":[{\"content\":\"The\"},{\"content\":\"terrible\"},{\"content\":\"earthquake\"},{\"content\":\"and\"},{\"content\":\"the\"},{\"content\":\"following\"},{\"content\":\"tsunami\"}]},{\"confidence\":1,\"word\":[{\"content\":\"have\"},{\"content\":\"caused\"},{\"content\":\"so\"},{\"content\":\"many\"},{\"content\":\"people's\"},{\"content\":\"injuries\"},{\"content\":\"and\"},{\"content\":\"deaths.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Besides,\"},{\"content\":\"many\"},{\"content\":\"citizens\"},{\"content\":\"become\"},{\"content\":\"homeless.\"},{\"content\":\"We\"},{\"content\":\"chinese\"},{\"content\":\"feel\"}]},{\"confidence\":1,\"word\":[{\"content\":\"greatly\"},{\"content\":\"sorry\"},{\"content\":\"for\"},{\"content\":\"the\"},{\"content\":\"pains\"},{\"content\":\"you\"},{\"content\":\"are\"},{\"content\":\"suffering.\"},{\"content\":\"And\"},{\"content\":\"I\"}]},{\"confidence\":1,\"word\":[{\"content\":\"do\"},{\"content\":\"hope\"},{\"content\":\"you\"},{\"content\":\"can\"},{\"content\":\"overcome\"},{\"content\":\"those\"},{\"content\":\"great\"},{\"content\":\"difficulties.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Please\"},{\"content\":\"remember\"},{\"content\":\"Japan\"},{\"content\":\"isn't\"},{\"content\":\"alone.People\"},{\"content\":\"all\"},{\"content\":\"over\"},{\"content\":\"the\"}]},{\"confidence\":1,\"word\":[{\"content\":\"world\"},{\"content\":\"are\"},{\"content\":\"lending\"},{\"content\":\"hands\"},{\"content\":\"to\"},{\"content\":\"the\"},{\"content\":\"areas\"},{\"content\":\"struck\"},{\"content\":\"by\"},{\"content\":\"tsunam\"}]},{\"confidence\":1,\"word\":[{\"content\":\"and\"},{\"content\":\"earthquake.Now\"},{\"content\":\"that\"},{\"content\":\"the\"},{\"content\":\"disaster\"},{\"content\":\"has\"},{\"content\":\"happened\"}]},{\"confidence\":1,\"word\":[{\"content\":\"we\"},{\"content\":\"should\"},{\"content\":\"face\"},{\"content\":\"it\"},{\"content\":\"bravely\"},{\"content\":\"and\"},{\"content\":\"rebuild\"},{\"content\":\"the\"},{\"content\":\"homes.\"},{\"content\":\"thus\"}]},{\"confidence\":1,\"word\":[{\"content\":\"creating\"},{\"content\":\"a\"},{\"content\":\"stronger\"},{\"content\":\"country.\"},{\"content\":\"Tomorrow\"},{\"content\":\"is\"},{\"content\":\"another\"},{\"content\":\"day.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"All\"},{\"content\":\"the\"},{\"content\":\"things\"},{\"content\":\"will\"},{\"content\":\"be\"},{\"content\":\"better.\"}]}]","openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","source":null,"type":0},{"_id":"aa133ce55f55d29b00e167642d0fca90","_openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","date":"2020-09-07T06:26:34.858Z","destination":"[{\"confidence\":1,\"word\":[{\"content\":\"The\"},{\"content\":\"terrible\"},{\"content\":\"earthquake\"},{\"content\":\"and\"},{\"content\":\"the\"},{\"content\":\"following\"},{\"content\":\"tsunami\"}]},{\"confidence\":1,\"word\":[{\"content\":\"have\"},{\"content\":\"caused\"},{\"content\":\"so\"},{\"content\":\"many\"},{\"content\":\"people's\"},{\"content\":\"injuries\"},{\"content\":\"and\"},{\"content\":\"deaths.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Besides,\"},{\"content\":\"many\"},{\"content\":\"citizens\"},{\"content\":\"become\"},{\"content\":\"homeless.\"},{\"content\":\"We\"},{\"content\":\"chinese\"},{\"content\":\"feel\"}]},{\"confidence\":1,\"word\":[{\"content\":\"greatly\"},{\"content\":\"sorry\"},{\"content\":\"for\"},{\"content\":\"the\"},{\"content\":\"pains\"},{\"content\":\"you\"},{\"content\":\"are\"},{\"content\":\"suffering.\"},{\"content\":\"And\"},{\"content\":\"I\"}]},{\"confidence\":1,\"word\":[{\"content\":\"do\"},{\"content\":\"hope\"},{\"content\":\"you\"},{\"content\":\"can\"},{\"content\":\"overcome\"},{\"content\":\"those\"},{\"content\":\"great\"},{\"content\":\"difficulties.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"Please\"},{\"content\":\"remember\"},{\"content\":\"Japan\"},{\"content\":\"isn't\"},{\"content\":\"alone.People\"},{\"content\":\"all\"},{\"content\":\"over\"},{\"content\":\"the\"}]},{\"confidence\":1,\"word\":[{\"content\":\"world\"},{\"content\":\"are\"},{\"content\":\"lending\"},{\"content\":\"hands\"},{\"content\":\"to\"},{\"content\":\"the\"},{\"content\":\"areas\"},{\"content\":\"struck\"},{\"content\":\"by\"},{\"content\":\"tsunam\"}]},{\"confidence\":1,\"word\":[{\"content\":\"and\"},{\"content\":\"earthquake.Now\"},{\"content\":\"that\"},{\"content\":\"the\"},{\"content\":\"disaster\"},{\"content\":\"has\"},{\"content\":\"happened\"}]},{\"confidence\":1,\"word\":[{\"content\":\"we\"},{\"content\":\"should\"},{\"content\":\"face\"},{\"content\":\"it\"},{\"content\":\"bravely\"},{\"content\":\"and\"},{\"content\":\"rebuild\"},{\"content\":\"the\"},{\"content\":\"homes.\"},{\"content\":\"thus\"}]},{\"confidence\":1,\"word\":[{\"content\":\"creating\"},{\"content\":\"a\"},{\"content\":\"stronger\"},{\"content\":\"country.\"},{\"content\":\"Tomorrow\"},{\"content\":\"is\"},{\"content\":\"another\"},{\"content\":\"day.\"}]},{\"confidence\":1,\"word\":[{\"content\":\"All\"},{\"content\":\"the\"},{\"content\":\"things\"},{\"content\":\"will\"},{\"content\":\"be\"},{\"content\":\"better.\"}]}]","openid":"omu_s4n-JMhgiaTucwoK-YlI3hSQ","source":"http://tmp/wx5f037b7ad8d5228d.o6zAJs4JO4l02iYqrqs81KsN9XYY.exQ3J5UXnoAObd9e60201210a947c4c9eb1f854afd59.jpg","type":0}]
    })
  },
  delFun:function(e){
    this.setData({
      longPress:true
    })
    setTimeout(()=>{
      this.setData({
        longPress:false
      })
    },10000)
  }
})