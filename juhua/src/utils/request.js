import axios from 'axios'
import Vue from 'vue'
import { notification, modal } from 'ant-design-vue'
import moment from 'moment'
import { setTimeout } from 'timers'
import store from '../store'
moment.locale('zh-cn')
let host
host = "http://192.168.11.14:8500";
// host = "http://10.10.22.222:8002";
if (host) {
  axios.defaults.baseURL = host
}
// 拦截请求
axios.interceptors.request.use((config) => {
  // set auth值
  console.log(store)
  const token=store.state.account.token
  if (token) {
    config.headers.Authorization =`Bearer ${token}` 
    config.headers.Type = 'manage'
  }
  if(config.method == 'post'){
    console.log(config.params)
    config.data = config.params
    config.params = {};
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 拦截响应
axios.interceptors.response.use((config) => {
  return config
}, (error) => {
  if (error.response) {
    let errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.msg
    switch (error.response.data.status_code) {
      case 404:
        notification.error({
          message: '系统提示',
          description: '很抱歉，资源未找到',
          duration: 4
        })
        break
      case 403:
      case 401:
        notification.warn({
          message: '系统提示',
          description: '很抱歉，您无法访问该资源，可能是因为没有相应权限或者登录已失效',
          duration: 4
        })
        // setTimeout(() => {
        //   localStorage.clear()
        //   location.reload()
        // }, 2500)
        break
      default:
        notification.error({
          message: '系统提示',
          description: errorMessage,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
})

export default axios
