var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    change_untreated_number: '10',
    change_owner_number: '10',
    change_duty_number: '10',
    change_relation_number: '10',

    launch:{
      url: "/static/image/launch.png",
      text: "发起"
    },
    untreated: {
      url: "/static/image/untreated.png",
      text: "未处理"
    },
    treated: {
      url: "/static/image/treated.png",
      text: "已处理"
    },
    submission: {
      url: "/static/image/submission.png",
      text: "相关的"
    },
    overtime:{
      url: "/static/image/overtime.png",
      text: "加班"
    },
    leave:{
      url: "/static/image/leave.png",
      text: "请假"
    },
    vacation: {
      url: "/static/image/vacation.png",
      text: "休假"
    },
    business:{
      url: "/static/image/business.png",
      text: "出差"
    },
    title:{
      changemanagement:"变更管理",
      issuemanagement: "问题管理",
      eventmanagement: "事件管理",
      staffmanagement: "外出事务管理"
    },
    search:"搜索"
  },

  chooseImage:function(){
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: '/home/Django_project/ydyw/static', 
          filePath: "/static/image/leave.png",
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            console.log("成功");
            //do something
          }
        })
      }
    })
  },

  ////////////变更管理//////////////
  change_launch: function () {
    wx.navigateTo({
      url: '../management/change/launch/launch',
    })
  },
  change_beforeuntreated: function () {
    wx.navigateTo({
      url: '../management/change/beforeuntreated/beforeuntreated',
    })
  },
  change_untreated: function () {
    wx.navigateTo({
      url: '../management/change/untreated/untreated',
    })
  },
  change_beforetreated: function () {
    wx.navigateTo({
      url: '../management/change/beforetreated/beforetreated',
    })
  },
  change_treated: function () {
    wx.navigateTo({
      url: '../management/change/treated/treated',
    })
  },
  change_beforerelation: function () {
    wx.navigateTo({
      url: '../management/change/beforerelated/beforerelated',
    })
  },
  change_relation: function () {
    wx.navigateTo({
      url: '../management/change/receive/receive',
    })
  },
  //////////问题管理//////////
  problem_launch: function () {
    wx.navigateTo({
      url: '../management/problem/launch/launch',
    })
  },
  problem_untreated: function () {
    wx.navigateTo({
      url: '../management/problem/beforeuntreated/beforeuntreated',
    })
  },
  problem_treated: function () {
    wx.navigateTo({
      url: '../management/problem/untreated/untreated',
    })
  },

  //////////事件管理///////////
  event_launch: function () {
    wx.navigateTo({
      url: '../management/event/launch/launch',
    })
  },

  /////////外出事务管理///////////
  staff_launch: function () {
    wx.navigateTo({
      url: '../management/staff/launch/launch',
    })
  },

  staff_untreated:function(){
    wx.navigateTo({
      url: '../management/staff/beforeuntreated/beforeuntreated',
    })
  },

  staff_treated:function(){
    wx.navigateTo({
     url: '../management/staff/untreated/untreated',
    })
  },

  staff_related: function () {
    wx.navigateTo({
      url: '../management/staff/related/related',
    })
  },

  staff_beforerelated: function () {
    wx.navigateTo({
      url: '../management/staff/beforerelated/beforerelated',
    })
  },

  bindFocus: function () {
    wx.navigateTo({
      url: '../search/search',
      //url: '../wxSearch/wxSearch',
      // url: '../../component/wxSearch/wxSearch',
    })
  },

  search_launch_number: function (e) {		//与服务器进行交互
    wx.request({
      url: 'http://www.ydyw.com:8008/launch/launch_number/',	//获取服务器地址
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {		//向服务器发送的信息
      },
      success: res => {       //回调函数
        if (res.statusCode == 200) {   //信息 登录成功
          this.setData({
            number_result: res.data	//服务器返回的结果v 
          })
        }
      }
    })
  },

  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    this.queryData(id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    if (app.globalData.refreshFlag) {
      app.globalData.refreshFlag = true;
      console.log('请求数据')
      wx.request({
        url: 'http://www.ydyw.com:8008/obtaintickets/',	//获取服务器地址，此处为本地地址
        header: {
          "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
        },
        method: "POST",
        data: {		//向服务器发送的信息
          workflow_id: 2,
          username: app.globalData.global_username,
        },
        success: res => {       //回调函数
          if (res.statusCode == 200) {   //信息 登录成功
            this.setData({
              change_owner_number: res.data[1]['owner'],	//服务器返回的结果
              change_duty_number: res.data[1]['duty'],	//服务器返回的结果
              change_relation_number: res.data[1]['relation'],	//服务器返回的结果
             
            })
          }
        }
      })
      
    }

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