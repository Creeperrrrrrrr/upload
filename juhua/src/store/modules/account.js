import Vue from 'vue'
// 当前为个人信息 的 数据  
export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    setToken (state, val) {
      state.token = val
    },
  }
}
