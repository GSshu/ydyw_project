// pages/management/change/before_untreated/be_untreated.js
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
    placeholder: '变更期望完成时间',

    changeitemss: [
      { name: '服务变更', value: '服务变更', checked: 'true' },
      { name: '技术变更', value: '技术变更' },
    ],
    urgentitemss: [
      { name: '一般', value: '一般', checked: 'true' },
      { name: '紧急', value: '紧急' },
    ],
    receiveritemss: [
      { name: '王建军', value: '王建君', checked: 'true' },
      { name: '潘隆禧', value: '潘隆禧' },
    ],
    changeid: '待处理：',
    changetopic: "变更主题",
    receivercategory: "受理人",
    changecategory: "变更类别",
    emergencylevel: "紧急程度",
    contact_name_1: "联系人",
    tel_1: "联系方式(含手机号)",
    hopetime: "变更期望完成的时间",
    isinform: '是否通知受理人',
    array: ['请选择受理人', '王建君', '潘隆禧'],
    index: 0,
    changecontent: "变更需求内容",
    requireurl: "../../../../static/image/required.png",
    xialajiantou: "../../../../static/image/xialajiantou.png",
    showMask: "true",

    //传递给后台的数据
    title: '',
    changeitems: '',
    urgentitems: '',
    contact_name: '',
    inputtel: '',
    hopetime: '',
    infoitems: '',
    content: '',
    index_rev: '',
    slr_name: '',
    slr_id: '',
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
      changeitems: e.detail.value
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
        slr_name: '王建君',
        slr_id: "123456"	//
      })
    }
    else if (e.detail.value == 2) {
      this.setData({
        slr_name: '潘隆禧',
        slr_id: "654321"	//
      })
    }

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
    console.log('查询操作')
      wx.request({
        url: 'http://www.ydyw.com/launch/launch_number/',
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
              date_time: res.data	//服务器返回的结果
            })
          }

          if (date_time == "4") {
            wx.showToast({
              title: '查询成功',
              icon: 'success',
              duration: 2000,
              success: function () {
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