<template>
    <div>
        <Calculos :dados="dados"></Calculos>
    </div>
</template>

<script>

import Calculos from '@/components/Calculos.vue'
export default {
    name: 'GraficoProjecao',
    components: {Calculos},
    props: {
        dados: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            
        }
    },
    
}
</script>
