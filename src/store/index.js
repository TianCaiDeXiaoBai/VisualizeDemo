import { createStore } from "vuex";

const store = createStore({
  state: {
    userInfo: {
      name: "",
    },
  },
  mutations: {
    getUserInfo(state, name) {
      state.userInfo.name = name;
    },
  },
  actions: {
    asyncGetUserInfo({ commit }) {
      setTimeout(() => {
        commit("getUserInfo", +new Date() + "action");
      }, 2000);
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
  },
});

export default store;
