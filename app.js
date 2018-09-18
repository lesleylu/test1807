//app.js
App({
  onLaunch: function () {
   var res = wx.getSystemInfoSync()
   console.log(res)
   this.globalData.windowHeight= res.windowHeight;
   this.globalData.windowWidth = res.windowWidth;
  },
  globalData: {
    userInfo: null
  }
})