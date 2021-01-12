// pages/teaCommunity/teaCommunity.js
const db = wx.cloud.database().collection("comment")
let username=""
let comment=""
Page({
  data:{
    Commentlist:[]
  },
    //首次渲染
    onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"社区讨论界面"
    })
    },
  getComment(){
    let that = this
    wx.cloud.database().collection("comment").get({
      success(res){
          console.log("查询数据成功",res)
          
          that.setData({
            Commentlist:res.data
          })
      },
      fail(res){
        console.log("查询数据失败",res)
      }
    })
  },
//获取用户名（登陆后修改）
getUsername(e){
  username=e.detail.value
},
//获取评论的内容
getContent(e){
  comment=e.detail.value
},
//发表评论
pubComment(){
  if(comment.length <4){
  wx.showToast({
    icon:"none",
    title: '评论太短',
  })
  return
}
  db.add({
    data:{
      username:username,
      comment:comment,
    },
    success(res){
      console.log("添加成功",res)
      wx.showToast({
        icon:"none",
        title: '发表成功',
      })
    },
    fail(res){
      console.log("添加失败",res)
    }
})
}
})