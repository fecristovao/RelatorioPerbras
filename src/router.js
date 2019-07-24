import Vue from 'vue'
import Router from 'vue-router'
import Relatorio from './views/Relatorio.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mes/:mes/contrato/:contrato',
      name: 'Relatorio',
      component: Relatorio
    }
  ]
})
