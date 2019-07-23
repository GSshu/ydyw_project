// pages/beforeuntreated/beforeuntreated.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worknumbertext:'工单编号：',
    worktopictext: '工单主题：',
    details:'详情',

    worknumber: '',
    worktopic: '',

    detaildata:[],

    workflow_id:1, //工作流id是1
    category:'relation', //类别是 相关

    numberofdata:100,
    index:0,
    state_id: 0,
  },

  zhengzhuang: function (e) {
    var that = this;
    //获取下标
    var idx = e.currentTarget.dataset.index;
    console.log(idx)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();     // 取得全局App
    var that = this
    wx.request({
      url: 'http://www.ydyw.com/staff/obtaintickets/',
      data: {
        username: app.globalData.global_username,
        workflow_id: that.data.workflow_id,
        category: that.data.category,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("成功了！")
        console.log(res)
        that.setData({
          //numberofdata: res.data[1]["duty"],
        detaildata: res.data[2],
        })
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