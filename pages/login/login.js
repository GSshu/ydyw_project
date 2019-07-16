// pages/login/login.js
Page({
  data: {		//此处定义本页面中的全局变量
    result: '',
    username: '',
    passwd: '',

    userplaceholder:'用户名',
    pwdplaceholder: '密码',

    topimge:'/static/image/pjs.jpg',
    userimage:'../../static/image/login/user.png',
    pwdimage: '../../static/image/login/passwd.png',
  },
  inputName: function (e) {	// 用于获取输入的账号
    this.setData({
      username: e.detail.value	//将获取到的账号赋值给username变量
    })
  },
  inputPwd: function (e) {		// 用于获取输入的密码
    this.setData({
      passwd: e.detail.value	//将获取到的账号赋值给passwd变量
    })
  },

  log: function (e) {		//与服务器进行交互
    var that = this
    wx.request({
      url: 'http://www.ydyw.com/xcxlogin/',	//获取视图的url
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {		//向服务器发送的信息
        username: this.data.username,
        passwd: this.data.passwd
      },
      success: res => {       //回调函数
        if (res.statusCode == 200) {   //信息 登录成功
          this.setData({
            result: res.data	//服务器返回的结果
          })
          if (res.data == "登录成功！")
          {
            wx.showToast({
            title: '登录成功啦',
            icon: 'success',
            duration: 10000,
            success: function () {
              var app = getApp();     // 取得全局App
              app.globalData.global_username = that.data.username,
              app.globalData.global_pwd = that.data.passwd,
              console.log("测试")
              console.log(app.globalData.global_pwd)
              wx.switchTab({
                url: '../index/index'
              })
            }
          })
          //////////////////////////////////////////////////////////////////
            //获取当前时间戳
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            console.log("当前时间戳为：" + timestamp);
            //获取当前时间
            var dep_type = 'ydyw' ;
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
            console.log("当前时间：" + 1 + Y + M + D + h + m);
            console.log(date.toDateString());
            console.log(date.toGMTString());
            console.log(date.toISOString());
            console.log(date.toJSON());
            console.log(date.toLocaleDateString());
            console.log(date.toLocaleString());
            console.log(date.toLocaleTimeString());
            console.log(date.toString());
            console.log(date.toTimeString());
            console.log(date.toUTCString());
           ////////////////////////////////////////////////////////////////////
          }
          else{
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 5000
            })
          }
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