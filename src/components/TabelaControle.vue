<template>
    <div>
        <table class="centered highlight hide-on-med-and-down" v-if="classe == 'desktop'">
            <thead>
                    <tr>
                        <th colspan="1">Indice</th>
                        <th colspan="1">Saldo</th>
                        <th colspan="4">Total</th>
                        <th colspan="2">Média</th>
                        <th colspan="2">Distribuição</th>
                        <th colspan="1">Tempo</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>PPU</th>
                        <th>SALDO</th>
                        <th>SALDO R$</th>
                        <th>VALOR</th>

                        <th>PPU</th>
                        <th>VALOR</th>

                        <th>PPU</th>
                        <th>VALOR</th>

                        <th>Meses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in controle" :key="i" class="tooltipped" data-position="bottom" :data-tooltip="item.Nome">
                        <td>{{ item.Indice }}</td>
                        <td>
                            <span class="dot verde" v-if="saldo(item) >= 60"></span>
                            <span class="dot amarelo" v-if="saldo(item) < 60 && item.saldoi >= 40"></span>
                            <span class="dot vermelho" v-if="saldo(item) < 40 && item.saldoi >= 20"></span>
                            <span class="dot cinza" v-if="saldo(item) < 20"></span>
                            {{ saldo(item) }}%
                        </td>
                        <td>{{ item.PPU }}</td>
                        <td>{{ item.Saldo }}</td>
                        <td>R$ {{ FloatToReais(item.SaldoRS) }}</td>
                        <td>{{ FloatToReais(item.Valor) }}</td>
                        <td>{{ FloatToReais(item.MediaPPU) }}</td>
                        <td>{{ FloatToReais(ReaisToFloat(item.MediaValor)) }}</td>
                        <td>{{ FloatToReais(ReaisToFloat(item.DistribuicaoPPU)*100) }} %</td>
                        <td>{{ FloatToReais(ReaisToFloat(item.DistribuicaoValor)*100) }} %</td>
                        <td :class="corMes(item)">
                            {{ meses(item) }}
                        </td>
                    </tr>
                    <tr class="total">
                        <td></td>
                        <td></td>
                        <td>{{ FloatToReais(soma('PPU')) }}</td>
                        <td>{{ FloatToReais(soma('Saldo')) }}</td>
                        <td>R$ {{ FloatToReais(soma('SaldoRS')) }}</td>
                        <td>{{ FloatToReais(soma('Valor')) }}</td>
                        <td>{{ FloatToReais(soma('MediaPPU')) }}</td>
                        <td>{{ FloatToReais(soma('MediaValor')) }}</td>
                        <td>{{ FloatToReais(soma('DistribuicaoPPU')*100) }} %</td>
                        <td>{{ FloatToReais(soma('DistribuicaoValor')*100) }} %</td>
                        <td></td>
                    </tr>
                </tbody>
        </table>

        <table class="responsive-table hide-on-large-only" v-if="classe == 'mobile'">
                <thead>
                    <tr>
                        <th>Indice</th>
                        <th>Saldo</th>
                        <th>PPU Total</th>
                        <th>Saldo Total</th>
                        <th>Saldo R$</th>
                        <th>Valor Total</th>
    
                        <th>Média PPU</th>
                        <th>Média Valor</th>
    
                        <th>Distribuição PPU</th>
                        <th>Distribuição Valor</th>
    
                        <th>Tempo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in controle" :key="i">
                        <td>{{ item.Indice }}</td>
                        <td>
                            <span class="dot verde" v-if="saldo(item) >= 60"></span>
                            <span class="dot amarelo" v-if="saldo(item) < 60 && item.saldoi >= 40"></span>
                            <span class="dot vermelho" v-if="saldo(item) < 40 && item.saldoi >= 20"></span>
                            <span class="dot cinza" v-if="saldo(item) < 20"></span>
                            {{ saldo(item) }}%
                        </td>
                        <td>{{ item.PPU }}</td>
                        <td>{{ item.Saldo }}</td>
                        <td>R$ {{ FloatToReais(item.SaldoRS) }}</td>
                        <td>{{ FloatToReais(item.Valor) }}</td>
                        <td>{{ FloatToReais(item.MediaPPU) }}</td>
                        <td>{{ FloatToReais(ReaisToFloat(item.MediaValor)) }}</td>
                        <td>{{ FloatToReais(ReaisToFloat(item.DistribuicaoPPU)*100) }} %</td>
                        <td>{{ FloatToReais(ReaisToFloat(item.DistribuicaoValor)*100) }} %</td>
                        <td :class="corMes(item)">
                            {{ meses(item) }}
                        </td>
                    </tr>
                    <tr class="total">
                        <td></td>
                        <td></td>
                        <td>{{ FloatToReais(soma('PPU')) }}</td>
                        <td>{{ FloatToReais(soma('Saldo')) }}</td>
                        <td>R$ {{ FloatToReais(soma('SaldoRS')) }}</td>
                        <td>{{ FloatToReais(soma('Valor')) }}</td>
                        <td>{{ FloatToReais(soma('MediaPPU')) }}</td>
                        <td>{{ FloatToReais(soma('MediaValor')) }}</td>
                        <td>{{ FloatToReais(soma('DistribuicaoPPU')*100) }} %</td>
                        <td>{{ FloatToReais(soma('DistribuicaoValor')*100) }} %</td>
                    </tr>
                </tbody>
        </table>
    </div>    
</template>

<script>
import Monetario from "@/mixins/Monetario.js"
import M from 'materialize-css'
export default {
    mixins: [Monetario],
    props: {
        classe: {
            type: String
        },
        controle: {
            type: Array,
            required: true
        }
    },
    methods: {
        soma(campo) {
            var total = 0.0
            var i
            for(i=0;i<this.controle.length;i++) {
                total += this.ReaisToFloat(this.controle[i][campo])
            }
            return total
        },
        saldo(item) {
            var ppu = this.ReaisToFloat(item.PPU)
            var ppuTotal = this.ReaisToFloat(item.PPUTotal)
            if(ppu == 0) {
                return 100
            } else {
                return ((1-(ppu/ppuTotal))*100).toFixed(2)
            }
        },

        meses(item) {
            var mediaPPU = this.ReaisToFloat(item.MediaPPU)
            var saldo = this.ReaisToFloat(item.Saldo)
            if(mediaPPU > 0) {
                return this.FloatToReais(saldo/mediaPPU)
            } else {
                return '-'
            }
        },

        corMes(item) {
            var mes = this.meses(item)
            if(mes == '-') {
                return 'cinza'
            }

            mes = this.ReaisToFloat(mes)
            var divisao = (item.SaldoPrazo/30)/2
            
            if(mes >=0 && mes < divisao) {
                return 'vermelho'
            } else if (mes >= divisao && mes < 2*divisao) {
                return 'amarelo'
            }  else if(mes >= 2*divisao) {
                return 'verde'
            }

        }
    },
    mounted() {
        var elems = document.querySelectorAll('.tooltipped')
        var instances = M.Tooltip.init(elems, {})
    }
}
</script>

<style scoped>
    th {
        text-align: center;
    }

    .bverde {
        background-color: green;
    }

    .total {
        font-weight: bold;
    }
</style>

