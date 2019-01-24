var bmap = require('../../libs/bmap-wx.js');
import { host } from '../../constants.js';
let wxMarkerData = [];
Page({
  // points: [
  //   { latitude: '31.262335', longitude: '121.527' },
  //   { latitude: '31.264774', longitude: '121.533504' },
  //   { latitude: '31.263788', longitude: '121.519621' },
  //   { latitude: '31.265950', longitude: '121.523940' },
  //   { latitude: '31.266428', longitude: '121.525977' },
  //   { latitude: '31.266786', longitude: '121.522479' }
  // ],
  data: {
    weatherData: {},
    // latitude: '31.261531',
    // longitude: '121.385880',
    latitude: '',
    longitude: '',
    markers: [{
      id: 1,
      name: '榆林路',
      latitude: '31.262335',
      longitude: '121.527',
      // direction: '3',
    }, {
      id: 2,
      name: '江浦路',
      latitude: '31.264774',
      longitude: '121.533504',
      // direction: '2',
    }, {
      id: 3,
      name: '大连路',
      latitude: '31.263788',
      longitude: '121.519621',
      // direction: '1',
    }],
    bus_markers: [{
      id: 4,
      name: '公交01',
      latitude: '31.205167',
      longitude: '121.383133',
      direction: '1',
    },
    {
      id: 5,
      name: '公交02',
      latitude: '31.220435',
      longitude: '121.316528',
      direction: '2',
    },
    {
      id: 6,
      name: '公交03',
      latitude: '31.201056',
      longitude: '121.279449',
      direction: '1',
    }],
    // polyline: [{
    //   points: [
    //     {
    //       longitude: 121.519621,
    //       latitude: 31.263788
    //     },
    //     {
    //       longitude: 121.527,
    //       latitude: 31.262335
    //     },
    //     {
    //       longitude: 121.533504,
    //       latitude: 31.264774
    //     }
    //   ],
    //   color: '#FF0000DD',
    //   width: 2,
    //   dottedLine: true
    // }],
    // controls: [{
    //   id: 1,
    //   iconPath: '/static/13.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 20,
    //     height: 20
    //   },
    //   clickable: true
    // }]
  },
  onNotice() {
    wx.navigateTo({
      url: '../detail/detail?id=2'
    })
  },
  markertap(e) {
    console.log(e.markerId)
  }, 
  // showSearchInfo: function (data, id) {
  //   var that = this;
  //   data = data.filter( item => { return item.id === id})
  //   // console.log(data[0].siteName)
  //   that.setData({
  //     selectSite: {
  //       siteName: '地址：' + data[0].siteName + '\n',
  //     }
  //   });
  // },
  onLoad: function () {
    let that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'kQDDeY1AnK9vZ6TaEBxGa8Oa0ABokwQH'
    });
    var fail = function (data) {
      console.log(data)
    };
    var queryWetherSuccess = function(data) {
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

    wx.getLocation({
      type: 'gcj02',
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        wx.setStorage({
          key: 'user_location',
          data: JSON.stringify({ latitude: res.latitude, longitude: res.longitude })
        })
      },
      fail,
    })

    wx.request({
      url: `${host}/api/getlocation/`,
      data: {},
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res.data)
        // that.setData({
        //   markers: res.data,
        // })
        //处理markers
        let markers = res.data.map(item => {
          let iconPath = '';
          // if (item.direction === '2') {
          //   iconPath = "../../static/4.png";
          // } else if (item.direction === '3') {
          //   iconPath = "../../static/13.png";
          // }
          return {
            ...item,
            width: 22,
            height: 30,
            iconPath,
            callout: {
              content: item.name,
              textAlign: "center",
              bgColor: "#fff",
              padding: "8",
              color: "#1890FF",
              display: "BYCLICK",
            }
          }
        })
        let bus_markers = that.data.bus_markers.map(item => {
          let iconPath = '';
          if (item.direction === '2') {
            iconPath = "../../static/position_red.png";
          } else {
            iconPath = "../../static/position_red.png";
          }
          return {
            ...item,
            width: 22,
            height: 30,
            iconPath,
            callout: {
              content: item.name,
              textAlign: "center",
              bgColor: "#fff",
              padding: "8",
              color: "#1890FF",
              display: "BYCLICK",
            }
          }
        })
        that.setData({ markers: [...markers, ...bus_markers] })
    // that.setData({ markers})
      },
      fail(err) {
        console.log(err)
      }
    })

    
  }
})