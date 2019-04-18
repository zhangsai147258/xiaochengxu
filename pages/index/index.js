Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    currentPage: 1,
    noData: false,
    flag: true,
    id: 1,
    types: [],
    scroll: 0
  },

  // 创建trigger函数
  getData (e) {
    const id = e.detail.id
    this.setData({
      flag: true,
      id,
      currentPage: 1
    })
    // 调用请求数据的函数
    this.getArticles (this.data.id, 1, 'replace')
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },

  // 请求导航数据
  getNavData () {
    wx.request({
      url: 'http://localhost:3000/api/types',
      success: (res) => {
        this.setData({
          types: res.data.res
        })
      }
    })
  },

  // 请求数据的函数
  getArticles (id = 1, page = 1, type = "push") {
    
    if (this.data.flag) {
      wx.showLoading({
        title: '请求中',
      })
      wx.request({
        url: `http://localhost:3000/api/articles/${id}/page/${page}`,
        success: (res) => {
          if (res.data.res.articles.length) {
            if (type === 'push') {
              const articles = this.data.articles.concat(res.data.res.articles)
              this.setData({
                articles,
                flag: true
              }, function () {
                wx.hideLoading()

              })
            } else if (type === 'replace') {
              this.setData({
                articles: res.data.res.articles,
                flag: true
              }, function () {
                wx.hideLoading()
              })
            }
            
          } else {
            wx.hideLoading()
            this.setData({
              noData: true
            })
          }

        }
      })

      this.setData({
        flag: false
      })
    }
    
  },

  goArticle (e) {
    const id = e.target.dataset.id
    // wx.reLaunch({
    //   url: `/pages/listArticle/listArticle?id=${id}`,
    // })
    wx.navigateTo({
      url: `/pages/listArticle/listArticle?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticles()
    this.getNavData()
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
    console.log('到底部了')
    const currentPage = this.data.currentPage + 1
    this.setData({
      currentPage
    })

    this.getArticles(this.data.id, currentPage)
  },

  onPageScroll (e) {
    // console.log(e)
    this.setData({
      scroll: e.scrollTop
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})