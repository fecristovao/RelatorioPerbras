<template>
    <div id="controle" class="row">
        <Tabela classe="desktop" :controle="controle" v-if="controle"></Tabela>
        <Tabela classe="mobile" :controle="controle" v-if="controle"></Tabela>
    </div>
</template>

<script>
import axios from 'axios'
import Tabela from '@/components/TabelaControle.vue'
export default {
    components: {Tabela},

    data() {
        return {
            controle: []
        }
    },
   mounted() {
        
      axios.get(this.$store.getters.controleURL).then(resposta => {
        this.controle = resposta.data
        console.log(resposta)
      }) 
        var elems = document.querySelectorAll('.tooltipped')
        var instances = M.Tooltip.init(elems, {})
    }
    
}
</script>

