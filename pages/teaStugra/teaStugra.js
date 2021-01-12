// pages/teaStugra/teaStugra.js
var app = getApp()   //全局变量，在app.js中设置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu:' ',
    grade:' ',
    containershow:true,
    searchxx:false,
    stulist:[],
    carList:[],
    inputVal: "",
    subject:"",
  },
     //首次渲染
     onLoad: function (options) {
      wx.setNavigationBarTitle({
        title:"学生成绩界面"
      })
      let that=this
      wx.cloud.database().collection("tea").where({  
        tea_id:app.globalData.tId,       //根据id查询
      }).get({
        success(res){
          console.log(res.data[0].subject.name)
            that.setData({
              subject:res.data[0].subject.name
            })
        },
        fail(res){
          console.log("查询数据失败",res)
        }
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
    wx.cloud.database().collection("stu").get({
      success(res){
          that.setData({
            stulist:res.data
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
    var stulist = that.data.stulist
    if (value == '') {
      that.setData({
        searchxx: false,
      });
    } else {
      if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
        var arr = [];
        for (var i = 0; i < stulist.length; i++) {
          console.log(stulist[i].name)
          if(stulist[i].name.indexOf(value) >= 0) {
            arr.push(stulist[i]);
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
    let bool = true
    var length = that.data.carList[index].subject.length;
    for (var i = 0; i < length; i++) {
      if(that.data.carList[index].subject[i].name == that.data.subject){
        that.setData({
          inputVal: that.data.carList[index].name,
          grade:that.data.carList[index].subject[i].grade,
          stu:that.data.carList[index].name,
          containershow:true,
          searchxx: false,
        })
        bool = false
      }
    }
    if(bool){
        wx.showModal({
        title: '提示',
        content: '不是你的学生，没有你课程的成绩',
        success: function(res) {
        if (res.confirm) {
        console.log('用户点击确定')
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
        })
    }
  },
//点击即可从视频列表进入视频
searchlistname(res){
  console.log(res.currentTarget.dataset.index);
    var index = res.currentTarget.dataset.index
    var that = this;
    let bool = true
    var length = that.data.stulist[index].subject.length;
    for (var i = 0; i < length; i++) {
      if(that.data.stulist[index].subject[i].name == that.data.subject){
        that.setData({
          grade:that.data.stulist[index].subject[i].grade,
          stu:that.data.stulist[index].name
        })
        bool = false
      }
    }
    if(bool){
        wx.showModal({
        title: '提示',
        content: '不是你的学生，没有你课程的成绩',
        success: function(res) {
        if (res.confirm) {
        console.log('用户点击确定')
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
        })
    }
},
  //获取视频列表
  getVideolist(){
    let that = this
    wx.cloud.database().collection("stu").get({
      success(res){
        console.log("查询数据成功",res)
        that.setData({
          stulist:res.data
        })
      },
      fail(res){
        console.log("查询数据失败",res)
      }
    })
  },

})