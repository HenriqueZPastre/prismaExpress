//const joinedContent = split.join('\n')

//fs.writeFileSync('./src/reader/test.txt',joinedContent, 'utf-8')

//REMOVE AS TAGS
/* split.forEach((line) => {
	if (line.includes('<FITID>')) {
		const t = line.replace(/<\/?FITID>/g,'')
		console.log(t)
	}
})  */
import { log } from 'console'
import fs from 'fs'

const t = fs.readFileSync('./src/reader/henriqueNubank.ofx', 'utf-8')
const index = t.indexOf('<OFX>')
const slice = t.slice(index)
const split = slice.split('\n')

const regex = /<STMTTRN>/g


interface Transaction {
	type: any
	date: any
	amount: any
	id: any
	memo: any
}
let dat = false
const dale: Transaction[] = []


const transacao: Transaction = {
	type: '',
	date: '',
	amount: '',
	id: '',
	memo: ''
}
split.forEach((line) => {
	if (line.includes('<STMTTRN>')) {
		dat = true
	}
	if (dat) {
		line.includes('<TRNTYPE>') ? transacao.type = line.replace(/<\/?TRNTYPE>/g, '') : null
		line.includes('<DTPOSTED>') ? transacao.date = line.replace(/<\/?DTPOSTED>/g, '') : null
		line.includes('<TRNAMT>') ? transacao.amount = line.replace(/<\/?TRNAMT>/g, '') : null
		line.includes('<FITID>') ? transacao.id = line.replace(/<\/?FITID>/g, '') : null
		line.includes('<MEMO>') ? transacao.memo = line.replace(/<\/?MEMO>/g, '') : null
	}
	if (line.includes('</STMTTRN>')) {
		dale.push(transacao)
	
		dat = false
	}
})

console.log(dale)
console.log(dale.length)


