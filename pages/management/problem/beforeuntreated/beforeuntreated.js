// pages/management/problem/beforeuntreated/beforeuntreated.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worknumbertext: '工单编号：',
    worktopictext: '工单主题：',
    details: '详情',

    worknumber: '',
    worktopic: '',

    detaildata: [],

    workflow_id: 5,
    category: 'duty', //类别是 代办
    state_id: 0, 
  },



  gotoPage: function (e) {
    var app = getApp();
    app.globalData.ticket_id = this.data.detaildata[e.currentTarget.dataset.index]['ticket_id']
    app.globalData.state_id = this.data.detaildata[e.currentTarget.dataset.index]['state_id']
    //发起人编辑
    if (app.globalData.state_id == 41) {
      wx.navigateTo({
        url: '../relaunch/relaunch',
      })
    }
    //常务负责人审批
    else if (app.globalData.state_id == 42) {
      wx.navigateTo({
        url: '../untreated/untreated',
      })
    }
    //值班经理1审批
    else if (app.globalData.state_id == 43) {
      wx.navigateTo({
        url: '../untreated/untreated',
      })
    }
    //值班经理2审批
    else if (app.globalData.state_id == 44) {
      wx.navigateTo({
        url: '../untreated/untreated',
      })
    }
    //业务部对应人处理
    else if (app.globalData.state_id == 46) {
      wx.navigateTo({
        url: '../untreated/untreated',
      })
    }
    //发起人确认
    else if (app.globalData.state_id == 66) {
      wx.navigateTo({
        url: '../confirm/confirm',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
    var app = getApp();     // 取得全局App
    var that = this
    wx.request({
      url: 'http://www.ydyw.com:8008/staff/obtaintickets/',
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