import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
  state: {
    config: {
      espelho: "http://localhost:3000/categorias",
      espelhoPrint: "espelho.rule?sys=MDC&mes=10&contrato=1",
      medicao: "http://localhost:3000/medicao",
      controle: "http://127.0.0.1:3000/controle"
    },
    dados: {
      controle: [],
      medicao: [],
      espelho: [],
    }
  },
  mutations: {
    pegarDados(state) {
      axios.get(state.config.controle).then(resposta => {
        state.dados.controle = resposta.data
      }) 

      axios.get(state.config.espelho).then(resposta => {
        state.dados.espelho = resposta.data
      }) 

      axios.get(state.config.medicao).then(resposta => {
        state.dados.medicao = resposta.data
      }) 
    }
  },
  actions: {


  },
  getters: {
    controle(state) {
      return state.dados.controle
    },
    espelho(state) {
      return state.dados.espelho
    },
    medicao(state) {
      return state.dados.medicao
    },
    espelhoURL(state) {
      return state.config['espelho']
    },

    espelhoPrint(state) {
      return state.config['espelhoPrint']
    },

    medicaoURL(state) {
      return state.config['medicao']
    },

    controleURL(state) {
      return state.config['controle']
    }
  }
})
