// pages/stuLogin/stuLogin.js
const DB = wx.cloud.database().collection ("tea") //使用学生数据库“stu”
var app = getApp()   //全局变量，在app.js中设置
let name=""
let password=""
let id=""
Page({
  data:{
    teaId:null

  },
  //首次渲染
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"教师登录"
    })
    const tId = wx.getStorageSync('tId')//从本地缓存中获取教师工号
    this.setData({
      stuId:tId
    })
  },
  getName:function(e){
    name = e.detail.value
  },
  getJobnum:function(e){
    id = e.detail.value
    app.globalData.tId = id //给全局变量tId赋值
    wx.setStorageSync('tId',app.globalData.tId)//将教师工号tId存入本地缓存中，取名就叫"tId"
  },
  getPassword:function(e){
    password = e.detail.value
  },

  clickHere:function(){
    DB.where({  
      tea_id:id,       //根据id查询
    }).get({
        success(res){
          if(res.data.length != 0 && name==res.data[0].name && password == res.data[0].password){     //验证输入数据是否正确
            wx.navigateTo({
              url: '/pages/teaInterface/teaInterface',
           })
          }
          else{              //验证错误，弹框提示
            wx.showModal({
            title: '提示',
            content: '输入的密码错误',
            success: function(res) {
            if (res.confirm) {
            console.log('用户点击确定')
            } else if (res.cancel) {
            console.log('用户点击取消')
            }
            }
            })
          }
    }
    })     //取消注释，给下面的代码加注释，开启验证功能,目前是快速通道
  /*
    wx.navigateTo({
      url: '/pages/teaInterface/teaInterface',
    })*/
  }
})