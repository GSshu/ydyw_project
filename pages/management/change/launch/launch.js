 Page({
  /**
   * 页面的初始数据
   */
  data: {
    workflow_id: 2,
    submit_id: 7,
    save_id: 9,
    date_time: '',
    date: '2019-01-01 12:00',
    disabled: false,//设置是否能点击 false可以 true不能点击
    startDate: 2019,
    endDate: 2030,
    hopetimeplaceholder: '选择时间',
    hopetimetext: "变更期望完成的时间",

  chooseList: [{ value: '1', name: '抄送人1' },
               { value: '2', name: '抄送人2' },
               { value: '3', name: '抄送人3' },
               { value: '4', name: '抄送人4' },
               { value: '5', name: '抄送人5' },
               { value: '6', name: '抄送人6' },
               { value: '7', name: '抄送人7' },
  ],
multiple: true,


    changeitemss: [
      { name: '服务变更', value: '服务变更', checked: 'true' },
      { name: '技术变更', value: '技术变更' },
    ],
    urgentitemss: [
      { name: '一般', value: '一般', checked: 'true' },
      { name: '紧急', value: '紧急' },
    ],
    receiveritemss: [
      { name: '王建君', value: '王建君', checked: 'true' },
      { name: '潘隆禧', value: '潘隆禧' },
    ],
    changeid:'变更号',
    changetopic: "变更主题",
    receivercategory: "受理人",
    changecategory: "变更类别",
    emergencylevel: "紧急程度",
    contact_name_1: "联系人",
    tel_1: "联系方式(含手机号)",
    hopetime: "变更期望完成的时间",
    isinform:'是否通知抄送人',
    array: ['选择','王建君', '潘隆禧'],
    index: 0,
    changecontent: "变更需求内容",
    requireurl: "../../../../static/image/required.png",
    xialajiantou: "../../../../static/image/xialajiantou.png",
    showMask: "true",
    uploadfile:"请选择上传文件",

    //传递给后台的数据
    title:'',
    changeitems: '服务变更',
    urgentitems: '一般',
    receiver: '王建君',
    contact_name:'',
    inputtel:'',
    hopetime:'',
    infoitems:'',
    csr_name:'',
    content:'',
    index_rev:'',
    slr_name:'',
    slr_id:'',
    tel:'',
    sourcefile:'选择文件',
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
           url: 'http://192.168.1.199:8008/media', //仅为示例，非真实的接口地址
           filePath: tempFilePaths[0],
           name: 'file',
           formData: {
             'user': 'test'
           },
           success: function (res) {
             var data = res.data
             console.log("上传成功")
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

  yx_submit: function () {
    //后台提交方法
    var app = getApp();
    var that = this;

    wx.request({  
      url: 'http://www.ydyw.com:8008/yxchange/postdata/',  
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },
            method: "POST",
            data: {		
                  //向服务器发送的信息
                  yx_username: app.globalData.global_username,
                  yx_workflow_id: this.data.workflow_id,
                  yx_transition_id: this.data.submit_id,
                  
                  change_title: this.data.title,
                  change_type: this.data.changeitems,   //文字
                  urgent_rank: this.data.urgentitems,   //文字
                  contact_name: this.data.contact_name,
                  contact_telephone: this.data.tel,
                  expect_finish_time: this.data.hopetime,
                  change_text: this.data.content,
                  },
                 success: function (res) {
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
    })
  },

  //保存用户未提交数据
  save_data:function(e){
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
      date_time : "1-" + Y + M + D + h  + m	//
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