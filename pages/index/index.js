// pages/upcome/upcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    launch:{
      url: "/static/image/launch.png",
      text: "发起"
    },
    untreated: {
      url: "/static/image/untreated.png",
      text: "未处理"
    },
    treated: {
      url: "/static/image/treated.png",
      text: "已处理"
    },
    submission: {
      url: "/static/image/submission.png",
      text: "抄送"
    },
    overtime:{
      url: "/static/image/overtime.png",
      text: "加班"
    },
    leave:{
      url: "/static/image/leave.png",
      text: "休假"
    },
    vacation: {
      url: "/static/image/vacation.png",
      text: "休假"
    },
    business:{
      url: "/static/image/business.png",
      text: "出差"
    },
    title:{
      changemanagement:"变更管理",
      issuemanagement: "问题管理",
      eventmanagement: "事件管理",
      staffmanagement: "员工管理"
    },
    search:"搜索"
  },

  chooseImage:function(){
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: '/home/Django_project/ydyw/static', 
          filePath: "/static/image/leave.png",
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            console.log("成功");
            //do something
          }
        })
      }
    })
  },

  change_launch:function(){
    wx.navigateTo({
      url: '../management/change/launch/launch',
    })
  },

  change_untreated:function () {
    wx.navigateTo({
      url: '../management/change/untreated/untreated',
    })
  },

  change_treated: function () {
    wx.navigateTo({
      url: '../management/change/treated/treated',
    })
  },

  change_receive: function () {
    wx.navigateTo({
      url: '../management/change/receive/receive',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})