import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/login'
import BaiWang from '@/views/BaiWang/BaiWang'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: ' 登录',
      component: Login
    },
    {
      path: '/main',
      name: '百旺模拟器',
      component: BaiWang
    },
  ]
})
