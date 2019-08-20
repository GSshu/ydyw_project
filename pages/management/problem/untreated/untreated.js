// pages/management/problem/untreated/untreated.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changetopictext:"标题",
    serialnametext:"编号",
    piaojuleixingtext:"票据类型",
    jigounametext:"来电机构名称",
    jigouhanghaotext:"来电机构大额支付行号",
    contact_name_1text:"业务咨询联系人",
    tel_1text:"业务咨询联系电话",
    yewubumentext:"相关业务部门",
    yewushijianleibietext: "业务事件类别",
    changwuslrtext: "场务受理人",
    sltimetext: "受理时间",
    changwulxrtext: "场务联系人",
    changwulxrteltext: "场务联系人电话",
    zixuncontent: "咨询事项",
    opiniontext: "处理意见",

    ticket_id:'',

    accept_id: 69,
    refuse_id: 64,

    changetopic: '',
    serialname: '',
    piaojuleixing: '',
    jigouname: '',
    jigouhanghao: '',
    contact_name_1: '',
    tel_1: '',
    yewubumen: '',
    yewushijianleibie: '',
    changwuslr: '',
    sltime: '',
    changwulxr: '',
    changwulxrtel: '',
    content: '',
    opinion: ''


  },

  opiniofunc: function (e) {
    this.setData({
      opinion: e.detail.value
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
    var app = getApp();
    var that = this
    wx.request({
      url: 'http://www.ydyw.com:8008/manage/obtainticketdata/',
      data: {
        username: app.globalData.global_username,
        manage_ticket_id: app.globalData.ticket_id,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data[3] == 2){
          that.setData({
            piaojuleixing: "电票"
          })
        }
        if (res.data[3] == 1) {
          that.setData({
            piaojuleixing: "纸票"
          })
        }
        console.log(res.data)
        that.setData({
          changetopic: res.data[1],
          serialname: res.data[2],
          jigouname: res.data[4],
          jigouhanghao: res.data[5],
          contact_name_1: res.data[6],
          tel_1: res.data[7],
          yewubumen: res.data[9],
          yewushijianleibie: res.data[8],
          changwuslr: res.data[11],
          sltime: res.data[12],
          changwulxr: res.data[13],
          changwulxrtel: res.data[15],
          content: res.data[10],
        })
      },
      fail: function () {
        console.log("失败了！")
      },
      complete: function () {
        console.log("完成了！")
      }
    }),
      wx.request({
        url: 'http://www.ydyw.com:8008/manage/trans/',
        data: {
          username: app.globalData.global_username,
          manage_ticket_id: app.globalData.ticket_id,
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log("获取transition_id成功了！")
          console.log(res)
          // that.setData({
          //   accept_id: res.data.accept,
          //   refuse_id: res.data.refuse,
          //   change_id: res.data.
          //  })

        },

        fail: function () {
          console.log("失败了！")
        },
        complete: function () {
          console.log("完成了！")
          //console.log(accept_id)
         // console.log(refuse_id)
        }
      })
  },

  //审批同意将accept_id上传
  agree_action: function () {
    var app = getApp();
    if (this.data.opinion) {
      wx.request({
        url: 'http://www.ydyw.com:8008/manage/ticketagree/',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username: app.globalData.global_username,
          manage_ticket_id: app.globalData.ticket_id,
          manage_transition_id: this.data.accept_id,
          process_opinion: this.data.opinion,
        },
        success: function (res) {
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
    }
  },

  //驳回将refuse_id上传
  disagree_action: function (e) {
    var app = getApp();
    if (this.data.opinion) {
      wx.request({
        url: 'http://www.ydyw.com:8008/manage/ticketagree/',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username: app.globalData.global_username,
          manage_ticket_id: app.globalData.ticket_id,
          manage_transition_id: this.data.refuse_id,
          process_opinion: this.data.opinion,
        },
        success: function (res) {
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
    }
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