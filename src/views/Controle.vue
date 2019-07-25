<template>
    <div id="controle" class="row">
        <Tabela classe="centered highlight hide-on-small-only tooltipped" :controle="controle"></Tabela>
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
    
    async mounted() {
        await axios.get(this.$store.getters.controleURL).then(resposta => {
            this.controle = resposta.data
        }) 
    }
}
</script>

