// components/article/article.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    article: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    like (e) {
      const id = e.target.dataset.id
      const token = wx.getStorageSync('token')
      let method = 'POST'
      if (this.data.article.isLiked) {
        method = 'DELETE'
      }
      // 调用/article/:id/like
      wx.request({
        url: `http://localhost:3000/api/article/${id}/like`,
        header: {
          "Authorization": "Bearar " + token
        },  
        method,
        success: (res) => {
          if (res.data.res_code === 200) {
            wx.showToast({
              title: '操作成功',
            })
            this.triggerEvent('like', {status: !this.data.article.isLiked})
          } 
        }
      })
    }
  }
})
