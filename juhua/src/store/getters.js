const getters = {
    // 动态路由的数据 
    addRouters: state =>{
      return state.asyncRouter.addRouters
    },
    physicalListData: state => state.data.physicalListData
  }
  
  export default getters
  