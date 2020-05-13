// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment: (state, ss) => {
      const obj = state
      obj.count += 1
      console.log(ss)
    },
    decrement: state => {
      const obj = state
      obj.count -= 1
    }
  },
  actions: {
    async getTodos (context) {

      // console.log(Math.floor(Math.random()*10));
      // let kk = {
      //   aa: 1,
      //   bb: 2
      // };
      // await setInterval(res => {
      //   kk.aa++
      //   context.commit("increment", kk)
      // }, 1000)
    }
  }
})

export default store
