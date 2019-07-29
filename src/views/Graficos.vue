<template>
    <div>
        View: Graficos
        <br>
        Mes: {{ $route.params.mes }}
        <br>
        Contrato: {{ $route.params.contrato }}

        <br>
        <!--<Projecao :dados="dados"></Projecao>-->
       <Diario :dados="dados"></Diario>
    </div>
</template>

<script>
import Projecao from '@/components/GraficoProjecao.vue'
import Diario from '@/components/GraficoDiario.vue'
import axios from 'axios'
export default {
    components: {Projecao, Diario},
    data() {
        return {
            dados: []
        }
    },
    mounted() {
        axios.get(this.$store.getters.graficoURL).then(resposta => {
            this.dados = resposta.data
        })
    }
}
</script>

