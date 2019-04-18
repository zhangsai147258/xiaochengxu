const app = getApp()
// components/ydMusic/ydMusic.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: String,
    audio: null
  },  

  // 声明周期
  lifetimes: {
    
    created () {
      app.globalData.audio && app.globalData.audio.destroy()
      const audio = wx.createInnerAudioContext()
      // console.log(audio)
      // audio.autoplay = true
      // this.setData({
      //   audio
      // })
      app.globalData.audio = audio
      audio.onTimeUpdate(() => {
        // 获取到当前的currentTime
        // console.log(audio.currentTime)
        const width = audio.currentTime / audio.duration * 100
        this.setData({
          width
        })
        this.formatTimes(audio.currentTime, audio.duration)
      })
    }
  },

  // 监听数据的变化

  observers: {
    url (value) {
      app.globalData.audio.src = value
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: 0,
    time: '00:00',
    status: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formatTimes (currentTime, duration) {
      const time = duration - currentTime
      let min = Math.floor(time / 60)
      let sec = Math.floor(time % 60)
      min = min < 10 ? '0' + min : min
      sec = sec < 10 ? '0' + sec : sec
      
      this.setData({
        time: min + ":" + sec
      })
    },
    play () {
      const status = !this.data.status
      this.setData({
        status
      })

      // 让音频播放或者暂停
      this.data.status ? app.globalData.audio.play() : app.globalData.audio.pause()
    }
  }
})
