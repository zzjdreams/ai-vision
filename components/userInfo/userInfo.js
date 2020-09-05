// components/userInfo/userInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userIcon:{
      type:String,
      value:'../../images/userInfo/userIcon.png'
    },
   
    username:{
      type:String,
      value:'点击头像进行登录'
    },
    welcomeMsg:{
      type:String,
      value:'欢迎您的使用'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo:function(){
      this.triggerEvent("action");
    }
  }
})
