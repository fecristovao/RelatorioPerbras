import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: {
      espelho: "http://localhost:3000/categorias",
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    espelhoURL(state) {
      return state.config['espelho']
    }
  }
})
