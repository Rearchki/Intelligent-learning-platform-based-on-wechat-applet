//app.js
App({
  globalData: {
    hasLogin: false,
    input:null,
    sId: null,//学生学号
    tId:null,//教师工号
    dataList:[]
  },
  onLaunch: function () {
      //云开发环境初始化
      wx.cloud.init({
        env:"education1-3g402yjbe181df62"
       })
    }
})