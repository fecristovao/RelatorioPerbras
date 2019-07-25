<template>
    <div>
        {{ dias }}
    </div>
</template>

<script>
import Chart from 'chart.js'
import { generateChart } from 'vue-chartjs'
import Monetario from '@/mixins/Monetario.js'

export default {
    name: 'GraficoProjecao',
    mixins: [Monetario],
    data() {
        return {
            dias: []
        }
    },
    methods: {
    },
    computed: {
        dados() {
            return this.$store.getters.grafico
        }
    },
    watch: {
        dados(val) {
            var i
            var inicio = new Date(val[0].Inicio)
            var diferenca = val[0].DiferencaDias
            for(i=0;i<=diferenca;i++) {
                this.dias.push(inicio.getDate()+1);
                inicio.setDate(inicio.getDate()+1)
            }
        }
    }
}
</script>
