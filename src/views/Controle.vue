<template>
    <div id="controle" class="row">
        <Tabela classe="centered highlight hide-on-small-only tooltipped" :controle="$store.getters.controle"></Tabela>
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

