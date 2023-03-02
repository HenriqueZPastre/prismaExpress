type contas = 'Sicredi' | 'Alelo' | 'Nubank'

export const getIdContas = (objeto: contas) => {
	switch (objeto) {
		case 'Sicredi':
			return 0
		case 'Alelo':
			return 1
		case 'Nubank':
			return 2
	}
}