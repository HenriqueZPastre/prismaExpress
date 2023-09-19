import fs from 'fs'
import { parseDataOFXtoDate } from './utils'


interface Tansacoes {
	type?: string | null
	date?: string | null
	amount?: string | null
	id?: string | null
	memo?: string | null
}

interface DadosDoBanco {
	id?: string | null
	nome?: string | null
	numeroConta?: string | null
	dataInicial?: string | null
	dataFinal?: string | null
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

	const banco: DadosDoBanco = {}

	const transacoes: Tansacoes[] = []

	let transacao: Tansacoes = {}

	split.forEach((linha) => {
		linha.includes('<BANKID>') ? banco.id = removeTags(linha, 'BANKID').trim() : null
		linha.includes('<ACCTID>') ? banco.numeroConta = removeTags(linha, 'ACCTID').trim() : null
		linha.includes('<ORG>') ? banco.nome = removeTags(linha, 'ORG').trim() : null
		linha.includes('<DTSTART>') ? banco.dataInicial = parseDataOFXtoDate(removeTags(linha, 'DTSTART').trim()) : null
		linha.includes('<DTEND>') ? banco.dataFinal = parseDataOFXtoDate(removeTags(linha, 'DTEND').trim()) : null

		linha.includes('<TRNTYPE>') ? transacao.type = removeTags(linha, 'TRNTYPE').trim() : null
		linha.includes('<DTPOSTED>') ? transacao.date = parseDataOFXtoDate(removeTags(linha, 'DTPOSTED').trim()) : null
		linha.includes('<TRNAMT>') ? transacao.amount = removeTags(linha, 'TRNAMT').trim() : null
		linha.includes('<FITID>') ? transacao.id = removeTags(linha, 'FITID').trim() : null
		linha.includes('<MEMO>') ? transacao.memo = removeTags(linha, 'MEMO').trim() : null

		if (linha.includes('</STMTTRN>')) {
			//console.log(transacao)
			transacoes.push(transacao)
			transacao = {}
		}
	})
	return { banco, transacoes }
}

const { banco, transacoes } = ReaderOfx('./src/reader/pai.ofx')

console.log(banco)
console.log(transacoes)


