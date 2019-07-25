<template>
    <div id="controle" class="row">
        <Tabela classe="desktop" :controle="$store.getters.controle"></Tabela>
        <Tabela classe="mobile" :controle="$store.getters.controle"></Tabela>
    </div>
</template>

<script>
import axios from 'axios'
import Tabela from '@/components/TabelaControle.vue'
export default {
    components: {Tabela},

    data() {
        return {
            
        }
    },
    
}
</script>

