// pages/beforeuntreated/beforeuntreated.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worknumbertext:'工单编号',
    worktopictext: '工单主题',
    details:'详情',

    worknumber: '',
    worktopic: '',

    detaildata:[],

    workflow_id:1,

    numberofdata:0,
    index:0,
  },
  
 gotoPage:function(){
   wx.navigateTo({
     url: '../management/change/untreated/untreated',
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();     // 取得全局App
    var that = this
    wx.request({
      url: 'http://www.ydyw.com:8008/staff/obtaintickets',
      data: {
        username: app.globalData.global_username,
        workflow_id: that.data.workflow_id,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("成功了！")
        console.log(res)
        numberofdata: res.data[1]["duty"]
        detaildata: res.data[1]["duty"]
        console.log(res.data[2])
        console.log(that.data.detaildata)
      },
      fail: function () {
        console.log("失败了！")
      },
      complete: function () {
        console.log("完成了！")
      }
    })
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