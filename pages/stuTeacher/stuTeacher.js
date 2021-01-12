// pages/stuTeacher/stuTeacher.js
const DB = wx.cloud.database()
var app = getApp()   //全局变量，在app.js中设置
Page({
  data: {
    tea:'',
    major:'',
    subject:''
  },
  onLoad: function (options) {
    var that=this
    wx.setNavigationBarTitle({
      title:"授课教师信息查询"
    })
    DB.collection ("tea").where({  
      name:app.globalData.input,       //根据id查询
    }).get({
        success(res){
              that.setData({
                tea:app.globalData.input,
                major:res.data[0].major,
                subject:res.data[0].subject.name
              })
        }
      })
  },

})