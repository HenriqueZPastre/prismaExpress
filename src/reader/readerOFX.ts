import fs from 'fs'

interface DadosOFX {
	TRNTYPE: string
	DTPOSTED: string
	TRNAMT: number
	FITID: string
	REFNUM: string
	MEMO: string
}

const reader = () => {
	fs.readFile('./src/reader/sicredi.ofx', 'utf-8', (err, data) => {
		if (err) {
			console.log(err)
			return
		}
		const rege = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g
		const matches = data.match(rege)

		const dados: DadosOFX[] = []

		if (matches) {
			matches.forEach((match) => {
				const TRNTYPE = /<TRNTYPE>(.*?)<\/TRNTYPE>/.exec(match)?.[1] || ''
				const DTPOSTED = /<DTPOSTED>(.*?)<\/DTPOSTED>/.exec(match)?.[1] || ''
				const TRNAMT = parseFloat(/<TRNAMT>(.*?)<\/TRNAMT>/.exec(match)?.[1] || '0')
				const FITID = /<FITID>(.*?)<\/FITID>/.exec(match)?.[1] || ''
				const REFNUM = /<REFNUM>(.*?)<\/REFNUM>/.exec(match)?.[1] || ''
				const MEMO = /<MEMO>(.*?)<\/MEMO>/.exec(match)?.[1] || ''

				const dadosItem: DadosOFX = {
					TRNTYPE,
					DTPOSTED,
					TRNAMT,
					FITID,
					REFNUM,
					MEMO,
				}

				dados.push(dadosItem)
			})

			console.log(dados)
			console.warn('Total de registros: ', dados.length)
		}
	})
}

reader()
