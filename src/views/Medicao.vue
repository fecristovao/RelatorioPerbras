<template>
    <div id="medicao" class="row">
        <Tabela classe="centered striped hide-on-med-and-down" :medicao="medicao"></Tabela>
        <Tabela classe="responsive-table striped hide-on-large-only" :medicao="medicao"></Tabela>
    </div>
</template>

<script>

import Tabela from '@/components/TabelaMedicao.vue';
import axios from 'axios';
export default {
    components: {Tabela},
    data() {
        return {
            medicao: []
        }
    },

    async mounted() {
        axios.get(this.$store.getters.medicaoURL).then(resposta => {
            this.medicao = resposta.data
        })
    }
}
</script>

