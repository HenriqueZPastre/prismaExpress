type situacao = 'Aberto' | 'Quitado' | 'Vencido'

export const getIdSituacao = (obj: situacao) => {
	switch (obj) {
		case 'Aberto':
			return 0
		case 'Quitado':
			return 1
		case 'Vencido':
			return 2
	}
}