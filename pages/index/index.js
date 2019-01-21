var bmap = require('../../libs/bmap-wx.js');
Page({
  data: {
    markers: [],
    weatherData: '',
    siteList: [
      {
        id: 1,
        siteName: '锦带路迎春路 浦东新区办公中心',
        latitude: '31.222',
        longitude: '121.545',
      },
      {
        id: 2,
        siteName: '合欢路丁香路 浦东市民中心',
        latitude: '31.223',
        longitude: '121.547',
      },
      {
        id: 3,
        siteName: '锦绣路世纪大道',
        latitude: '31.218',
        longitude: '121.546',
      },
      {
        id: 4,
        siteName: '上海科技馆地铁站',
        latitude: '31.217',
        longitude: '121.547',
      },
      {
        id: 5,
        siteName: '锦绣路世纪大道 上海科技馆',
        latitude: '31.218',
        longitude: '121.548',
      },
      {
        id: 6,
        siteName: '民生路丁香路',
        latitude: '31.225',
        longitude: '121.549',
      },
      {
        id: 7,
        siteName: '锦绣路花木路',
        latitude: '31.212',
        longitude: '121.541',
      },
    ],
    listWidth: '100%',
    busList: [
      {
        id: 1,
        latitude: '31.2226',
        longitude: '121.545',
      },
      {
        id: 2,
        latitude: '31.218',
        longitude: '121.548',
      },
      {
        id: 3,
        latitude: '31.218',
        longitude: '121.5468',
      },
    ],
    nearest: {
      siteName: '锦绣路世纪大道',
      latitude: '31.218',
      longitude: '121.546',
    }
  },
  onLoad: function () {
    var that = this;
    // console.log(that.data.siteList )
    let siteList = that.data.siteList;
    for (let i = 0; i < siteList.length-1;i++){
      that.data.busList.forEach(itm => {
        if (itm.longitude === siteList[i].longitude  ) {
          siteList[i].haveBus = true;
        } else if (itm.longitude > siteList[i].longitude && itm.longitude < siteList[i+1].longitude ) {
          siteList[i].near = true;
        }
      })
    }
    // console.log(siteList )
    that.setData({
      siteList: siteList,
    })
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'kQDDeY1AnK9vZ6TaEBxGa8Oa0ABokwQH'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      // console.log( data )
      that.setData({
        markers: data.wxMarkerData
      });
    }
    var queryWetherSuccess = function(data) {
      // console.log( data )
      that.setData({
        weatherData: data.currentWeather[0]
      })
    } 
    // 发起POI检索请求 
    BMap.search({
      "query": '公交站',
      fail: fail,
      success: success,
    });

    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: queryWetherSuccess
    });
  },
})