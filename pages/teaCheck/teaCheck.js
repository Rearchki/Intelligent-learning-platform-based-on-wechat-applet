// pages/teaCheck/teaCheck.js
Page({

  /**
   * 页面的初始数据
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"查看界面"
    })
  },
  
  clickTeaStugra:function(){
    wx.navigateTo({
      url: '/pages/teaStugra/teaStugra',
    })
  },
  clickTearef:function(){
    wx.navigateTo({
      url: '/pages/teaRef/teaRef',
    })
  }
})