import Vue from 'vue';
import Vuex from 'vuex';
import { setCookies, getCookies, removeCookies } from '@/utils/userCookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    user: getCookies(),
    menuRouters: [],
  },
  mutations: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    loginout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
      state.menuRouters = [];
    },
    changemenuRouters(state, routers) {
      state.menuRouters = routers;
    },
  },
  actions: {
    toggleCollapsed(context) {
      context.commit('toggleCollapsed');
    },
    setUserInfo(context, userInfo) {
      context.commit('setUserInfo', userInfo);
      setCookies(userInfo);
    },
    loginout(context) {
      context.commit('loginout');
      removeCookies();
    },
    changemenuRouters({ commit }, routers) {
      commit('changemenuRouters', routers);
    },
  },
  modules: {
  },
});
