import fs from 'fs'
import { parseDataOFXtoDate, removeTags, removeTagsACCTTYPE, removeTagsTRTYPE } from './utils'
import { DadosDoBanco, Transacao } from './interfaces'

const todasAsTransacoes: Transacao[] = []

const dadosBanco: DadosDoBanco = {
	id: null,
	nome: null,
	numeroConta: null,
	dataInicial: null,
	dataFinal: null,
	tipoDaContaBancaria: null,
	moedaCorrente: null,
	balanco: null,
}

let transacao: Transacao = {
	tipoDeTransacao: null,
	dataDeTransacao: null,
	valor: null,
	fitid: null,
	refnum: null,
	memo: null,
	tipoOperacao: null,
}

export const ReaderOfx = (ofxPath: string,): { dadosBanco: DadosDoBanco, todasAsTransacoes: Transacao[] } => {
	
	const leitura = Buffer.from(ofxPath, 'base64').toString('utf-8')

	//const leitura = fs.readFileSync(ofxPath, 'utf-8')
	const indexOfx = leitura.indexOf('<OFX>')
	const removeCabecalho = leitura.slice(indexOfx)
	const split = removeCabecalho.split('\n')

	split.forEach((linha) => {
		//// Dados do banco \\\\\\
		linha.includes('<BANKID>') ? dadosBanco.id = removeTags(linha, 'BANKID') : null
		linha.includes('<ORG>') ? dadosBanco.nome = removeTags(linha, 'ORG') : null
		linha.includes('<ACCTID>') ? dadosBanco.numeroConta = removeTags(linha, 'ACCTID') : null
		if (linha.includes('<DTSTART>')) {
			const data = parseDataOFXtoDate(removeTags(linha, 'DTSTART'))
			data != null ? dadosBanco.dataInicial = data : null
		}
		if (linha.includes('<DTEND>')) {
			const data = parseDataOFXtoDate(removeTags(linha, 'DTEND'))
			data != null ? dadosBanco.dataFinal = data : null

		}
		linha.includes('<ACCTTYPE>') ? dadosBanco.tipoDaContaBancaria = removeTagsACCTTYPE(linha, 'ACCTTYPE') : null
		linha.includes('<CURDEF>') ? dadosBanco.moedaCorrente = removeTags(linha, 'CURDEF') : null
		linha.includes('<BALAMT>') ? dadosBanco.balanco = parseFloat(removeTags(linha, 'BALAMT')) : null
		//////////////////////////////////
		//// Fim dos dados do banco \\\\\\
		//////////////////////////////////

		linha.includes('<TRNTYPE>') ? transacao.tipoDeTransacao = removeTagsTRTYPE(linha, 'TRNTYPE') : null

		if (linha.includes('<DTPOSTED>')) {
			const data = parseDataOFXtoDate(removeTags(linha, 'DTPOSTED'))
			data != null ? transacao.dataDeTransacao = data : null
		}

		if (linha.includes('<TRNAMT>')) {
			removeTags(linha, 'TRNAMT').startsWith('-') ? transacao.tipoOperacao = 1 : transacao.tipoOperacao = 0
			transacao.valor = parseFloat(removeTags(linha, 'TRNAMT').replace('-', ''))
		}

		linha.includes('<FITID>') ? transacao.fitid = removeTags(linha, 'FITID') : null
		linha.includes('<REFNUM>') ? transacao.refnum = removeTags(linha, 'REFNUM') : null
		linha.includes('<MEMO>') ? transacao.memo = removeTags(linha, 'MEMO') : null


		if (linha.includes('</STMTTRN>')) {

			todasAsTransacoes.push(transacao)

			transacao = {
				tipoDeTransacao: null,
				dataDeTransacao: null,
				valor: null,
				fitid: null,
				refnum: null,
				memo: null,
				tipoOperacao: null,
			}
		}
	})

	const dados = {
		dadosBanco: dadosBanco,
		todasAsTransacoes: todasAsTransacoes
	}
	console.log(todasAsTransacoes.length)
	fs.writeFileSync('./src/reader/ofx/si.json', JSON.stringify(dados))

	return { dadosBanco, todasAsTransacoes }
}

ReaderOfx('./src/reader/ofx/ss.ofx',)