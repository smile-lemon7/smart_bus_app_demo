Component({
  /**
   * 组件的属性列表
   */
  properties: {
    siteList: {
      type: Array,
      bus: {
        type: Object
      }
    },
    busList: {
      type: Array
    },
    nearest: {
      type: Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false,
    siteInfo: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSiteHandle(e) {
      let { siteInfo } = e.currentTarget.dataset;
      // console.log( siteInfo )
      if (siteInfo.hasBus ) {
        if (siteInfo.hasBus === "arrive") {
          siteInfo.busInfo.time = "车辆已到站";
        }
        siteInfo.busInfo.time = `${siteInfo.busInfo.time}分钟`;
        siteInfo.busInfo.distance = `${siteInfo.busInfo.distance}米`;
      }else {
        siteInfo.busInfo = { time: '检测中', name: '检测中', distance: '检测中'};
      }
      this.setData({
        siteInfo,
        showModal: true,
      })
    },
    modalCancel(e) {
      // 这里面处理点击取消按钮业务逻辑
      console.log('点击了取消')
    },
    modalConfirm(e) {
      // 这里面处理点击确定按钮业务逻辑
      console.log('点击了确定')
    }
  }
})

