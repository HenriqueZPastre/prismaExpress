import { ACCTTYPE, TransactionType } from './interfaces'
export const parseDataOFXtoDate = (data: string) => {

	const regex = data.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\[(-?\d+):[A-Za-z]+\]$/)
	if (!regex) {
		console.error('Erro ao converter data')
		return null
	}
	//_stringNormal é o dado inicial
	// timeZoneOffset é ignorado no momento  
	//const [_stringNormal, ano, mes, dia, hora, minuto, segundo, timeZoneOffset] = regex
	const [, ano, mes, dia, hora, minuto, segundo,] = regex
	const date = new Date(
		Date.UTC(
			parseInt(ano, 10),
			parseInt(mes, 10) - 1,
			parseInt(dia, 10),
			parseInt(hora, 10),
			parseInt(minuto, 10),
			parseInt(segundo, 10)
		)
	)
	//ignorar por enquanto o timezone
	//	date.setTime(date.getTime() - parseInt(timeZoneOffset, 10) * 60 * 60 * 1000)
	return date.toISOString()
}

export const removeTags = (linha: string, tag: string) => {
	const regex = new RegExp(`<\\/?${tag}>`, 'g')
	return linha.replace(regex, '').trim()
}

export const removeTagsTRTYPE = (linha: string, tag: string): TransactionType | null => {
	const regex = new RegExp(`<\\/?${tag}>`, 'g')
	const TRNTYPE = linha.replace(regex, '').trim()
	if (TransactionType[TRNTYPE as keyof typeof TransactionType]) {
		return TransactionType[TRNTYPE as keyof typeof TransactionType]
	}
	throw new Error('Erro ao comparar TRNTYPE')
}

export const removeTagsACCTTYPE = (linha: string, tag: string): ACCTTYPE | null => {
	const regex = new RegExp(`<\\/?${tag}>`, 'g')
	const acctype = linha.replace(regex, '').trim()
	if (ACCTTYPE[acctype as keyof typeof ACCTTYPE]) {
		return ACCTTYPE[acctype as keyof typeof ACCTTYPE]
	}
	throw new Error('Erro ao comparar acctype')
}

