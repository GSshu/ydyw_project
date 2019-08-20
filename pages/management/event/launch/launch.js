
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topictext: '标题',
    uplodetext: '请选择上传文件',
    reasontext: '申请具体原因',
    uploadfile: '请选择上传文件',
    sourcefile: '选择文件',
    reportimetext:"报告时间",
    systemtypetext:"系统类型",
    contactext:"联系人",
    contacteltext:"联系电话",
    happentimetext:"发生时间",
    receivertext:"受理人",
    receivertimetext:"受理时间",
    rangetext:"影响范围",

    topicplacerhoder: '请输入你的主题',
    receiverplaceholder: '请输入代理人',
    reportimeplaceholder:"报告时间",
    contactelplaceholder:"请输入联系电话",
    happentimeplaceholder: "发生时间",
    receivertimeplaceholder: "受理时间",
    rangeplaceholder:"请输入影响范围",

    reportime:'',
    happentime:'',
    contactel:'',
    contact:'',
    topic: '',
    receiver: '',
    receivertime:'',
    range:'',
    systemtype: '',
    reason: '',
    urlandreason: '',

    dataisok: false,
    fileisok: true,

    tempFilePaths: "",//上传图片的地址

    workflow_id: 1,
    submit_id: 1,
    save_id: 2,

    systemtypearray: ['选择', '纸票', '电票'],
    contactarray: ['选择', 'admin', 'wangjj','panlx','shenw','zhangb','yangl','chek','panc','kaif','kaif-leader','changw','janc-leader','dman1','dman2','xiongk','xiaoyw','yinj','qiany','zhuzh','zhoulj','wumj'],
    receiverarray: ['选择', 'admin', 'wangjj','panlx','shenw','zhangb','yangl','chek','panc','kaif','kaif-leader','changw','janc-leader','dman1','dman2','xiongk','xiaoyw','yinj','qiany','zhuzh','zhoulj','wumj'],

    systemtypeindex: 0,
    contactindex:0,
    receiverindex:0,

    requireurl: "../../../../static/image/required.png",
    xialajiantou: "../../../../static/image/xialajiantou.png",
    rootpath: "/app/0708_workflow/media",
    finalpath: "",
  },

  chooseFile: function () {
    var app = getApp();
    var that = this;

    wx.chooseImage({
      success: function (res) {
        console.log(res)
        that.setData({
          tempFilePaths: res.tempFilePaths,
          sourcefile: "文件已获取"
        })
      }
    })
  },

  summit_action: function (e) {
    var app = getApp();
    var that = this;
    if (this.data.topic && this.data.reportime && this.data.systemtype && this.data.contact && this.data.contactel && this.data.happentime && this.data.receiver && this.data.receivertime && this.data.range && this.data.reason) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 0 && day <= 9) {
        day = "0" + day;
      }

      var rootpath = "/app/0708_workflow/media"
      var finalpath = rootpath + "/" + app.globalData.global_username + "/" + year + "/" + month + "/" + day + "/" + this.data.tempFilePaths[0].substring(11);
      var a = finalpath;

      this.data.urlandreason = finalpath + this.data.reason;
      wx.request({
        url: 'http://www.ydyw.com:8008/staff/postdata/',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          //向服务器发送的信息
          staff_username: app.globalData.global_username,
          staff_workflow_id: this.data.workflow_id,
          staff_transition_id: this.data.submit_id,
          staff_title: this.data.topic,
          staff_leave_start: this.data.begintime,
          staff_leave_end: this.data.endtime,
          staff_leave_days: this.data.daynum,
          staff_leave_proxy: this.data.receiver,
          staff_leave_type: this.data.typeindex,
          staff_leave_reason: this.data.urlandreason,
        },
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200) {
            that.data.dataisok = true
          }
        }
      })
      wx.uploadFile({
        url: 'http://www.ydyw.com:8008/staff/launch/uploadfile/', //仅为示例，非真实的接口地址
        filePath: this.data.tempFilePaths[0],
        name: 'file',
        formData: {
          'user': app.globalData.global_username
        },
        success: function (res) {
          console.log(res.data)
          if (!res.data == "10200") {
            fileisok = false
          }
          if (that.data.dataisok && that.data.fileisok) {
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
        },
      })
    }
    else {
      wx.showToast({
        title: '提交失败！',
        icon: 'none',
        duration: 5000
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //输入标题
  topicfunc: function (e) {
    this.setData({
      topic: e.detail.value
    })
  },

  //输入电话号码
  telfunc: function (e) {
    this.setData({
      contactel: e.detail.value
    })
  },

  //输入报告时间
  reportimefunc: function (e) {
    this.setData({
      reportime: e.detail.dateString
    })
  },

  //输入发生时间
  happentimefunc: function (e) {
    this.setData({
      happentime: e.detail.dateString
    })
  },

  //输入受理时间
  receivertimefunc: function(e) {
    this.setData({
      receivertime: e.detail.dateString
    })
  },

  //输入影响范围
  rangefunc: function(e) {
    this.setData({
      range: e.detail.value
    })
  },

  //输入原因
  reasonfunc: function(e) {
    this.setData({
      reason: e.detail.value
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

  },
  //系统类型
  typefunc: function (e) {
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

  //联系人选择
  contactfunc: function (e) {
    if (e.detail.value == 1) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'admin',
      })
    }

    if (e.detail.value == 2) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'wangjj',
      })
    }
    if (e.detail.value == 3) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'panlx',
      })
    }
    if (e.detail.value == 4) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'shenw',
      })
    }
    if (e.detail.value == 5) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'zhangb',
      })
    }
    if (e.detail.value == 6) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'yangl',
      })
    }
    if (e.detail.value == 7) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'chek',
      })
    }
    if (e.detail.value == 8) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'panc',
      })
    }
    if (e.detail.value == 9) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'kaif',
      })
    }
    if (e.detail.value == 10) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'kaif-leader',
      })
    }
    if (e.detail.value == 11) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'changw',
      })
    }
    if (e.detail.value == 12) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'janc-leader',
      })
    }
    if (e.detail.value == 13) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'dman1',
      })
    }
    if (e.detail.value == 14) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'dman2',
      })
    }
    if (e.detail.value == 15) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'xiongk',
      })
    }
    if (e.detail.value == 16) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'xiaoyw',
      })
    }
    if (e.detail.value == 17) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'yinj',
      })
    }
    if (e.detail.value == 18) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'qiany',
      })
    }
    if (e.detail.value == 19) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'zhuzh',
      })
    }
    if (e.detail.value == 20) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'zhoulj',
      })
    }
    if (e.detail.value == 21) {
      this.setData({
        contactindex: e.detail.value,
        contact: 'wumj',
      })
    }
  },

  //受理人选择
  receiverfunc: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: '选择',
      })
    }

    if (e.detail.value == 1) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'admin',
      })
    }

    if (e.detail.value == 2) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'wangjj',
      })
    }
    if (e.detail.value == 3) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'panlx',
      })
    }
    if (e.detail.value == 4) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'shenw',
      })
    }
    if (e.detail.value == 5) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'zhangb',
      })
    }
    if (e.detail.value == 6) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'yangl',
      })
    }
    if (e.detail.value == 7) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'chek',
      })
    }
    if (e.detail.value == 8) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'panc',
      })
    }
    if (e.detail.value == 9) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'kaif',
      })
    }
    if (e.detail.value == 10) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'kaif-leader',
      })
    }
    if (e.detail.value == 11) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'changw',
      })
    }
    if (e.detail.value == 12) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'janc-leader',
      })
    }
    if (e.detail.value == 13) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'dman1',
      })
    }
    if (e.detail.value == 14) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'dman2',
      })
    }
    if (e.detail.value == 15) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'xiongk',
      })
    }
    if (e.detail.value == 16) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'xiaoyw',
      })
    }
    if (e.detail.value == 17) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'yinj',
      })
    }
    if (e.detail.value == 18) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'qiany',
      })
    }
    if (e.detail.value == 19) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'zhuzh',
      })
    }
    if (e.detail.value == 20) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'zhoulj',
      })
    }
    if (e.detail.value == 21) {
      this.setData({
        receiverindex: e.detail.value,
        receiver: 'wumj',
      })
    }
  },
})