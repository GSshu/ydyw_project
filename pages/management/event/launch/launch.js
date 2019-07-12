// pages/management/event/launch/launch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topictext:'标题',
    reporttimetext:'报告时间',
    systemtypetext:'系统类型',
    contacttext:'联系人',
    teltext:'联系方式',
    occurretimetext:'发生时间',
    receivertext:'受理人',
    receivetimetext:'受理时间',
    descriptiontext:'事件描述',

    topicplaceholder: '请输入你的主题',
    reporttimeplaceholder:'报告时间',
    telplaceholder: '请输入联系方式',
    occurretimeplaceholder:'发生时间',
    receiverplaceholder: '请输入受理人',
    receivetimeplaceholder:'受理时间',
    descriptionplaceholder: '请输入你的详细内容',
    uploadfile: '请选择上传文件',
    sourcefile: '选择文件',

    topic: '',
    reporttime: '',
    systemtype: '',
    contact: '',
    tel: '',
    occurretime: '',
    receiver: '',
    receivetime: '',
    description: '',

    systemtypearray: ['选择', '纸票', '电票'],
    contactarray: ['选择', 'admin', 'tl', 'wangjj', 'panlx', 'shenw', 'zhangbd', 'yangl', 'chek', 'panc', 'kaif', 'kaif-leader', 'changw', 'jianc-leader', 'dman1','dman2'],

    systemtypeindex:'0',
    contactindex:'0',

    requireurl: "../../../../static/image/required.png",
    xialajiantou: "../../../../static/image/xialajiantou.png",
  },

  summit_action:function(e){
      //后台提交方法
    console.log('form发生了submit事件')
    if (this.data.topic && this.data.reporttime && this.data.systemtype && this.data.contact && this.data.tel && this.data.occurretime && this.data.receiver && this.data.receivetime && this.data.description ) {
      wx.request({
        url: 'http://www.ydyw.com:8008/postdata/',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          //向服务器发送的信息
          event_topic: this.data.topic,
          event_reporttime: this.data.reporttime,
          event_systemtype: this.data.systemtype,   
          event_contact: this.data.contact,   
          event_tel: this.data.tel,
          event_occurretime: this.data.occurretime,
          event_receiver: this.data.receiver,
          event_receivetime: this.data.receivetime,
          event_description: this.data.description,
        },
        success: function (res) {
          if (res.data.status == 200) {
            this.setData({
              result: res.data	//服务器返回的结果
            })
          }

          if (res.data == "提交成功！") {
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
          else {
            wx.showToast({
              title: '提交失败！',
              icon: 'none',
              duration: 5000
            })
          }
        }
      })
      wx.clearStorage()
  }
  },

  //输入标题
  topicfunc: function (e) {
    this.setData({
      topic: e.detail.value
    })
  },
  //输入报告时间
  reporttimefunc: function (e) {
    this.setData({
      reporttime: e.detail.dateString
    })
  },
  //输入系统类型
  systemtypefunc: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        systemtypeindex: e.detail.value,
        systemtype: '选择',
      })
    }

    if (e.detail.value == 1) {
      this.setData({
        systemtypeindex: e.detail.value,
        systemtype: '纸票',
      })
    }

    if (e.detail.value == 2) {
      this.setData({
        systemtypeindex: e.detail.value,
        systemtype: '电票',
      })
    }
  },
  //输入联系人
  contactfunc: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        contactindex: e.detail.value,
        contact: '选择',
      })
    }
    if (e.detail.value == 1) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'admin',
      })
    }
    if (e.detail.value == 2) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'tl',
      })
    }
    if (e.detail.value == 3) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'wangjj',
      })
    }
    if (e.detail.value == 4) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'panlx',
      })
    }
    if (e.detail.value == 5) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'shenw',
      })
    }
    if (e.detail.value == 6) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'zhangbd',
      })
    }
    if (e.detail.value == 7) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'yangl',
      })
    }
    if (e.detail.value == 8) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'chek',
      })
    }
    if (e.detail.value == 9) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'panc',
      })
    }
    if (e.detail.value == 10) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'kaif',
      })
    }
    if (e.detail.value == 11) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'kaif-leader',
      })
    }
    if (e.detail.value == 12) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'changw',
      })
    }
    if (e.detail.value == 13) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'jianc-leader',
      })
    }
    if (e.detail.value == 14) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'dman1',
      })
    }
    if (e.detail.value == 15) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'dman2',
      })
    }
  },
  //输入联系方式
  telfunc: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  //输入发生时间
  occurretimefunc: function (e) {
    this.setData({
      occurretime: e.detail.dateString
    })
  },
  //输入受理人
  receiverfunc: function (e) {
    this.setData({
      receiver: e.detail.value
    })
  },
  //输入受理时间
  receivetimefunc: function (e) {
    this.setData({
      receivetime: e.detail.dateString
    })
  },
  //输入事件描述
  descriptionfunc: function (e) {
    this.setData({
      description: e.detail.value
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