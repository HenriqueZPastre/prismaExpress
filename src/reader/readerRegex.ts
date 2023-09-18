import fs from 'fs'
import { parseDataOFXtoDate } from './utils'


interface Transaction {
	type?: string | null
	date?: string | null
	amount?: string | null
	id?: string | null
	memo?: string | null
}

interface Bank {
	id: string
	nome: string
	numeroConta: string
	dataInicial: string | null
	dataFinal: string | null
}

const removeTags = (linha: string, tag: string) => {
	const regex = new RegExp(`<\\/?${tag}>`, 'g')
	return linha.replace(regex, '')
}


const ReaderOfx = (ofxPath: string) => {
	const leitura = fs.readFileSync(ofxPath, 'utf-8')
	const indexOfx = leitura.indexOf('<OFX>')
	const removeCabecalho = leitura.slice(indexOfx)
	const split = removeCabecalho.split('\n')
	const bank: Bank = {
		id: '',
		nome: '',
		numeroConta: '',
		dataInicial: null,
		dataFinal: null
	}

	const dados: Transaction[] = []

	
	split.forEach((linha) => {
		const transacao: Transaction = {}
		linha.includes('<BANKID>') ? bank.id = removeTags(linha, 'BANKID').trim() : null
		linha.includes('<ACCTID>') ? bank.numeroConta = removeTags(linha, 'ACCTID').trim() : null
		linha.includes('<ORG>') ? bank.nome = removeTags(linha, 'ORG').trim() : null
		linha.includes('<DTSTART>') ? bank.dataInicial = parseDataOFXtoDate(removeTags(linha, 'DTSTART').trim()) : null
		linha.includes('<DTEND>') ? bank.dataFinal = parseDataOFXtoDate(removeTags(linha, 'DTEND').trim()) : null

		linha.includes('<TRNTYPE>') ? transacao.type = removeTags(linha, 'TRNTYPE').trim() : null
		linha.includes('<DTPOSTED>') ? transacao.date = parseDataOFXtoDate(removeTags(linha, 'DTPOSTED').trim()) : null
		linha.includes('<TRNAMT>') ? transacao.amount = removeTags(linha, 'TRNAMT').trim() : null
		linha.includes('<FITID>') ? transacao.id = removeTags(linha, 'FITID').trim() : null
		linha.includes('<MEMO>') ? transacao.memo = removeTags(linha, 'MEMO').trim() : null

		if (linha.includes('</STMTTRN>')) {
			//console.log(transacao)
			dados.push(transacao)
		}
	})

	return { bank, dados }


}

const { bank, dados } = ReaderOfx('./src/reader/henriqueNubank.ofx')

console.log(bank)
console.log(dados)


