// pages/management/staff/launch/launch.js
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
    uploadfile:'请选择上传文件',
    sourcefile: '选择文件',

    topicplacerhoder:'请输入你的主题',
    begintimeplaceholder:'开始时间',
    endtimeplaceholder:'结束时间',
    daynumplaceholder: '请输入请假天数',
    receiverplaceholder: '请输入代理人',

    date_time:'',
    topic: '',
    begintime: '',
    endtime: '',
    daynum: '',
    receiver: '',
    eventtype: '',
    reason: '',

    workflow_id: 1,
    submit_id: 1,
    save_id: 2,

    eventarray: ['选择', '事假', '病假', '年假', '产假', '婚假', '调休', '出差', '加班'],

    typeindex: 0,

    requireurl: "../../../../static/image/required.png",
    xialajiantou: "../../../../static/image/xialajiantou.png",
  },

  summit_action:function(e){
    //后台提交方法
    if (this.data.topic && this.data.begintime && this.data.endtime && this.data.daynum && this.data.receiver && this.data.eventtype) {
      wx.request({
        url: 'http://www.ydyw.com/staff/postdata/',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          //向服务器发送的信息
          staff_workflow_id: this.data.workflow_id,
          staff_transition_id: this.data.submit_id,
          staff_title: this.data.topic,
          staff_leave_start: this.data.begintime,
          staff_leave_end: this.data.endtime,   
          staff_leave_days: this.data.daynum,   
          staff_leave_proxy: this.data.receiver,
          staff_leave_type: this.data.typeindex,
          staff_leave_reason: this.data.reason,
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
      })}
  },

  // summit_action: function (e) {
  //   //后台提交方法
  //   console.log('form发生了submit事件')
  //     wx.request({
  //       url: 'http://www.ydyw.com:8008/postdata/',
  //       header: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       },
  //       method: "get",
  //       data: {
          
  //       },
  //       success: function (res) {
  //         console.log(res.data)
  //       }
  //     })
  // },

  save_data:function(e){
    console.log('form发生了保存事件')
    console.log(e.detail);
    var objData = e.detail;
    //标题
    wx.setStorage({
      key: 'staff_topic',
      data: this.data.topic,
    }) 

    //开始时间
    wx.setStorage({
      key: 'staff_begintime',
      data: this.data.begintime,
    })

    //结束时间admin
    wx.setStorage({
      key: 'staff_endtime',
      data: this.data.endtime,
    })

    //请假天数
    wx.setStorage({
      key: 'staff_daynum',
      data: this.data.daynum,
    })

    //受理人
    wx.setStorage({
      key: 'staff_receiver',
      data: this.data.receiver,
    })

    //事件类型
    wx.setStorage({
      key: 'staff_eventtype',
      data: this.data.eventtype,
    })
    
    //具体原因
    wx.setStorage({
      key: 'staff_reason',
      data: this.data.reason,
    }) 
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

  reasonfunc:function(e){
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
  onShow:function() {
    var that = this

    //获取存储的标题
    wx.getStorage({
      key: 'staff_topic',
      success: function (res) {
        that.setData({ topic: res.data })
      },
    })

    //获取存储的开始时间
    wx.getStorage({
      key: 'staff_begintime',
      success: function (res) {
        that.setData({ begintime: res.data })
      },
    })

    //获取存储的结束时间
    wx.getStorage({
      key: 'staff_endtime',
      success: function (res) {
        that.setData({ endtime: res.data })
      },
    })

    //获取存储的请假天数
    wx.getStorage({
      key: 'staff_daynum',
      success: function (res) {
        that.setData({ daynum: res.data })
      },
    })

    //获取存储的受理人
    wx.getStorage({
      key: 'staff_receiver',
      success: function (res) {
        that.setData({ receiver: res.data })
      },
    })
    
    //获取存储的事件类型
    wx.getStorage({
      key: 'staff_eventtype',
      success: function (res) {
        that.setData({ eventtype: res.data })
      },
    })
    wx.getStorage({
      key: 'staff_reason',
      success: function (res) {
        that.setData({ reason: res.data })
      },
    })

    //获取当前时间戳
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
    //获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);
    ////////////////////////////////////////////////////////////////////
    this.setData({
      date_time: "1-" + Y + M + D + h + m	//
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