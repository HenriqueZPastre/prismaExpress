import fs from 'fs'
import { parseDataOFXtoDate } from './utils'

const t = fs.readFileSync('./src/reader/henriqueNubank.ofx', 'utf-8')
const index = t.indexOf('<OFX>')
const slice = t.slice(index)
const split = slice.split('\n')

interface Transaction {
	type: string
	date: string | null
	amount: string
	id: string
	memo: string
}
let dat = false
const dados: Transaction[] = []


const transacao: Transaction = {
	type: '',
	date: '',
	amount: '',
	id: '',
	memo: ''
}

interface Bank {
	id: string
	nome: string
	numeroConta: string
	dataInicial: string | null
	dataFinal: string | null

}

const bank: Bank = {
	id: '',
	nome: '',
	numeroConta: '',
	dataInicial: '',
	dataFinal: ''
}

const removeTags = (line: string, tag: string) => {
	const regex = new RegExp(`<\\/?${tag}>`, 'g')
	return line.replace(regex, '')
}

split.forEach((line) => {

	line.includes('<BANKID>') ? bank.id = removeTags(line, 'BANKID').trim() : null
	line.includes('<ACCTID>') ? bank.numeroConta = removeTags(line, 'ACCTID').trim() : null
	line.includes('<ORG>') ? bank.nome = removeTags(line, 'ORG').trim() : null
	line.includes('<DTSTART>') ? bank.dataInicial = parseDataOFXtoDate(removeTags(line, 'DTSTART').trim()) : null
	line.includes('<DTEND>') ? bank.dataFinal = parseDataOFXtoDate(removeTags(line, 'DTEND').trim()) : null

	if (line.includes('<STMTTRN>')) {
		dat = true
	}
	if (dat) {
		line.includes('<TRNTYPE>') ? transacao.type = removeTags(line, 'TRNTYPE').trim() : null
		line.includes('<DTPOSTED>') ? transacao.date = parseDataOFXtoDate(removeTags(line, 'DTPOSTED').trim()) : null
		line.includes('<TRNAMT>') ? transacao.amount = removeTags(line, 'TRNAMT').trim() : null
		line.includes('<FITID>') ? transacao.id = removeTags(line, 'FITID').trim() : null
		line.includes('<MEMO>') ? transacao.memo = removeTags(line, 'MEMO').trim() : null
	}
	if (line.includes('</STMTTRN>')) {
		dados.push(transacao)

		dat = false
	}
})
console.log(bank)
console.log(dados)
console.log(dados.length)


