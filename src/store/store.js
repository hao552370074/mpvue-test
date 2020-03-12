import Vue from "vue"
import Vuex from "vuex"
import store from "./state"
import actions from "./actions"
import mutations from "./mutations"
import getter from "./getter"

Vue.use(Vuex);

export default new Vuex.Store({
  store,
  actions,
  getter,
  mutations
});
