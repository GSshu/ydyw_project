// pages/management/staff/untreated/untreated.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listidtext:'工单',
    topictext: '标题',
    begintimetext: '开始时间',
    endtimetext: '结束时间',
    daynumtext: '0.5天的倍数',
    receivertext: '代理人',
    eventtypetext: '申请类型',
    reasontext: '申请原因',
    opiniontext:'处理意见',
    createtimetext:'创建时间',
    creatortext:'创建人',

    ticket_id: '4',

    listid:'',
    date_time: '',
    topic: '',
    begintime: '',
    endtime: '',
    daynum: '',
    receiver: '',
    eventtype: '',
    reason: '',
    createtime: '',
    creator: '',
    opinion:'',
  },

  agree_action:function(){
    if (this.data.opinion) {
      wx.request({
        url: 'http://www.ydyw.com:8008/staff/ticketagree',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username: app.globalData.global_username,
          staff_ticket_id: that.data.ticket_id,
          process_opinion: this.data.opinion,
        },
        success: function (res) {
          if (res.data.status == 200) {
            this.setData({
              result: res.data	//服务器返回的结果
            })
          }
          wx.showToast({
            title: '提交成功啦',
            icon: 'success',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.reLaunch({
                  url: '../../../index/index'
                })
              }, 800)
            }
          })
        }
      })
    }
  },

  disagree_action: function (e) {
    this.setData({
      opinion: e.detail.value
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
    var app = getApp();
    var that = this
    wx.request({
      url: 'http://www.ydyw.com:8008/staff/obtainticketdata',
      data: {
        username: app.globalData.global_username,
        staff_ticket_id: this.data.ticket_id,
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("成功了！")
        console.log(res.data) 
        that.setData({
        listid:res.data[0],
        topic: res.data[1],
        begintime: res.data[2],
        endtime: res.data[3],
        daynum: res.data[4],
        receiver: res.data[5],
        eventtype: res.data[6],
        reason: res.data[7],
        creator: res.data[8],
        createtime: res.data[9],
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