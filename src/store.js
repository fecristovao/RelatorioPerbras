import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: {
      espelho: "http://localhost:3000/categorias",
      espelhoPrint: "espelho.rule?sys=MDC&mes=10&contrato=1",
      medicao: "http://localhost:3000/medicao"
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    espelhoURL(state) {
      return state.config['espelho']
    },

    espelhoPrint(state) {
      return state.config['espelhoPrint']
    },

    medicaoURL(state) {
      return state.config['medicao']
    }
  }
})
