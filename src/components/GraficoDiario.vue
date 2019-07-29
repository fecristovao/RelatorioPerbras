<template>
    <div class="grafico">
       
        <canvas id="graficoDiario" ref="myChart"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js'
	import Monetario from '@/mixins/Monetario.js'
	import Graficos from '@/mixins/Graficos.js'
export default {
    name: 'GraficoDiario',
    mixins: [Monetario, Graficos],
    props: {
        dados: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            dadosProcessados: {},
            azul: "rgb(54, 162, 235)",
	        amarelo: "rgb(255, 205, 86)",
	        vermelho: "rgb(255, 99, 132)", 
	        verde: "rgb(75, 192, 192)",
            roxo: "rgb(153, 102, 255)",
        }
    }, 
    watch: {
        dados(val) {
            //this.fator = val.fator
            this.dadosProcessados = this.dadosGrafico(val)
            this.criaGrafico() 
        }
    }, 
    computed: {
        x() {
            var x = this.dadosProcessados.dias.slice()
            x.push("Média")
            x.push("Ideal")
            return x
        },

        orcado() {
            var orcado = this.x.map(e => { return this.dadosProcessados.orcado })
            orcado[this.x.length-1] = null
            orcado[this.x.length-2] = null

            return orcado

        },
        fator() {
            return this.dadosProcessados.fator
        },

        diario() {
            var diario = this.dadosProcessados.diario.map(e => { return e * this.fator })
            return diario
        },

        media() {
            var i
            var media = 0.0
            var num = 0
            for(i=0;i<this.diario.length;i++) {
                media += this.diario[i]
                if(this.diario[i] > 0)
                    num++
            }

            media = media/num

            var medArr = []
            for(i=0;i<this.x.length;i++)
                medArr[i] = null
            medArr[this.x.length-2] = media * this.fator
            return medArr
        },

        ideal() {
            var i
            var ideal = []
            for(i=0;i<this.x.length;i++)
                ideal[i] = null
            ideal[this.x.length-1] = this.orcado[0]/(this.x.length-2)
            return ideal
        },

        acumulado() {
            var acumulado = this.dadosProcessados.acumulado
            var i
            var ultimo = acumulado[acumulado.length-1]
            for(i=acumulado.length;i<this.x.length-2;i++) 
                acumulado.push(ultimo)
            return acumulado
        },

        dataset() {
            return [{
            yAxisID: 'y-axis-2',
            type: 'line',
            label: 'Orçado',
            borderColor: "#bc0b17",
            backgroundColor: "#bc0b17",
            borderWidth: 2,
            fill: false,
            data: this.orcado,
            pointRadius: 0,
            borderWidth: 5
        },{
            yAxisID: 'y-axis-2',
            type: 'line',
            label: 'Acumulado',
            borderColor: "#10a303",
            backgroundColor: "#10a303",
            borderWidth: 2,
            fill: false,
            data: this.acumulado,
            pointRadius: 0,
            borderWidth: 5
        },{
        yAxisID: 'y-axis-1',
            type: 'bar',
            label: 'Diário',
            borderColor: "#115edb",
            backgroundColor: "#115edb",
            borderWidth: 2,
            fill: false,
            data: this.diario
        },{
            yAxisID: 'y-axis-1',
            type: 'bar',
            label: 'Média',
            borderColor: "#bc0b17",
            backgroundColor: "#bc0b17",
            borderWidth: 5,
            fill: false,
            data: this.media
        },{
            yAxisID: 'y-axis-1',
            type: 'bar',
            label: 'Ideal',
            borderColor: "#ede907",
            backgroundColor: "#ede907",
            borderWidth: 2,
            fill: false,
            data: this.ideal
        }]
        }

    },
    methods: {
        criaGrafico() {
	            var vm = this
	            var chartData = {
	         // Eixo X
	         labels: this.x,
	         // Dataset
	         datasets: this.dataset
	
	     };
	
	           new Chart(document.getElementById('graficoDiario'), {
	             type: 'bar',
             data: chartData,
             options: {
                 responsive: true,
                 title: {
                     display: true,
                     text: 'Evolução Diária do Mês de Maio (Com reajuste aplicado)'
                 },
                 tooltips: {
                     mode: 'index',
                     intersect: false,
                     
                     callbacks: {
            label: function(tooltipItem, data) {
                if(!isNaN(tooltipItem.yLabel)) {
             return "R$ " + vm.FloatToReais(tooltipItem.yLabel); }}, }, 
                 },
                 scales: {
                     yAxes: [{
                         ticks: {
                             // Include a dollar sign in the ticks
                             callback: function(value, index, values) {
                                 return 'R$ ' + vm.FloatToReais(value);
                             }
                         },
                         id: 'y-axis-1'
                     },
                     {
                         ticks: {
                             // Include a dollar sign in the ticks
                             callback: function(value, index, values) {
                                 return 'R$ ' + vm.FloatToReais(value);
                             }
                         },
                         type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                         display: true,
                         position: 'right',
                         id: 'y-axis-2'
                     }]
                 },
                 scaleLabel:
                 function(label){return "R$ " + vm.FloatToReais(label)}
             }
         });
	        }
    }
}
</script>