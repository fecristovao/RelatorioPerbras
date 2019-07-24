<template>
    <div id="espelho" class="row">
        <div class="categoria" v-for="(cat,k) in categorias" v-if="cat.itens.length > 0" :key="k">
            <span class="table-titulo" @click="cat.ativo = !cat.ativo"><b>{{ cat.categoria }} </b><a class="tablehide">{{ cat.ativo ? "-" : "+" }} </a></span>
            <Tabela classe="responsive-table striped hide-on-large-only" :categoria="cat" v-show="cat.ativo"></Tabela>
            <Tabela classe="centered striped hide-on-med-and-down" :categoria="cat" v-show="cat.ativo"></Tabela>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Tabela from '@/components/TabelaEspelho.vue'
export default {
    components: {
        Tabela
    },
    data() {
        return {
            categorias: []
        }
    },

    async mounted() {
        axios.get(this.$store.getters.espelhoURL).then(resposta => {
            this.categorias = resposta.data
        })
    }
}
</script>

