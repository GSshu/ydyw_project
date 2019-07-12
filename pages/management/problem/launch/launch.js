// pages/problem/launch/launch.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date_time: '',
    date: '2019-01-01 12:00',
    disabled: false,//设置是否能点击 false可以 true不能点击
    startDate: 2019,
    endDate: 2030,
    hopetimeplaceholder: '选择时间',
    hopetimetext: "受理时间",

    changeitemss: [
      { name: '纸票', value: '纸票', checked: 'true' },
      { name: '电票', value: '电票' },
    ],
    changwuslr:"场务受理人",
    changetopic:"标题",
    piaojuleixing: "票据类型",
    jigouname:"来电机构名称",
    jigouhanghao:"来电机构大额支付行号",
    contact_name_1: "业务咨询联系人",
    tel_1: "业务咨询联系电话",
    yewushijianleibie:"业务事件类别",
    array: ['选择', '会员部', '交易部','票据部','托管部','清算部','检测部','技术管理部','技术开发部','技术运行部','其它'],
    index: 0,
    changwulxr:"场务联系人",
    changwulxrtel:"场务联系人电话",
    zixuncontent:"咨询事项",
    requireurl: "../../../../static/image/required.png",
    xialajiantou: "../../../../static/image/xialajiantou.png",
    showMask: "true",
    // uploadfile: "请选择上传文件",

    //传递给后台的数据
    
    changeitems: '服务变更',
    urgentitems: '一般',
    receiver: '王建君',
    contact_name: '',
    inputtel: '',
    hopetime: '',
    infoitems: '',
    csr_name: '',
    content: '',
    index_rev: '',
    slr_name: '',
    slr_id: '',
    tel: '',
    // sourcefile: '选择文件',
  },

  inputtitle: function (e) {
    //输入变更主题
    this.setData({
      title: e.detail.value
    })
  },

  launchchangeitems: function (e) {
    //变更类别
    this.setData({
      changeitems: e.detail.value
    })
    console.log(e.detail.value)
  },

  launchemergency: function (e) {
    //紧急程度
    this.setData({
      urgentitems: e.detail.value
    })
    console.log(e.detail.value)
  },

  launchchangename: function (e) {
    //受理人姓名
    this.setData({
      receiver: e.detail.value
    })
    console.log(e.detail.value)
  },

  inputcontact_name: function (e) {
    //联系人姓名 
    this.setData({
      contact_name: e.detail.value	//
    })
  },

  inputtel: function (e) {
    //联系人电话
    this.setData({
      tel: e.detail.value	//
    })
  },

  onPickerChange: function (e) {
    //期望变更时间
    this.setData({
      hopetime: e.detail.dateString
    })
    console.log(e.detail.dateString);
  },
  /*
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
 */
  slrChange: function (e) {
    //变更受理人
    console.log('slr:', e.detail.value)
    if (e.detail.value == 1) {
      this.setData({
        index: e.detail.value,
        slr_name: '王建君',
        slr_id: "123456"	//
      })
    }
    else if (e.detail.value == 2) {
      this.setData({
        index: e.detail.value,
        slr_name: '潘隆禧',
        slr_id: "654321"	//
      })
    }
  },

  chooseFile: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://192.168.163.13:8009/launch/uploadImg/', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },

  isinformChange: function (e) {
    // 是否需要通知修改
    this.setData({
      infoitems: e.detail.value	//
    })
  },

  inputcontent: function (e) {
    //变更的内容 
    this.setData({
      content: e.detail.value	//
    })
  },

  summit_action: function (e) {
    //后台提交方法
    console.log('form发生了submit事件')
    if (this.data.title && this.data.changeitems && this.data.urgentitems && this.data.contact_name && this.data.tel && this.data.hopetime && this.data.infoitems && this.data.content && this.data.slr_name && this.data.slr_id && this.data.receiver) {
      wx.request({
        url: 'http://192.168.163.13:8009/launch/launch_change/',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          //向服务器发送的信息
          change_id: this.data.date_time,
          change_title: this.data.title,
          change_type: this.data.changeitems,   //文字
          urgent_rank: this.data.urgentitems,   //文字
          contact_name: this.data.contact_name,
          contact_telephone: this.data.tel,
          expect_finish_time: this.data.hopetime,
          notice_relate_dep: this.data.infoitems,  //文字
          change_text: this.data.content,
          receive_name: this.data.slr_name,
          receive_id: this.data.slr_id,
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
                    url: '../../../../index/index'
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
    else {
      wx.showToast({
        title: '所填不能为空',
        icon: 'false',
        duration: 2000
      })
    }
  },

  //保存用户未提交数据
  save_data: function (e) {
    console.log('form发生了保存事件')
    console.log(e.detail);
    var objData = e.detail;
    //变更主题
    wx.setStorage({
      key: 'change_title',
      data: this.data.title,
    })
    //变更类型
    wx.setStorage({
      key: 'change_type',
      data: this.data.changeitems,
    })
    //紧急程度
    wx.setStorage({
      key: 'urgent_rank',
      data: this.data.urgentitems,
    })
    //联系人姓名
    wx.setStorage({
      key: 'contact_name',
      data: this.data.contact_name,
    })
    //联系人电话
    wx.setStorage({
      key: 'contact_telephone',
      data: this.data.tel,
    })
    //期望完成时间
    wx.setStorage({
      key: 'expect_finish_time',
      data: this.data.hopetime,
    })
    //抄送人  
    wx.setStorage({
      key: 'notice_relate_dep',
      data: this.data.infoitems,
    })
    //变更内容  
    wx.setStorage({
      key: 'change_text',
      data: this.data.content,
    })
    //受理人姓名
    wx.setStorage({
      key: 'receive_name',
      data: this.data.slr_name,
    })
    //受理人ID 
    wx.setStorage({
      key: 'receive_id',
      data: this.data.slr_id,
    })
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000,
    })

    setTimeout(function () {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }, 1000)
  },

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
    var that = this
    wx.getStorage({
      key: 'change_title',
      success: function (res) {
        that.setData({ title: res.data })
      },
    })
    wx.getStorage({
      key: 'change_type',
      success: function (res) {
        that.setData({ changeitems: res.data })
      },
    })
    wx.getStorage({
      key: 'contact_name',
      success: function (res) {
        that.setData({ contact_name: res.data })
      },
    })
    wx.getStorage({
      key: 'contact_telephone',
      success: function (res) {
        that.setData({ tel: res.data })
      },
    })
    wx.getStorage({
      key: 'expect_finish_time',
      success: function (res) {
        that.setData({ hopetime: res.data })
      },
    })
    wx.getStorage({
      key: 'notice_relate_dep',
      success: function (res) {
        that.setData({ infoitems: res.data })
      },
    })
    wx.getStorage({
      key: 'change_text',
      success: function (res) {
        that.setData({ content: res.data })
      },
    })
    wx.getStorage({
      key: 'receive_name',
      success: function (res) {
        that.setData({ slr_name: res.data })
      },
    })
    wx.getStorage({
      key: 'receive_id',
      success: function (res) {
        that.setData({ slr_id: res.data })
      },
    })
    //////////////////////////////////////////////////////////////////
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