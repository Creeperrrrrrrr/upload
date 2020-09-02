// 登录页面的请求接口
import axios from '@/utils/request'

export function login (params) {
  return axios({
    url: '/admin/login',
    method: 'post',
    params
  })
}