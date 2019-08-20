// pages/management/problem/relaunch/relaunch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_time: '',
    // date: '2019-01-01 12:00',
    disabled: false,//设置是否能点击 false可以 true不能点击
    startDate: 2019,
    endDate: 2030,
    hopetimeplaceholder: '选择受理时间',
    // sltimetext: "受理时间",

    changeitemss: [
      { name: '纸票', value: '1', checked: 'true' },
      { name: '电票', value: '2' },
    ],
    // changwuslr: "场务受理人",
    // changetopic: "标题",
    // serialname: "编号",
    // piaojuleixing: "票据类型",
    // jigouname: "来电机构名称",
    // jigouhanghao: "来电机构大额支付行号",
    // contact_name_1: "业务咨询联系人",
    // tel_1: "业务咨询联系电话",
    // yewushijianleibie: "业务事件类别",
    array: ['选择', '会员部', '交易部', '票据部', '托管部', '清算部', '检测部', '技术管理部', '技术开发部', '技术运行部', '其它'],
    index: 0,
    // changwulxr: "场务联系人",
    // changwulxrtel: "场务联系人电话",
    // zixuncontent: "咨询事项",

    changetopictext: "标题",
    serialnametext: "编号",
    piaojuleixingtext: "票据类型",
    jigounametext: "来电机构名称",
    jigouhanghaotext: "来电机构大额支付行号",
    contact_name_1text: "业务咨询联系人",
    tel_1text: "业务咨询联系电话",
    yewubumentext: "相关业务部门",
    yewushijianleibietext: "业务事件类别",
    changwuslrtext: "场务受理人",
    sltimetext: "受理时间",
    changwulxrtext: "场务联系人",
    changwulxrteltext: "场务联系人电话",
    zixuncontent: "咨询事项",


    requireurl: "../../../../static/image/required.png",
    xialajiantou: "../../../../static/image/xialajiantou.png",
    showMask: "true",

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