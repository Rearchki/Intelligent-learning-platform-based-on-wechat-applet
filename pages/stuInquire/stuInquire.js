// pages/stuInquire/stuInquire.js
const DB = wx.cloud.database()
var app = getApp()   //全局变量，在app.js中设置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClear:false,
    pal:"请输入搜索学科名称",
    val:'',
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['1、课表查询','2、成绩查询','3、考试安排查询','4、授课教师信息查询'],//下拉列表的数据
    index:0//选择的下拉列表下标
  },
   //首次渲染
   onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"查询界面"
    })
  },
   // 点击下拉显示框
 selectTap(){
  this.setData({
   show: !this.data.show
  });
  },
  // 点击下拉列表
  optionTap(e){
  let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
  this.setData({
   index:Index,
   show:!this.data.show,
  });
  if(Index != 3){
    this.setData({
      pal : "请输入搜索学科名称"
     });
  }
  else{
    this.setData({
      pal : "请输入搜索教师名称"
     });
  }
  },
  getInput: function(e){
    this.setData({
      val:e.detail.value
    })
    if(this.data.val.length>0){
      this.setData({
        isClear:true,
      })
    }
    else{
      this.setData({
        isClear:false,
      })
    }
  },
  clearTap:function(){
    this.setData({
      val:'',
      isClear:false,
    })
  },
  clickHere: function(){
    let inp = this.data.val       //输入的查询信息
    let ind = this.data.index     //选择的查询类型
    console.log(inp)
    console.log(ind)
    if(ind == 0){
      DB.collection ("stu").where({  
        stu_id:app.globalData.sId,       //根据id查询
      }).get({
          success(res){
            let bool = false
            for(let i = 0;i<2;i++)
            {
              if(res.data[0].subject[i].name ==  inp)
              {
                bool = true
              }
            }
            if(bool)
            {
              app.globalData.input = inp
              wx.navigateTo({
                url: '/pages/stuTimetable/stuTimetable',
             })
            }
            else{
              wx.showModal({
                title: '提示',
                content: '输入的学科信息错误',
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
    }
    if(ind == 1){
      DB.collection ("stu").where({  
        stu_id:app.globalData.sId,       //根据id查询
      }).get({
          success(res){
            let bool = false
            for(let i = 0;i<2;i++)
            {
              if(res.data[0].subject[i].name ==  inp)
              {
                bool = true
              }
            }
            if(bool)
            {
              app.globalData.input = inp
              wx.navigateTo({
                url: '/pages/stuGrade/stuGrade',
             })
            }
            else{
              wx.showModal({
                title: '提示',
                content: '输入的学科信息错误',
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
    }
    if(ind == 2){
      DB.collection ("stu").where({  
        stu_id:app.globalData.sId,       //根据id查询
      }).get({
          success(res){
            let bool = false
            for(let i = 0;i<2;i++)
            {
              if(res.data[0].subject[i].name ==  inp)
              {
                bool = true
              }
            }
            if(bool)
            {
              app.globalData.input = inp
              wx.navigateTo({
                url: '/pages/stuExam/stuExam',
             }) 
            }
            else{
              wx.showModal({
                title: '提示',
                content: '输入的学科信息错误',
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
    }
    if(ind == 3){
      DB.collection ("tea").where({  
        name:inp,       //根据id查询
      }).get({
          success(res){
            console.log(res)
            if(res.data.length != 0)
            {
              app.globalData.input = inp
              wx.navigateTo({
                url: '/pages/stuTeacher/stuTeacher',
             }) 
            }
            else{
              wx.showModal({
                title: '提示',
                content: '输入的教师信息错误',
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
    }
    }  
})