// pages/stuOrder/stuOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:"",
    containershow:true,
    searchxx:false,
    videolist:[],
    carList:[],
    inputVal: ""
  },
     //首次渲染
     onLoad: function (options) {
      wx.setNavigationBarTitle({
        title:"视频点播界面"
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
    wx.cloud.database().collection("video").get({
      success(res){
          that.setData({
            videolist:res.data
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
    var videolist = that.data.videolist
    if (value == '') {
      that.setData({
        searchxx: false,
      });
    } else {
      if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
        var arr = [];
        for (var i = 0; i < videolist.length; i++) {
          if (videolist[i].videoname.indexOf(value) >= 0) {
            arr.push(videolist[i]);
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
//点击即可从搜索框进入视频
 searchname(res){
   console.log(res.currentTarget.dataset.index);
    var index = res.currentTarget.dataset.index
    var that = this;
    that.setData({
      inputVal: that.data.carList[index].videoname,
      videoUrl:that.data.carList[index].videofileID,
      containershow:true,
      searchxx: false,
    })
  },
//点击即可从视频列表进入视频
searchlistname(res){
    var index = res.currentTarget.dataset.index
    var that = this;
    that.setData({
      videoUrl:that.data.videolist[index].videofileID,
    })
},
  //获取视频列表
  getVideolist(){
    let that = this
    wx.cloud.database().collection("video").get({
      success(res){
          console.log("查询数据成功",res)
          that.setData({
            videolist:res.data
          })
      },
      fail(res){
        console.log("查询数据失败",res)
      }
    })
  }

})