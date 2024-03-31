import { createStore } from "vuex";

export default createStore({
  state: {
    sideBarCollapse : false,
    lightMode : true
  },
  actions: {
  },
  mutations:{
    setSideBarCollapse(state) {
      state.sideBarCollapse = !state.sideBarCollapse
    },
    setLightMode(state) {
      state.lightMode = !state.lightMode
      console.log(state.lightMode)
    }
  },
  getters:{
    getSideBarCollapse(state){
      return state.sideBarCollapse
    },
    getLightMode(state,payload){
      return state.lightMode
    }
  },
  modules: {

  },
});