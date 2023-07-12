import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser:{},
    isLogin: false,
  },
  getters: {
  },
  mutations: {
    setLoginUser(state, user){
      sessionStorage.setItem("isLogin", true);
      state.loginUser = user;
      state.isLogin = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
