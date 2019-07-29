import Vue from 'vue'
import Router from 'vue-router'
import Espelho from './views/Espelho.vue'
import Medicao from './views/Medicao.vue'
import Controle from './views/Controle.vue'
import Graficos from './views/Graficos.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/espelho/mes/:mes/contrato/:contrato',
      name: 'espelho',
      component: Espelho
    },
    {
      path: '/medicao/mes/:mes/contrato/:contrato',
      name: 'medicao',
      component: Medicao
    },
    {
      path: '/controle/mes/:mes/contrato/:contrato',
      name: 'controle',
      component: Controle
    },
    {
      path: '/graficos/mes/:mes/contrato/:contrato',
      name: 'graficos',
      component: Graficos
    },
    {
      path: '/mes/:mes/contrato/:contrato',
      name: 'index',
      component: Espelho
    }

  ]
})
