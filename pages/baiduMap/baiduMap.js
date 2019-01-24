var bmap = require('../../libs/bmap-wx.js');
let wxMarkerData = [];
Page({
  data: {
    markers: [],
    weatherData: '',
    mapWidth: "",
    mapHeight: "700px",
    longitude: "",
    latitude: "",
    markers: [
      {
        id: 1,
        // title: '榆林路',
        siteName: '榆林路',
        latitude: '31.262335',
        longitude: '121.527',
        direction: '3',
      },
      {
        id: 2,
        siteName: '江浦路',
        latitude: '31.264774',
        longitude: '121.533504',
        direction: '2',
      },
      {
        id: 3,
        siteName: '大连路',
        latitude: '31.263788',
        longitude: '121.519621',
        direction: '1',
      },
      {
        id: 4,
        siteName: '喜士多便利店',
        latitude: '31.266028',
        longitude: '121.531568',
        direction: '2',
      },
      {
        id: 5,
        siteName: '上海自来水科技馆',
        latitude: '31.257207',
        longitude: '121.534704',
        iconPath: "../../static/13.png",
        direction: '1',
      },
    ],
    selectSite: {},
  },
  onNotice() {
    wx.navigateTo({
      url: '../detail/detail?id=2'
    })
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(that.data.markers, id);
    // that.changeMarkerColor(wxMarkerData, id);
  },
  showSearchInfo: function (data, id) {
    var that = this;
    data = data.filter(item => { return item.id === id })
    // console.log(data[0].siteName)
    that.setData({
      selectSite: {
        siteName: '地址：' + data[0].siteName + '\n',
      }
    });
  },
  onLoad: function () {
    let that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'kQDDeY1AnK9vZ6TaEBxGa8Oa0ABokwQH'
    });
    var fail = function (data) {
      console.log(data)
    };
    var queryWetherSuccess = function (data) {
      // console.log( data )
      that.setData({
        weatherData: data.currentWeather[0]
      })
    }
    // 发起weather请求 
    BMap.weather({
      fail,
      success: queryWetherSuccess,
      iconPath: '../../static/13.png',
      // 此处需要在相应路径放置图片文件 
      iconTapPath: '../../static/13.png'
    });
    var success = function (data) {
      let wxMarkerData = data.wxMarkerData[0];
      that.setData({
        longitude: wxMarkerData.longitude,
        latitude: wxMarkerData.latitude,
      })
    }
    BMap.regeocoding({
      fail,
      success
    })
    let markers = that.data.markers.map(item => {
      let iconPath = '';
      if (item.direction === '2') {
        iconPath = "../../static/4.png";
      } else if (item.direction === '3') {
        iconPath = "../../static/13.png";
      }
      return {
        ...item,
        width: 22,
        height: 30,
        iconPath,
        callout: {
          content: item.siteName,
          textAlign: "center",
          bgColor: "#fff",
          padding: "8",
          color: "#1890FF",
        }
      }
    })
    that.setData({ markers })
  }
})