export default {
    methods: {
        dadosGrafico(val) {
        var i
        var dados = {}
        var dias = []
        var inicio = new Date(val[0].Inicio+"T00:00:00-03:00")
        var diferenca = val[0].DiferencaDias
        
        dados['orcado'] = this.ReaisToFloat(val[0].Orcado)
        dados['fator'] = val[0].Fator

        for(i=0;i<=diferenca;i++) {
            dias[i] = inicio.getDate()
            inicio.setDate(dias[i]+1)
        }
        dados['dias'] = dias

        var x = [];
        for(i=1;i<=dias.length;i++) {
            x.push(i)
        }
        dados['x'] = x;

        var diario = []
        for(i=0;i<val.length;i++) {
            diario[i] = this.ReaisToFloat(val[i].Diario)
        }
        
        if(val.length < x.length) {
            for(i=val.length;i<x.length;i++) {
                diario.push(0)
            }
        }
        dados['diario'] = diario

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
        dados['acumulado'] = acumulado

        var bruto = []
        for(i=1;i<diario.length;i++)
            bruto[i] = 0;
        for(i=0;i<diario.length;i++) {
            if(diario[i] > 0) {
                bruto[i] = acumulado[i]
            }
        }
        dados['bruto'] = bruto
        dados['mes'] = val[0].mes

        return dados
    }
}

}