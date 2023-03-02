type envolvidos = (
	'SBsistemas'
	| 'RGE'
	| 'Corsan'
	| 'Claro'
	| 'Estácio: SI '
	| 'Estácio: CP'
	| 'Mercado Livre'
	| 'Mercado Valente'
	| 'Mercado Cotrijal'
	| 'Agropecuária GR'
	| 'SICREDI'
	| 'Potatos Burguer'
	| 'Arnesto Brewery Cave'
	| 'Outros'
)

export const getIdEnvolvidos = (objeto: envolvidos) => {
	switch (objeto) {
		case 'SBsistemas':
			return 0
		case 'RGE':
			return 1
		case 'Corsan':
			return 2
		case 'Claro':
			return 3
		case 'Estácio: SI ':
			return 4
		case 'Estácio: CP':
			return 5
		case 'Mercado Livre':
			return 6
		case 'Mercado Valente':
			return 7
		case 'Mercado Cotrijal':
			return 8
		case 'Agropecuária GR':
			return 9
		case 'SICREDI':
			return 10
		case 'Potatos Burguer':
			return 11
		case 'Arnesto Brewery Cave':
			return 12
		case 'Outros':
			return 13
	}
}