import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    sub:''
  },
  mutations:{
    setSub(state, v){
      state.sub = v
    }
  },
  actions:{}
})

export default store