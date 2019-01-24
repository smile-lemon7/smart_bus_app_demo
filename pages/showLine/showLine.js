import { host } from '../../constants.js';
import { request } from '../../utils/request.js';
import { 
  query_site_info, 
  query_bus_info, 
  query_currentSite, 
} from '../../services/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    siteList: [],
    listWidth: '100%',
    busList: [],
    nearest: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading()
    //请求站点信息
    query_site_info({ cb: (data) => {
     that.setData({
       siteList: data,
     })
    } })
    //请求公交车位置信息
    query_bus_info({ data:{}, cb: (data) => {
      console.log( data)
      if( data ) {
        wx.hideLoading();
      }
      let siteList = that.data.siteList;
      siteList.forEach(item => {
        data.forEach(itm => {
          if (item.name === itm.nextstation) {
            if (itm.distance <= 5) {
              item.hasBus = 'arrive'
            } else {
              item.hasBus = 'near';
            }
            item.busInfo = { ...itm, distance: itm.distance.toFixed(2), time: Math.ceil(itm.time)};
          } else {
            item.hasBus = false;
          }
        })
      })
      that.setData({
        siteList: siteList,
      })
    } })

    wx.getStorage({
      key: 'user_location',
      success(res) {
        let { latitude, longitude } = JSON.parse(res.data);
        //请求距离用户最近的站点信息
        query_currentSite({ data: { lngr: longitude, latr: latitude }, cb: (data) => {
          that.setData({ nearest: data })
        } })
      }
    })
    //每隔一分钟刷新一次页面
    // let timer = setInterval(() => {
    //   that.onLoad();
    // },30000) 
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})