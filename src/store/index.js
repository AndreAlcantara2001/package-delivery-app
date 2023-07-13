import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userRole: null,
    userNotifications: [],
  },
  getters: {

  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role;
    },

  setUserNotifications(state, { role, notifications}){
    state.userNotifications = [{ role, notifications}];
  }

  },
  actions: {

  },
});
