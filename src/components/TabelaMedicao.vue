<template>
   <div>
      <table :class="classe">
         <thead>
            <th>Data</th>
            <th>Nº RDO</th>
            <th>SST</th>
            <th>Poço</th>
            <th>Sonda</th>
            <th>Nº de Série</th>
            <th>Gerência</th>
            <th>Indice</th>
            <th>Qtd</th>
            <th>Preço</th>
            <th>Serviço</th>
            <th>Total</th>
         </thead>
         <tbody>
            <tr v-for="(item,i) in medicao">
               <td>{{ item.data }}</td>
               <td>{{ item.num }}</td>
               <td class="azul">{{ item.sst }}</td>
               <td class="azul">{{ item.poco }}</td>
               <td class="azul">{{ item.sonda }}</td>
               <td class="azul">{{ item.serie }}</td>
               <td>{{ item.gerencia }}</td>
               <td>{{ item.indice }}</td>
               <td class="azul">{{ item.qtd }}</td>
               <td>R$ {{ FloatToReais(item.preco.replace(',', '.')) }}</td>
               <td>{{ item.servico }}</td>
               <td>R$ {{ FloatToReais(item.total.replace(',', '.')) }}</td>
            </tr>
            <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td><b>R$ {{ FloatToReais(total) }}</b></td>
            </tr>
         </tbody>
      </table>
   </div>
</template>
<script>
   import Monetario from '@/mixins/Monetario.js'
      export default {
          name: 'TabelaMedicao',
          mixins: [Monetario],
          props: {
               classe: {
                   type: String,
                   required: false
               },
               medicao: {
                   type: Array,
                   required: true
               }
           },
           computed: {
               total() {
                   var i;
                   var total = 0.0;
                   
                   for(i=0;i<this.medicao.length;i++) {
                       total += this.ReaisToFloat(this.medicao[i].total)
                   }
                   return total
               }
           }
      }
</script>

<style scoped>
   th {
      text-align: center;
   }
</style>
