Page({

  /**
   * 页面的初始数据
   */
  data: {
    topictext: '标题',
    begintimetext: '请输入开始时间',
    endtimetext: '请输入结束时间',
    daynumtext: '请假天数(0.5的倍数)',
    receivertext: '代理人',
    eventtypetext: '申请类型',
    uplodetext: '请选择上传文件',
    reasontext: '申请具体原因',
    uploadfile: '请选择上传文件',
    sourcefile: '选择文件',
    conditiontext: '状态名',

    condition:"",
    topicplacerhoder: '请输入你的主题',
    begintimeplaceholder: '开始时间',
    endtimeplaceholder: '结束时间',
    daynumplaceholder: '请输入请假天数',
    receiverplaceholder: '请输入代理人',

    date_time: '',
    topic: '',
    begintime: '',
    endtime: '',
    daynum: '',
    receiver: '',
    eventtype: '',
    reason: '',
    condition: '',

    workflow_id: 1,
    submit_id: 1,
    save_id: 2,

    eventarray: ['选择', '事假', '病假', '年假', '产假', '婚假', '调休', '出差', '加班'],

    typeindex: 0,

    requireurl: "../../../../static/image/required.png",
    xialajiantou: "../../../../static/image/xialajiantou.png",
  },

  summit_action: function (e) {
    //后台提交方法
    if (this.data.topic && this.data.begintime && this.data.endtime && this.data.daynum && this.data.receiver && this.data.eventtype) {
      wx.request({
        url: 'http://www.ydyw.com/staff/postdata/',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        data: {
        },
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200) {
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
        }
      })
      wx.clearStorage()
    }
    else {
      wx.showToast({
        title: '提交失败！',
        icon: 'none',
        duration: 5000
      })
    }
  },

  save_data: function (e) {
    
  },

  //输入标题
  topicfunc: function (e) {
    this.setData({
      topic: e.detail.value
    })
  },

  //输入开始时间
  begintimefunc: function (e) {
    this.setData({
      begintime: e.detail.dateString
    })
  },

  //输入结束时间
  endtimefunc: function (e) {
    this.setData({
      endtime: e.detail.dateString
    })
  },

  //输入请假天数
  daynumfunc: function (e) {
    this.setData({
      daynum: e.detail.value
    })
  },

  //输入受理人
  receiverfunc: function (e) {
    this.setData({
      receiver: e.detail.value
    })
  },

  //输入事件类型
  typefunc: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        typeindex: e.detail.value,
        eventtype: '选择',
      })
    }

    if (e.detail.value == 1) {
      this.setData({
        typeindex: e.detail.value,
        eventtype: '事假',
      })
    }

    if (e.detail.value == 2) {
      this.setData({
        typeindex: e.detail.value,
        eventtype: '病假',
      })
    }
    else if (e.detail.value == 3) {
      this.setData({
        typeindex: e.detail.value,
        eventtype: '年假',
      })
    }
    else if (e.detail.value == 4) {
      this.setData({
        typeindex: e.detail.value,
        eventtype: '产假',
      })
    }
    else if (e.detail.value == 5) {
      this.setData({
        typeindex: e.detail.value,
        eventtype: '婚假',
      })
    }
    else if (e.detail.value == 6) {
      this.setData({
        typeindex: e.detail.value,
        eventtype: '调休',
      })
    }
    else if (e.detail.value == 7) {
      this.setData({
        typeindex: e.detail.value,
        eventtype: '出差',
      })
    }
    else if (e.detail.value == 8) {
      this.setData({
        typeindex: e.detail.value,
        eventtype: '加班',
      })
    }
  },

  reasonfunc: function (e) {
    this.setData({
      reason: e.detail.value
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
      url: 'http://www.ydyw.com/staff/trans/',
      data: {
        username: app.globalData.global_username,
        staff_ticket_id: app.globalData.ticket_id,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("获取transition_id成功了！")
        console.log(res.data)
        that.setData({
          accept_id: res.data.accept,
          refuse_id: res.data.refuse,
        })
      },
      fail: function () {
        console.log("失败了！")
      },
      complete: function () {
        console.log("完成了！")
      }
    })
    wx.request({
      url: 'http://www.ydyw.com/staff/obtainticketdata/',
      data: {
        username: app.globalData.global_username,
        staff_ticket_id: app.globalData.ticket_id,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("成功了！")
        console.log(res.data)
        that.setData({
          listid: res.data[0],
          topic: res.data[1],
          begintime: res.data[2],
          endtime: res.data[3],
          daynum: res.data[4],
          typeindex: res.data[5],
          receiver: res.data[6],
          condition: res.data[7],
          reason: res.data[8].match(/[\u4e00-\u9fa5]/g).join(""),
          // creator: res.data[8],
          // createtime: res.data[9],
        })
      },
      fail: function () {
        console.log("失败了！")
      },
      complete: function () {
        console.log("完成了！")
      }
    }),
      wx.request({
        url: 'http://www.ydyw.com/staff/trans/',
        data: {
          username: app.globalData.global_username,
          staff_ticket_id: app.globalData.ticket_id,
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log("成功了！")
          console.log(res.data)
          that.setData({
            accept_id: res.data.accept,
            refuse_id: res.data.refuse,
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