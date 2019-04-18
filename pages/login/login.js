// pages/login/login.js
Page({
  getEmail (e) {
    this.setData({
      'user.email': e.detail.value
    })
  },

  getPassword (e) {
    this.setData({
      'user.password': e.detail.value
    })
  },

  login () {
    wx.login({
      success: ({code}) => {
        // 调用登录接口并且把code传递过去
        wx.request({
          url: 'http://localhost:3000/api/user/login',
          method: "POST",
          // data: {
          //   emial: this.data.user.email,
          //   password: this.data.user.password
          // }
          data: {
            ...this.data.user,
            code
          },
          success: (res) => {
            if (res.data.res_code === 200) {
              wx.setStorageSync('token', res.data.res.token)
              // 跳转到profile
              wx.switchTab({
                url: '/pages/profile/profile',
              })
            }
          }
        })
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      emial: '',
      password: ''
    }
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