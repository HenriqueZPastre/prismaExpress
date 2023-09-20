import fs from 'fs'
import { parseDataOFXtoDate, removeTags } from './utils'
import { PrismaClient } from '@prisma/client'
import { responseBanco, typeDadosDoBanco, typeTransacao, zodTransacao } from './interfaces'


const prisma = new PrismaClient()

const ReaderOfx = (ofxPath: string): { dadosBanco: typeDadosDoBanco, transacoes: typeTransacao[] } => {

	const dadosBanco: typeDadosDoBanco = {
		id: '',
		nome: '',
		numeroConta: '',
		dataInicial: '',
		dataFinal: '',
	}
	const transacoes: typeTransacao[] = []

	const leitura = fs.readFileSync(ofxPath, 'utf-8')
	const indexOfx = leitura.indexOf('<OFX>')
	const removeCabecalho = leitura.slice(indexOfx)
	const split = removeCabecalho.split('\n')

	let transacao: typeTransacao = {
		especieTransacao: '',
		date: '',
		valor: 0,
		id: '',
		memo: '',
		tipoOperacao: 0,
	}

	split.forEach((linha) => {
		linha.includes('<BANKID>') ? dadosBanco.id = removeTags(linha, 'BANKID').trim() : null
		linha.includes('<ACCTID>') ? dadosBanco.numeroConta = removeTags(linha, 'ACCTID').trim() : null
		linha.includes('<ORG>') ? dadosBanco.nome = removeTags(linha, 'ORG').trim() : null

		if (linha.includes('<DTSTART>')) {
			const data = parseDataOFXtoDate(removeTags(linha, 'DTSTART').trim())
			data != null ? dadosBanco.dataInicial = data : null
		}

		if (linha.includes('<DTEND>')) {
			const data = parseDataOFXtoDate(removeTags(linha, 'DTEND').trim())
			data != null ? dadosBanco.dataFinal = data : null

		}

		linha.includes('<TRNTYPE>') ? transacao.especieTransacao = removeTags(linha, 'TRNTYPE').trim() : null

		if (linha.includes('<DTPOSTED>')) {
			const data = parseDataOFXtoDate(removeTags(linha, 'DTPOSTED').trim())
			data != null ? transacao.date = data : null
		}

		if (linha.includes('<TRNAMT>')) {
			removeTags(linha, 'TRNAMT').trim().startsWith('-') ? transacao.tipoOperacao = 1 : transacao.tipoOperacao = 0
			transacao.valor = parseFloat(removeTags(linha, 'TRNAMT').trim().replace('-', ''))
		}

		linha.includes('<FITID>') ? transacao.id = removeTags(linha, 'FITID').trim() : null
		linha.includes('<MEMO>') ? transacao.memo = removeTags(linha, 'MEMO').trim() : null

		if (linha.includes('</STMTTRN>')) {
			if (zodTransacao.safeParse(transacao).success) {
				transacoes.push(transacao)

			} else {
				console.log('erro')
				console.log(transacao)
			}
			transacao = {
				especieTransacao: '',
				date: '',
				valor: 0,
				id: '',
				memo: '',
				tipoOperacao: 0,
			}
		}
	})
	return { dadosBanco, transacoes }
}

const criarConta = async (banco: typeDadosDoBanco) => {
	const bancoc = await prisma.contas.create({
		select: {
			codigoBanco: true,
			id: true,
		},
		data: {
			codigoBanco: parseInt(banco.id),
			nome: banco.nome,
			saldoAtual: 0,
			saldoInicial: 0,
		}
	})
	return bancoc
}

const VerificarExistenciaDaConta = async (banco: typeDadosDoBanco): Promise<responseBanco> => {
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
		return existe
	} else {
		const banck = await criarConta(banco)
		console.log(banck)
		return banck
	}
}

const findFitid = async (transacao: typeTransacao) => {
	const existe = await prisma.conciliacaoBancaria.findFirst({
		select: {
			id: true,
		},
		where: {
			fitID: transacao.id,
			data: transacao.date,
			valor: transacao.valor,
		}
	})
	return existe
}

const criarlancamentoConcialiacao = async (transacao: typeTransacao, banco: responseBanco) => {
	const criar = await prisma.conciliacaoBancaria.create({
		data: {
			data: transacao.date,
			descricao: transacao.memo,
			especieTransacao: transacao.especieTransacao,
			fitID: transacao.id,
			tipoOperacao: transacao.tipoOperacao,
			valor: transacao.valor,
			contasId: banco.id,
		}
	})
	console.log(criar)
}

const start = async () => {
	const { dadosBanco, transacoes } = ReaderOfx('./src/reader/ofx/sicredi.ofx')
	//console.log(dadosBanco)
	//console.log(transacoes)
	const banco = await VerificarExistenciaDaConta(dadosBanco)
	const existeFit = await findFitid(transacoes[3])
	if (!existeFit) {
		await criarlancamentoConcialiacao(transacoes[3], banco)
	} else {
		console.log('existe')
	}
}

start()