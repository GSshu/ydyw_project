 Page({
  /**
   * 页面的初始数据
   */
  data: {
    changeitems: [
      { name: 'service', value: '服务变更', checked: 'true'},
      { name: 'technology', value: '技术变更' },
    ],
    urgentitems: [
      { name: 'normal', value: '一般', checked: 'true' },
      { name: 'serious', value: '紧急' },
    ],
    infoitems: [
      { name: 'yes', value: '是', checked: 'true' },
      { name: 'no', value: '否' },
    ],
    changeid: "变更id", //后续需要进行动态编号
    changetopic: "变更主题",
    changecategory: "变更类别",
    emergencylevel: "紧急程度",
    contact_name_1: "联系人",
    tel_1: "联系方式(含手机号)",
    hopetime_1: "变更期望完成的时间",
    isinform: "是否需要通知相关部门",
    changecontent: "变更需求内容",
    requireurl: "../../../../static/image/required.png",
    id:'',
    title:'',
    changeitems:'',
    urgentitems:'',
    contact_name:'',
    inputtel:'',
    hopetime:'',
    infoitems:'',
    content:'',
  },

   inputid: function (e) {	// 用于获取输入的id，后续进行动态修改
     this.setData({
       id: e.detail.value	//将获取到的id赋值给id变量
     })
   },
   inputtitle: function (e) {	// 
     this.setData({
       title: e.detail.value	//
     })
   },
   
   //changeitems.name
   categoryChange: function (e) {	// 
     this.setData({
       changeitems : e.detail.value	//
     })
   },
   //urgentitems.name
   emergencyChange: function (e) {	// 
     this.setData({
       urgentitems: e.detail.value	//
     })
   },


   inputcontact_name: function (e) {	// 
     this.setData({
       contact_name: e.detail.value	//
     })
   },
   inputtel: function (e) {	// 
     this.setData({
       tel: e.detail.value	//
     })
   },
   
   inputhopetime: function (e) {	// 
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
       hopetime: Y + M + D + h + ":" + m + ":" + s	//
     })
   },

  // infoitems
   isinformChange: function (e) {	// 
     this.setData({
       infoitems: e.detail.value	//
     })
   },

   inputcontent :function (e) {	// 
     this.setData({
       content: e.detail.value	//
     })
   },

  summit_action: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.data)
    wx.request({  
      url: 'http://www.ydyw.com/launch/launch_change/',  
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },
            method: "POST",
            data: {		//向服务器发送的信息
                  change_id: this.data.id,
                  change_title: this.data.title,
                  change_type: this.data.changeitems,
                  urgent_rank: this.data.urgentitems,
                  contact_name: this.data.contact_name,
                  contact_telephone: this.data.tel,
                  expect_finish_time: this.data.hopetime,
                  notice_relate_dep: this.data.infoitems,
                  change_text: this.data.content
                  },
            success: function(res) {
              if(res.data.status == 200){
                this.setData({
                  result: res.data	//服务器返回的结果
                })
              }

              if (res.data == "提交成功！") {
                wx.showToast({
                  title: '提交成功啦',
                  icon: 'success',
                  duration: 10000,
                  success: function () {
                    wx.switchTab({
                      url: '../../../index/index'
                    })
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
  formReset: function () {
    console.log('form发生了reset事件')
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