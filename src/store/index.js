import Vue from 'vue'

import Vuex from 'vuex'

// import state from './state'

// import mutations from './mutation'

Vue.use(Vuex)

// export default new Vuex.Store({
//   state,
//   mutations
// })

export default new Vuex.Store({
  state: {
    // 是否登录的状态，默认为未登录 false
    isLogin: false,
    houseContent: '迩伶贰blog'
  },
  mutations: {
    // 定义一个操作isLogin状态的方法
    storeLogin (state, payload) {
      state.isLogin = payload
    },
    increment (state, result) {
      state.houseContent = result
    }
  }
})
