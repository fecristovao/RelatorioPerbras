<template>
   <div id="app">
      <div class="navbar-fixed">
         <nav>
            <div id="head-nav" class="nav-wrapper">
               <a href="javascript:void(0);"><img src="imgs/logo.gif" alt=""></a>
               <ul class="right hide-on-small-only">
                  <li :class="{active: $router.currentRoute.name == 'espelho' ?  true : false}">
                     <router-link :to="{ name: 'espelho', params: $router.params }">Espelho</router-link>
                  </li>
                  <li :class="{active: $router.currentRoute.name == 'medicao' ?  true : false}">
                     <router-link :to="{ name: 'medicao', params: $router.params }">Medicao</router-link>
                  </li>
                  <li :class="{active: $router.currentRoute.name == 'controle' ?  true : false}">
                     <router-link :to="{ name: 'controle', params: $router.params }">Controle</router-link>
                  </li>
                  <li  :class="{active: $router.currentRoute.name == 'graficos' ?  true : false}">
                     <router-link :to="{ name: 'graficos', params: $router.params }">Graficos</router-link>
                  </li>
               </ul>
               <a href="#" data-target="slide-out" class="sidenav-trigger right hide-on-med-and-up"><i class="material-icons">menu</i></a>
            </div>
         </nav>
      </div>
      <ul id="slide-out" class="sidenav">
         <li>
            <div class="user-view">
               <img src="imgs/logo.gif">
            </div>
         </li>
         <div class="divider"></div>
         <li :class="{active: $router.currentRoute.name == 'espelho' ?  true : false, 'sidenav-close':true }">
            <router-link :to="{ name: 'espelho', params: $router.params }">Espelho</router-link>
         </li>
         <li :class="{active: $router.currentRoute.name == 'medicao' ?  true : false, 'sidenav-close':true}">
            <router-link :to="{ name: 'medicao', params: $router.params }">Medicao</router-link>
         </li>
         <li :class="{active: $router.currentRoute.name == 'controle' ?  true : false, 'sidenav-close':true}">
            <router-link :to="{ name: 'controle', params: $router.params }">Controle</router-link>
         </li>
         <li :class="{active: $router.currentRoute.name == 'graficos' ?  true : false, 'sidenav-close':true}">
            <router-link :to="{ name: 'graficos', params: $router.params }">Graficos</router-link>
         </li>
      </ul>
      <router-view/>
   </div>
</template>
<script>
   import M from 'materialize-css'
   export default {
   
     methods: {
   
     },
     
     mounted() {
      
       var elems = document.querySelectorAll('.sidenav');
       var instances = M.Sidenav.init(elems, {});      
     },

     created() {
        document.title = "Relatório do Mês de "+this.$route.params.mes

      /*
         Pega as configurações

         axios.get(urls)...
      */
     }
   }
</script>
<style></style>