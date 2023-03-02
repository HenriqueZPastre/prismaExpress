type categorias = (
	'Salário' |
	'Vale Alimentação' |
	'Bonificação' |
	'Água' |
	'Luz' |
	'Internet' |
	'Faculdade' |
	'Cartão de crédito' |
	'Moveis' |
	'Gastos Gerais'
)

export const getIdCategorias = (objeto: categorias) => {
	switch (objeto) {
		case 'Salário':
			return 0
		case 'Vale Alimentação':
			return 1
		case 'Bonificação':
			return 2
		case 'Água':
			return 3
		case 'Luz':
			return 4
		case 'Internet':
			return 5
		case 'Faculdade':
			return 6
		case 'Cartão de crédito':
			return 7
		case 'Moveis':
			return 8
		case 'Gastos Gerais':
			return 9
	}
}