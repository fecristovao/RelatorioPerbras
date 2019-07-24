<template>
    <div>
        {{ medicao }}
    <table :class="classe">
        <thead>
                    <th>Data</th>
                    <th>Nº RDO</th>
                    <th>SST</th>
                    <th>Poço</th>
                    <th>Sonda</th>
                    <th>Nº de Série</th>
                    <th>Gerência</th>

                </thead>
                <tbody>
                    <tr v-for="(item,i) in medicao" :class="{'impar': i%2}">
                        <td>{{ item.data }}</td>
                        <td>{{ item.num }}</td>
                        <td class="azul">{{ item.sst }}</td>
                        <td class="azul">{{ item.poco }}</td>
                        <td class="azul">{{ item.sonda }}</td>
                        <td class="azul">{{ item.serie }}</td>
                        <td>{{ item.gerencia }}</td>
                    </tr>
                </tbody>
    </table>
    </div>
</template>
<script>
   export default {
       name: 'TabelaMedicao',
       props: {
            classe: {
                type: String,
                required: false
            },
            medicao: {
                
                required: true
            }
        }
   }
</script>