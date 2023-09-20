import fs from 'fs'
import { parseDataOFXtoDate } from './utils'
import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
const prisma = new PrismaClient()
interface Tansacoes {
	especieTransacao?: string | null
	date?: string | null
	valor?: number | null
	id?: string | null
	memo?: string | null
	tipoOperacao?: number | null
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

		linha.includes('<TRNTYPE>') ? transacao.especieTransacao = removeTags(linha, 'TRNTYPE').trim() : null
		linha.includes('<DTPOSTED>') ? transacao.date = parseDataOFXtoDate(removeTags(linha, 'DTPOSTED').trim()) : null
		if (linha.includes('<TRNAMT>')) {
			removeTags(linha, 'TRNAMT').trim().startsWith('-') ? transacao.tipoOperacao = 1 : transacao.tipoOperacao = 0
			transacao.valor = parseFloat(removeTags(linha, 'TRNAMT').trim().replace('-', ''))
		}
		linha.includes('<FITID>') ? transacao.id = removeTags(linha, 'FITID') : null
		linha.includes('<MEMO>') ? transacao.memo = removeTags(linha, 'MEMO').trim() : null

		if (linha.includes('</STMTTRN>')) {
			//console.log(transacao)
			transacoes.push(transacao)
			transacao = {}
		}
	})
	return { banco, transacoes }
}

/* const { banco, transacoes } = ReaderOfx('./src/reader/pai.ofx')

console.log(banco)
console.log(transacoes) */

const VerificarExistenciaDaConta = async (banco: DadosDoBanco) => {
	if (banco.id) {
		const existe = await prisma.contas.findFirst({
			select: {
				codigoBanco: true,
				id: true,
			},
			where: {
				codigoBanco: parseInt(banco.id),
			}
		})
		if (existe) {
			console.log('Conta já existe')
		} else {
			console.log('Conta não existe')
		}
		return existe
	}

}

const existeFitId = async (dados: Tansacoes[], banco: DadosDoBanco) => {
	const banck = await VerificarExistenciaDaConta(banco)
	try {
		await Promise.all(dados.map(async (dado) => {
			console.log(dado.date)

			const existe = await prisma.conciliacaoBancaria.findFirst({
				where: {
					fitID: dado.id!,
					//data: dado.date!,
				},
			})
			console.log('Existe' + existe)
			if (existe) {
				console.log(existe)
				console.log('Existe' + existe.fitID)
				console.log(dado.id)
			} else {

				const create = await prisma.conciliacaoBancaria.create({
					data: {
						data: dado.date!,
						descricao: dado.memo!,
						fitID: dado.id!,
						valor: dado.valor!,
						tipoOperacao: dado.tipoOperacao!,
						especieTransacao: dado.especieTransacao!,
						contasId: banck!.id!,
					}
				})
				//console.log(create)
			}

		}))

	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError) {
			console.log(err.message)
		}
		console.log(err)
	}
}

const arquivos = [
	'./src/reader/ofxs/extrato.ofx',
	'./src/reader/ofxs/extrato (1).ofx',
	'./src/reader/ofxs/extrato (2).ofx',
	'./src/reader/ofxs/extrato (3).ofx',
	'./src/reader/ofxs/extrato (4).ofx',
	'./src/reader/ofxs/21/extrato.ofx',
	'./src/reader/ofxs/21/extrato (1).ofx',
	'./src/reader/ofxs/21/extrato (2).ofx',
	'./src/reader/ofxs/21/extrato (3).ofx',
	'./src/reader/ofxs/21/extrato (4).ofx',
	'./src/reader/ofxs/21/extrato (5).ofx',
	'./src/reader/ofxs/21/extrato (6).ofx',
	'./src/reader/ofxs/21/extrato (7).ofx',
	'./src/reader/ofxs/21/extrato (8).ofx',
	'./src/reader/ofxs/21/extrato (9).ofx',
	'./src/reader/ofxs/21/extrato (10).ofx',
	'./src/reader/ofxs/21/extrato (11).ofx',
	'./src/reader/ofxs/22/extrato.ofx',
	'./src/reader/ofxs/22/extrato (1).ofx',
	'./src/reader/ofxs/22/extrato (2).ofx',
	'./src/reader/ofxs/22/extrato (3).ofx',
	'./src/reader/ofxs/22/extrato (4).ofx',
	'./src/reader/ofxs/22/extrato (5).ofx',
	'./src/reader/ofxs/22/extrato (6).ofx',
	'./src/reader/ofxs/22/extrato (7).ofx',
	'./src/reader/ofxs/22/extrato (8).ofx',
	'./src/reader/ofxs/22/extrato (9).ofx',
	'./src/reader/ofxs/22/extrato (10).ofx',
	'./src/reader/ofxs/22/extrato (11).ofx',
	'./src/reader/ofxs/23/extrato.ofx',
	'./src/reader/ofxs/23/extrato (1).ofx',
	'./src/reader/ofxs/23/extrato (2).ofx',
	'./src/reader/ofxs/23/extrato (3).ofx',
	'./src/reader/ofxs/23/extrato (4).ofx',
	'./src/reader/ofxs/23/extrato (5).ofx',
	'./src/reader/ofxs/23/extrato (6).ofx',
]


const { banco, transacoes } = ReaderOfx(arquivos[35])
existeFitId(transacoes, banco)

//VerificarExistenciaDaConta(teste)

const deleteAll = async () => {
	await prisma.conciliacaoBancaria.deleteMany()
}

deleteAll()


const somaPsotivos = async () => {
	const t = await prisma.conciliacaoBancaria.aggregate({
		where: {
			tipoOperacao: 0
		},
		_sum: {
			valor: true
		}
	})

	const tes = await prisma.conciliacaoBancaria.aggregate({
		where: {
			tipoOperacao: 1
		},
		_sum: {
			valor: true
		}
	})

	console.log('receita', t)
	console.log('despesa', tes)
}

somaPsotivos()