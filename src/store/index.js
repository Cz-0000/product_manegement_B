import Vue from 'vue';
import Vuex from 'vuex';
import { setUserCookie, getUserCookie, removeUserCookie } from '../util/uerCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    user: getUserCookie(),
    menuRoutes: [],
  },
  mutations: {
    changeCollapsed (state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo (state, userInfo) {
      state.user = userInfo;
    },
    logout (state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      }
    },
    changeMenuRoutes (state, routes) {
      state.menuRoutes = routes;
    }
  },
  actions: {
    changeCollapsed ({ commit }) {
      commit('changeCollapsed')
    },
    setUserInfo ({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setUserCookie(userInfo);
    },
    logout ({ commit }) {
      commit('logout');
      removeUserCookie();
    },
    changeMenuRoutes ({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    }
  },
  modules: {
  },
});
