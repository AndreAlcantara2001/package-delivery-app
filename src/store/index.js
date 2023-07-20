import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userRole: null,
    userData: null,

  },
  getters: {

  },
  mutations: {

    setUserRole(state, role) {
      state.userRole = role;
    },

    setUserData(state, data){
      state.userData = data;
    }

  },
  actions: {

  },
});
