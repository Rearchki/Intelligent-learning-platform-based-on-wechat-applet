
Page({
  data: {
   
  },
  //首次渲染
  onLoad: function (options) {
      wx.setNavigationBarTitle({
        title:"登录界面"
      })
    },
   // 点击学生登录按钮跳转到学生登录界面
  clickStu:function(){
    wx.navigateTo({
      url: '/pages/stuLogin/stuLogin',
    })

  },
  // 点击教师登录按钮跳转到教师登录界面
  clickTea:function(){
    wx.navigateTo({
      url: '/pages/teaLogin/teaLogin',
    })

  }
})