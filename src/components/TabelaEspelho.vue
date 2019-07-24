<template>
   <div>
      <table :class="classe">
         <thead>
            <tr>
               <th>Indice</th>
               <th>Serviço</th>
               <th>Preço</th>
               <th>Qtd</th>
               <th>Total</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(item,i) in categoria.itens">
               <td>{{ item.indice }}</td>
               <td>{{ item.nome }}</td>
               <td>R$ {{ FloatToReais(item.preco) }}</td>
               <td>{{ item.quantidade }}</td>
               <td>R$ {{FloatToReais(parseFloat(item.preco.replace(',','.')) * parseFloat(item.quantidade.replace(',', '.'))) }}</td>
            </tr>
            <tr>
               <td></td>
               <td></td>
               <td></td>
               <td><b>{{ qtdTotal }}</b></td>
               <td><b>R$ {{ precoTotal }}</b></td>
            </tr>
         </tbody>
      </table>
   </div>
</template>
<script>
   import Monetario from '@/mixins/Monetario'
   export default {
       name: "TabelaEspelho",
       mixins: [Monetario],
       props: {
           classe: {
               type: String,
               required: false
           },
           categoria: {
               type: Object,
               required: true
           }
       },
   
       computed: {
           qtdTotal() {
               var qtd = 0.0;
               var i;
               for(i=0;i<this.categoria.itens.length;i++) {
                   qtd += this.ReaisToFloat(this.categoria.itens[i].quantidade)
               }
               return qtd.toString().replace('.', ',')
           },
   
           precoTotal() {
               var total = 0.0;
               var i;
               for(i=0;i<this.categoria.itens.length;i++) {
                   total += parseFloat(this.categoria.itens[i].total.replace(',','.'))
               }
               return this.FloatToReais(total)
           }
       }
   }
</script>