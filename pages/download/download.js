// pages/download/download.js
 
Page({
  data: {
    fileUrl:"",
    containershow:true,
    searchxx:false,
    filelist:[],
    carList:[],
    inputVal: ""
  },
     //首次渲染
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title:"文件下载界面"
      }) 
    },
  //进入搜索框
  onbindfocus(event){
    console.log(event.detail.value);
    this.setData({
      containershow:false,
      searchxx:true
    })
    let that=this
    wx.cloud.database().collection("edusource").get({
      success(res){
          that.setData({
            filelist:res.data
          })
      },
      fail(res){
        console.log("查询数据失败",res)
      }
    })
  },
  //从搜索框回到页面
  onbindclear(){
    this.setData({
      containershow:true,
      searchxx:false,
    })
  },
  //输入值时的搜索栏
  inputTyping: function(e) {
    //console.log("input-----",e)
    var value = e.detail.value
    var that = this;
    var filelist = that.data.filelist
    if (value == '') {
      that.setData({
        searchxx: false,
      });
    } else {
      if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
        var arr = [];
        for (var i = 0; i < filelist.length; i++) {
          if (filelist[i].sourcename.indexOf(value) >= 0) {
            arr.push(filelist[i]);
          }
        }
        //console.log(arr)
        that.setData({
          searchxx: true,
          carList: arr //查找到的列表
        });
      }
    }
  },
//点击即可从搜索框进入下载文件
  searchname(res){
   console.log(res.currentTarget.dataset.index);
    var index = res.currentTarget.dataset.index
    var that = this;
    that.setData({
      inputVal: that.data.carList[index].sourcename,
      fileUrl:that.data.carList[index].sourcefileID,
      containershow:true,
      searchxx: false,
    })
    wx.cloud.downloadFile({
      fileID: that.data.fileUrl
    }).then(res => {
      // get temp file path
      console.log("下载成功，网址：",res.tempFilePath)
      wx.showToast({
        title: '下载成功',
        icon: 'success',
        duration: 2000})
     
    }).catch(error => {
      // handle error
      console.log("打开失败")
    })
     
  },
//通过点击文件列表下载文件列表
  searchlistname(res){
    var index = res.currentTarget.dataset.index
    var that = this;
    that.setData({
      fileUrl:that.data.filelist[index].sourcefileID,
    })
    
    wx.cloud.downloadFile({
      fileID: that.data.fileUrl
    }).then(res => {
      // get temp file path
      console.log("下载成功，网址：",res.tempFilePath)
      wx.showToast({
        title: '下载成功',
        icon: 'success',
        duration: 2000})
    }).catch(error => {
      // handle error
      console.log("打开失败")
    })
     
  },
  //获取文件列表
  getFilelist(){
    let that = this
    wx.cloud.database().collection("edusource").get({
      success(res){
          console.log("查询数据成功",res)
          that.setData({
            filelist:res.data
          })
      },
      fail(res){
        console.log("查询数据失败",res)
      }
    })
  }
 })
  
  

 