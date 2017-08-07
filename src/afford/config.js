import axios from 'axios'
import qs from 'qs'


//axios配置
axios.defaults.timeout = 8000
// axios.defaults.baseURL = '/v3'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: 'http://new.dx2.me/v3',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

//axios拦截器request使用，//对post请求参数使用qs序列化
instance.interceptors.request.use((config) => {
  if (config.methods === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config;
}, (error) => {
  //全局发送toast("错误的传参")
  return Promise.reject(error)
})
/**
 axios拦截器使用，对请求结果response处理
 Response Schema
 The response for a request contains the following information.
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
*/
instance.interceptors.response.use((response) => {
  if (response.status !== 200) {
    return Promise.reject(response)
  }
  // console.log('获取response的数据:' + JSON.stringify(response.config))
  if (response.status === 401) { //token过期处理
    //模拟refresh token
    fecth({
        "act": "normal.live.info"
      })
      .then((resolve) => {
        console.log('模拟token过期请求' + resolve)
        return (resolve)
      }).catch((reject) => {
        console.log('模拟token过期刷新失败后' + reject)
        return reject;
      })
  }
  return (response.data)
}, (error) => {
  //全局发送toast("网络异常")
  return Promise.reject(error)
})

export default instance
