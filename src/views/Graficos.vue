<template>
    <div id="graficos">
        <div class="row">
            <div class="col offset-l1 s12 m10 offset-m1">
                <Projecao :dados="dados"></Projecao>
            </div>
            <div class="show-on-medium-and-up row" style="margin-bottom: 5% !important;"></div>
            <div class="col s12 m10 offset-m1"> 
                <Diario :dados="dados"></Diario>
            </div>
        </div>
        
       
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
        window.scrollTo(0,0);

    }
}
</script>

<style scoped>
    .grafico {
        
    }
</style>


