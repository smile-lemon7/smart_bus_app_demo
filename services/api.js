import { request } from '../utils/request.js';

const query_site_info = ({ cb }) => {
  request({
    url: '/api/getlocation/', 
    method: 'GET',
    cb
  });
}
const query_bus_info = ({ data, cb }) => {
  request({
    url: '/api/buslocation/',
    data,
    method: 'POST',
    cb
  });
}
const query_currentSite = ({ data, cb }) => {
  request({
    url: '/api/recentstation/',
    data,
    method: 'POST',
    cb
  });
}



module.exports = {
  query_site_info,
  query_bus_info,
  query_currentSite,
}