<template>
    <div>
        {{ media }}
        <br>
        {{ diaMedio }}
    </div>
</template>

<script>
import Chart from 'chart.js'
import { generateChart } from 'vue-chartjs'
import Monetario from '@/mixins/Monetario.js'
import {det, lusolve } from 'mathjs'

export default {
    name: 'GraficoProjecao',
    mixins: [Monetario],
    props: {
        dados: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            dias: [],
            x: [],
            diario: [],
            acumulado: [],
            bruto: [],
            fator: 1.0462
        }
    },
    watch: {
        dados(val) {
            var i
            var dias = []
            var inicio = new Date(this.dados[0].Inicio+"T00:00:00-03:00")
            var diferenca = this.dados[0].DiferencaDias
            
            for(i=0;i<=diferenca;i++) {
                dias[i] = inicio.getDate()
                inicio.setDate(dias[i]+1)
            }
            this.dias = dias

            var x = [];
            for(i=1;i<=dias.length;i++) {
                x.push(i)
            }
            this.x = x;

            var diario = []
            for(i=0;i<val.length;i++) {
                diario[i] = this.ReaisToFloat(val[i].Diario)
            }
            
            if(val.length < x.length) {
                for(i=val.length;i<x.length;i++) {
                    diario.push(0)
                }
            }
            this.diario = diario

            var acumulado = []
            acumulado[0] = diario[0]

            for(i=1;i<diario.length;i++) {
                var total = 0.0
                var j
                for(j=0;j<=i;j++) {
                    total += diario[j]
                }
                acumulado[i] = total
            }
            this.acumulado = acumulado

            var bruto = []
            for(i=1;i<diario.length;i++)
                bruto[i] = 0;
            for(i=0;i<diario.length;i++) {
                if(diario[i] > 0) {
                    bruto[i] = acumulado[i]
                }
            }
            this.bruto = bruto


        }
    },
    computed: {
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
    }
}
</script>
