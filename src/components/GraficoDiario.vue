<template>
    <div>
        {{ dadosProcessados }}
        kkk {{ diario}}
        <canvas id="diario"></canvas>
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
            fator:  1.0462
        }
    }, 
    watch: {
        dados(val) {
            //this.fator = val.fator
            this.dadosProcessados = this.dadosGrafico(val)
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
            var orcado = this.x.map(e => { return 785000 })
            orcado[this.x.length-1] = null
            orcado[this.x.length-2] = null

            return orcado

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
        }

    } 
}
</script>