<template>
	<div>
		{{ x }}
		<br>
		{{ diario }}
		<canvas id="graficoProjecao" ref="myChart"></canvas>
	</div>
</template>
<script>
    // Importa as bibliotecas
    import Chart from 'chart.js'
	import Monetario from '@/mixins/Monetario.js'
	import Graficos from '@/mixins/Graficos.js'
	import {det, lusolve } from 'mathjs'
	
	export default {
	    name: 'GraficoProjecao',
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
	            fator: 1.0462,
	            azul: "rgb(54, 162, 235)",
	            amarelo: "rgb(255, 205, 86)",
	            vermelho: "rgb(255, 99, 132)", 
	            verde: "rgb(75, 192, 192)",
                roxo: "rgb(153, 102, 255)",
                mes: ""
	        }
	    },
	    watch: {
	        dados(val) {
	            this.dadosProcessados = this.dadosGrafico(val)	            
	            this.criaGrafico()
	        }
	    },
	    computed: {
			x() {
				return this.dadosProcessados.x
			},
			
			dias() {
				return this.dadosProcessados.dias
			},
			
			diario() {
				return this.dadosProcessados.diario
			},
			
			acumulado() {
				return this.dadosProcessados.acumulado
			},
			
			bruto() {
				return this.dadosProcessados.bruto
			},

	        n() {
	            var i;
	            var total = 0.0
	            for(i=0;i<this.x.length;i++) {
	                if(this.diario[i] > 0) {
	                    total++
	                }
	            }
	            return total
	        },
	
	        lsolve() {
	            var x2 = this.Xn(2)
	            var x1 = this.Xn(1)
	            var xiyi = this.XnYn(1,1)
	            var yi = this.Yn(1)
	
	            return det([[x2, x1], [x1, this.n]]) != 0 ? lusolve([[x2, x1], [x1, this.n]], [xiyi, yi]) : null
	        },
	
	        psolve() {
	            var x4 = this.Xn(4)
	            var x3 = this.Xn(3)
	            var x2 = this.Xn(2)
	            var x1 = this.Xn(1)
	            var x2yi = this.XnYn(2,1)
	            var xiyi = this.XnYn(1,1)
	            var yi = this.Yn(1)
	            return det([[x4,x3,x2], [x3,x2,x1], [x2,x1,this.n]]) !=0 ? lusolve([[x4,x3,x2], [x3,x2,x1], [x2,x1,this.n]], [x2yi, xiyi, yi]) : null
	        },
	
	        linear() {
	            var i
	            var linear = []
	            for(i=0;i<this.x.length;i++) {
	                linear[i] = this.x[i]*this.lsolve[0][0] + this.lsolve[1][0]
	            }
	            return linear
	        },
	        
	        polinomial() {
	            var i
	            var polinomial = []
	            for(i=0;i<this.x.length;i++) {
	                polinomial[i] = Math.pow(this.x[i],2)*this.psolve[0][0] + this.x[i]*this.psolve[1][0] + this.psolve[0][0]
	            }
	            return polinomial
	        },
	
	        media() {
	            var i
	            var media = []
	            for(i=0;i<this.x.length;i++) {
	                media[i] = (this.polinomial[i] + this.linear[i])/2
	            }
	
	            return media
	        },
	
	        diaMedio() {
	            var i
	            var media = 0.0
	            var medio = []
	            var fator = this.fator
	            for(i=0;i<this.diario.length;i++) {
	                media += this.diario[i]
	                
	            }
	            
	            media = media/this.n
	            
	            if(this.diario[0] == 0) {
	                medio[0] = media*fator
	            } else {
	                medio[0] = this.bruto[0]*fator
	            }
	
	            
	
	            for(i=1;i<this.x.length;i++) {
	               if(this.diario[i] == 0) {
	                    medio[i] = media*fator
	                } else {
	                    medio[i] = this.diario[i]*fator
	                } 
	
	                medio[i] += medio[i-1]
	            }
	            return medio
	        },
	
	        dataset() {
	            var data = []
	            if(this.psolve && this.lsolve) {
	                data = [{
	                 type: 'line',
	                 label: 'Projeção Linear',
	                 borderColor: this.azul,
	                 backgroundColor: this.azul,
	                 borderWidth: 2,
	                 fill: false,
	                 data: this.linear
	             },{
	                 type: 'line',
	                 label: 'Projeção Polinomial',
	                 borderColor: this.amarelo,
	                 backgroundColor: this.amarelo,
	                 borderWidth: 2,
	                 fill: false,
	                 data: this.polinomial
	             },{
	                 type: 'line',
	                 label: 'Projeção Media',
	                 borderColor: this.verde,
	                 backgroundColor: this.verde,
	                 borderWidth: 2,
	                 fill: false,
	                 data: this.media
	             }]
	            } else if(this.psolve) {
	                data = [{
	                 type: 'line',
	                 label: 'Projeção Polinomial',
	                 borderColor: this.amarelo,
	                 backgroundColor: this.amarelo,
	                 borderWidth: 2,
	                 fill: false,
	                 data: this.polinomial
	                }]
	            } else if(lsolve) {
	                data = [{
	                 type: 'line',
	                 label: 'Projeção Linear',
	                 borderColor: this.azul,
	                 backgroundColor: this.azul,
	                 borderWidth: 2,
	                 fill: false,
	                 data: this.linear
	                }]
	            }
	
	            data.push({
	                 type: 'line',
	                 label: 'Projeção Dia Médio',
	                 borderColor: this.roxo,
	                 backgroundColor: this.roxo,
	                 borderWidth: 2,
	                 fill: false,
	                 data: this.diaMedio
	             })
	
	             data.push( {
	                 type: 'bar',
	                 label: 'Faturado Bruto',
	                 backgroundColor: this.vermelho,
	                 data: this.bruto,
	                 borderColor: 'white',
	                 borderWidth: 2
	             })
	
	             return data
	        }
	    },
	    methods: {
	        Xn(grau) {
	            var i
	            var total = 0.0
	            for(i=0;i<this.x.length;i++) {
	                if(this.bruto[i] > 0) {
	                    total += Math.pow(this.x[i], grau)
	                }
	            }
	            return total
	        },
	
	        Yn(grau) {
	            var i
	            var total = 0.0
	            for(i=0;i<this.bruto.length;i++) {
	                total += Math.pow(this.bruto[i], grau)
	            }
	            return total
	        },
	
	        XnYn(g1, g2) {
	            var i
	            var total = 0.0
	            for(i=0;i<this.bruto.length;i++) {
	                total += Math.pow(this.x[i],g1)*Math.pow(this.bruto[i], g2)
	            }
	            return total
	        },
	
	        criaGrafico() {
	            var vm = this
	            var chartData = {
	         // Eixo X
	         labels: this.x.map((k,i) => {return i+1}),
	         // Dataset
	         datasets: this.dataset
	
	     };
	
	           new Chart(document.getElementById('graficoProjecao'), {
	             type: 'bar',
	             data: chartData,
	             options: {
	                 responsive: true,
	                 title: {
	                     display: true,
	                     text: 'Projeção do Mês de Junho (Com Reajuste)'
	                 },
	                 tooltips: {
	                     mode: 'index',
	                     intersect: false,
	                     callbacks: {
	            label: function(tooltipItem, data) {
	                return "R$ " + vm.FloatToReais(tooltipItem.yLabel); }, }, 
	                 },
	                 scales: {
	                     yAxes: [{
	                         ticks: {
	                             // Include a dollar sign in the ticks
	                             callback: function(value, index, values) {
	                                 return 'R$ ' + vm.FloatToReais(value);
	                             }
	                         },
	                     }]
	                 },
	                 scaleLabel:
	                     function(label){return "R$ " + vm.FloatToReais(label)}
	             }
	         });
	        }
	    },
	    mounted() {
	       
	    }
	}
</script>
<style scoped>
	div {
	width: 75%;
	}
</style>

