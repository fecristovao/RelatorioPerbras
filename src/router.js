import Vue from 'vue'
import Router from 'vue-router'
import Espelho from './views/Espelho.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/espelho/:id/:contrato',
      name: 'espelho',
      component: Espelho
    }
  ]
})
