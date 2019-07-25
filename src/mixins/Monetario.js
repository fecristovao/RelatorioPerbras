export default {
	methods: {
		ReaisToFloat(reais) {
			reais = reais.toString();
			return parseFloat(reais.replace('.', '').replace(',', '.'));
		},
		
		FloatToReais: (numero) => {
			var numero;
			var decimal;
			var inteira;
			var slice;
			var i;
			numero = numero.toString().replace(',','.')
			
			numero = parseFloat(numero)
			numero = numero.toFixed(2)
			numero = numero.toString()
			numero = numero.split('.')
			// Retira a parte decimal

			decimal = (numero[1])
			// Retira a parte inteira
			inteira = parseInt(numero[0]).toString().split("")

			var str = []

			if (inteira.length <= 3) {
				str = inteira.slice().join("")
			} else {
				inteira = inteira.reverse()
				slice = 0
				for (i = 0; i < inteira.length; i++) {
					if (slice == 3) {
						str.push('.')
						slice = 0
					}
					slice += 1
					str.push(inteira[i])
				}
				str = str.reverse().join("")
			}

			if (numero[1]) {
				str = str + ',' + decimal.toString()
			} else {
				str = str + ',00'
			}
			return str
		}
	}
}
