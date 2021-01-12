// pages/stuLogin/stuLogin.js
const DB = wx.cloud.database().collection ("stu") //使用学生数据库“stu”
var app = getApp()   //全局变量，在app.js中设置
let name=""
let id=""
Page({ 
  data:{
    stuId:null
  },
   //首次渲染
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"学生登录"
    })
    const sId = wx.getStorageSync('sId')
    this.setData({
      stuId:sId
    })
  },
  getName:function(e){
    name=e.detail.value
  },

  getId:function(e){
    id=e.detail.value 
    app.globalData.sId=id        //保存全局变量id
    wx.setStorageSync('sId',app.globalData.sId)//将学生学号sId存入本地缓存中，取名就叫"sId"
  },

  clickHere: function(){


    app.globalData.id
    DB.where({  
      stu_id:id,       //根据id查询
    }).get({
        success(res){
          if(res.data.length != 0 && name==res.data[0].name){     //验证输入数据是否正确
            wx.navigateTo({
              url: '/pages/stuInterface/stuInterface',
           })
          }
          else{              //验证错误，弹框提示
            wx.showModal({
            title: '提示',
            content: '输入的信息错误',
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
   })           
   /*
   wx.navigateTo({
    url: '/pages/stuInterface/stuInterface',
 })
*/
   /* 添加数据的代码
   DB.add({
      data:{
        name:name,
        major:major,
        class:myclass,
        id:id
      }
    })*/
  },
})