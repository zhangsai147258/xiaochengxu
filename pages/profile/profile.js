// pages/profile/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    likedList: []
  },

  goArticle (e) {
    const id = e.target.dataset.id
    wx.navigateTo({
      url: '/pages/listArticle/listArticle?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      app.userInfoReadyCallback = (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo
        })
      }
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
    if (this.data.userInfo) {
      const token = wx.getStorageSync('token')
      const header = {}
      if (token) {
        header.Authorization = "Bearar " + token
      }

      wx.request({
        url: 'http://localhost:3000/api/articles/like',
        header,
        success: (res) => {
          console.log(res)
          this.setData({
            likedList: res.data.res
          })
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

  },
  
  getUserInfo (res) {
    console.log(res)
    // 把res中的信息存储在app.globalData
    app.globalData.userInfo = res.detail.userInfo
    this.setData({
      userInfo: res.detail.userInfo
    })
    wx.reLaunch({
      url: '/pages/login/login'
    })
  }
})