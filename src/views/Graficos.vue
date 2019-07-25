<template>
    <div>
        View: Graficos
        <br>
        Mes: {{ $route.params.mes }}
        <br>
        Contrato: {{ $route.params.contrato }}

        <br>
        <Projecao></Projecao>
    </div>
</template>

<script>
import Projecao from '@/components/GraficoProjecao.vue'
export default {
    components: {Projecao},
    data() {
        return {

        }
    }
}
</script>

