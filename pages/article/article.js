// pages/article/article.js
const {getArticle} = require('../../service/getData.js')
console.log(getArticle)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {}
  },

  setLike (e) {
    this.setData({
      'article.isLiked': e.detail.status
    })
  },
  // getArticle (id) {
    // wx.showLoading({
    //   title: '请求中',
    // })
    // wx.request({
    //   url: `http://localhost:3000/api/article/${id}`,
    //   success: (res) => {
        // this.setData({
        //   article: res.data.res
        // })
        // wx.setNavigationBarTitle({
        //   title: this.data.article.title,
        // })
        // wx.hideLoading()
    //   }
    // })
  // },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id = 1}) {
    // 根据id请求对应文章
    wx.showLoading({
      title: '请求中',
    })
    getArticle(id).then(res => {
      console.log(res)
      this.setData({
        article: res.data.res
      })
      wx.setNavigationBarTitle({
        title: this.data.article.title,
      })
      wx.hideLoading()
    })
    // this.getArticle(256)

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