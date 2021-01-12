// pages/teaRef/teaRef.js
const DB = wx.cloud.database()
var app = getApp()   //全局变量，在app.js中设置
Page({
  data: {
    tea:'',
    ref:'',
  },
  onLoad: function (options) {
    var that=this
    wx.setNavigationBarTitle({
      title:"满意度界面"
    })
    DB.collection ("tea").where({  
      tea_id:app.globalData.tId,       //根据id查询
    }).get({
        success(res){
              that.setData({
                tea:res.data[0].name,
                ref:res.data[0].satisfied,
              })
        }
      })
  },

})