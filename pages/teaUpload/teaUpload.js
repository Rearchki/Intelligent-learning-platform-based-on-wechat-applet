// pages/teaUpload/teaUpload.jsedusource
const db = wx.cloud.database().collection("edusource")
let sourcename=""
let sourcefileID=""
let homeworkname=""
Page({
  data: {
    sourcename:[],
    sourcefileID:[]
  },
    //首次渲染
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title:"上传界面"
      })
    },
    //获得教学资料名
    getSource(e){
      sourcename=e.detail.value
    },
  uploadSource(){
    if(sourcename.length<3){
      wx.showToast({
        icon:"none",
        title: '名称太短',
      })
      return
    }
    data:{
      sourcename:sourcename
    }
    wx.chooseMessageFile({
      type:"all",
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: sourcename,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFiles[0].path,
          // 成功回调
          success: res => {
            console.log('上传成功', res)
            sourcefileID=res.fileID
            db.add({
              data:{
                sourcename:sourcename,
                sourcefileID:sourcefileID,
              },
              success(res){
                console.log("添加数据库成功",res)
              },
              fail(res){
                console.log("添加失败",res)
              }
          })
          },
        })
      },
    })
  },
  //获得作业名
  getHomework(e){
    homeworkname=e.detail.value
  },
  uploadHomework(){
    if(homeworkname.length<3){
      wx.showToast({
        icon:"none",
        title: '名称太短',
      })
      return
    }
    data:{
      homeworkname:homeworkname
    }
    wx.chooseMessageFile({
      type:"file",
      success (res) {
        const tempFilePaths = res.tempFiles
        console.log('选择成功', tempFilePaths[0].path)
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: homeworkname,
          // 指定要上传的文件的小程序临时文件路径
          filePath: tempFilePaths[0].path,
          // 成功回调
          success: res => {
            console.log('上传成功', res)
            sourcefileID=res.fileID
            db.add({
              data:{
                sourcename:homeworkname,
                sourcefileID:sourcefileID,
              },
              success(res){
                console.log("添加数据库成功",res)
              },
              fail(res){
                console.log("添加失败",res)
              }
          })
          }
        })
      }
    })
  }
})