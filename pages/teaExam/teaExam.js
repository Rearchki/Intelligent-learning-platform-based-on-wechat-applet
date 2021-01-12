// pages/teaExam/teaExam.js
Page({
  data:{
    examlist:[]
  },
  getData(){
    let that = this
    wx.cloud.database().collection("exam").get({
      success(res){
          console.log("查询数据成功",res)
          that.setData({
            examlist:res.data
          })
      },
      fail(res){
        console.log("查询数据失败",res)
      }
    })
  },
})