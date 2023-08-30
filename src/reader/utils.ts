export const parseDataOFXtoDate = (data: string) => {
	if(data){
		const regex = data.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\[(-?\d+):[A-Za-z]+\]$/)
		if (!regex) {
			console.error('Erro ao converter data')
			return
		}
	
		const [_stringNormal, ano, mes, dia, hora, minuto, segundo, timeZoneOffset] = regex
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
	return
}

