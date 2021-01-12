// pages/stuGrade/stuGrade.js
const DB = wx.cloud.database()
var app = getApp()   //全局变量，在app.js中设置
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inp:'',
    grade:'',
  },

  onLoad: function (options) {
    var that=this
    wx.setNavigationBarTitle({
      title:"成绩查询"
    })
    DB.collection ("stu").where({  
      stu_id:app.globalData.sId,       //根据id查询
    }).get({
        success(res){
          for(let i = 0;i<2;i++)
          {
            if(res.data[0].subject[i].name == app.globalData.input)
            {
              that.setData({
                inp:app.globalData.input,
                grade:res.data[0].subject[i].grade
              })
            }
          }
        }
      })
  },

})