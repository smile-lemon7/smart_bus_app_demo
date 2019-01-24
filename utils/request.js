import { host } from '../constants.js';

const request = ({ url, data, method, cb }) => {
  wx.request({
    url: host + url,
    data,
    method,
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log(res.data)
      cb( res.data )
    },
    fail(err) {
      console.log(err)
    }
  })
}

module.exports = {
  request
}
