
const db = wx.cloud.database().collection("video")
let videoname=""
let videofileID=""//存储fileID
//var i=0
let course=""
//let pathcloud
Page({
  data:{
    videoname:[],
    videofileID:[]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"视频上传界面"
    })
    },
  //获取输入的科目名字
  getCourse(e){
    videoname=e.detail.value
  },
  //选择视频并上传
uploadVideo(){
   if(videoname.length<3){
      wx.showToast({
        icon:"none",
        title: '名称太短',
      })
      return
    }
    let that=this
    //选择上传视频
  wx.chooseVideo({
    data:{
      videoname:videoname,
    },
    sourceType: ['album','camera'],
    camera: 'back',
    success(res) {
      //pathcloud=i.toString(),
      console.log("选择视频成功",res.tempFilePath)
      wx.cloud.uploadFile({
        cloudPath:videoname,
        filePath:res.tempFilePath,
        success:res => {
          wx.showToast({
            title: '上传成功',
          })
          //videoname=videoname,
          videofileID=res.fileID,
          //存储fileID
          db.add({
            data:{
              videoname:videoname,
              videofileID:videofileID,
            },
            success(res){
              console.log("添加数据库成功",res)
            },
            fail(res){
              console.log("添加失败",res)
            }
        })
        },
        fail:console.error
      })
    }
  })
},
clicklivePlay(){
  wx.navigateTo({
    url: '/pages/livePlay/livePlay',
  })
}
})