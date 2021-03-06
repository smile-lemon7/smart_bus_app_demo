Page({
  data: {
    latitude: '',
    longitude: '',
    // mapWidth: "",
    // mapHeight: "100%",
    markers: [{
      id: 1,
      name: '榆林路',
      latitude: '31.262335',
      longitude: '121.527',
      // direction: '3',
    },{
      id: 2,
      name: '江浦路',
      latitude: '31.264774',
      longitude: '121.533504',
      // direction: '2',
    },{
      id: 3,
      name: '大连路',
      latitude: '31.263788',
      longitude: '121.519621',
      // direction: '1',
    }],
    bus_markers: [{
      id: 4,
      name: '公交01',
      latitude: '31.265950',
      longitude: '121.523940',
      direction: '1',
    },
    {
      id: 5,
      name: '公交02',
      latitude: '31.266428',
      longitude: '121.525977',
      direction: '2',
    },
    {
      id: 6,
      name: '公交03',
      latitude: '31.266786',
      longitude: '121.522479',
      direction: '1',
    }],
    polyline: [{
      points: [
        {
        longitude: 121.519621,
        latitude: 31.263788
        }, 
        {
          longitude: 121.527,
          latitude: 31.262335
        },
        {
          longitude: 121.533504,
          latitude: 31.264774
        }
      ],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }],
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
  // regionchange(e) {
  //   console.log(e.type)
  // },
  markertap(e) {
    console.log(e.markerId)
  },
  // controltap(e) {
  //   console.log(e.controlId)
  // },
  onLoad: function () {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
    //处理markers
    let markers = that.data.markers.map(item => {
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
        iconPath = "../../static/4.png";
      } else {
        iconPath = "../../static/13.png";
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
  }
})