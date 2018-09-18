var app = getApp();
Page({
  data:{
    markers: [],
    controls: [
      {
        id: 1,
        iconPath: '/resources/pin.png',
        position: {
          left: (app.globalData.windowWidth-20)/2,
          top: (app.globalData.windowHeight-20)/2 - 30,
          width: 20,
          height: 20
        },
        clickable: false
      },
      {
        id: 2,
        iconPath: '/resources/center.png',
        position: {
          left: 20,
          top: app.globalData.windowHeight-80,
          width: 20,
          height: 20
        },
        clickable: true
      }
    ]
  },
  controltap () {
    this.mapCtx.moveToLocation()
  },
  onShow () {
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    }),
    wx.request({
      url: 'http://localhost:3000/list',
      data: '',
      header: {'content-type': 'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res.data)
        const markers = res.data.map((item)=>{
          return {
            iconPath: "/resources/"+item.type+".png",
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            width: 30,
            height: 30
          }
        })
        this.setData({
          markers 
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '宠物平台',
      path: '/pages/index/index'
    }
  },
  go () {
    wx.navigateTo({
      url: 'pages/publish/publish',
    })
  },
  markertap(e) {
   wx.navigateTo({
     url: '/pages/detail/detail?id='+e.markerId
   })
  },
  search() {
    wx.navigateTo({
      url: '/pages/search/search',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})