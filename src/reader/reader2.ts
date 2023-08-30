import fs from 'fs'
import xml2js from 'xml2js'
import { DADOS_GERAIS, OFX, TRANSACOES } from './types'
import { parseDataOFXtoDate } from './utils'

const caminhoDoArquivo = './src/reader/sicredi.ofx'


const leitoOFX = async (caminhoDoArquivo: string): Promise<OFX | undefined> => {
	let dados: OFX
	const conteudoDoArquivo = fs.readFileSync(caminhoDoArquivo, 'utf-8')
	const ofxStartIndex = conteudoDoArquivo.indexOf('<OFX>') // Encontra o índice onde começa o elemento <OFX>
	if (ofxStartIndex !== -1) {
		const conteudoOFX = conteudoDoArquivo.slice(ofxStartIndex) // Extrai o conteúdo a partir do índice encontrado
		return new Promise((resolve) => {
			xml2js.parseString(conteudoOFX, (err, result) => {
				if (err) {
					console.log(err)
					return
				}
				dados = result.OFX
				resolve(dados)
			})
		})
	} else {
		console.log('Elemento <OFX> não encontrado no arquivo.')
	}

}

const tratarDados = async (caminhoDoArquivo: string) => {


	const b: OFX | undefined = await leitoOFX(caminhoDoArquivo)
	if (b) {

		const tran: TRANSACOES = {
			TRNTYPE: '',
			DTPOSTED: '',
			TRNAMT: '',
			FITID: b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].STMTTRN[0].FITID[0],
			REFNUM: '',
			MEMO: ''
		}

		const dadosGerais: DADOS_GERAIS = {
			idBanco: b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKACCTFROM[0].BANKID[0].trim(),
			nomeBanco: b.SIGNONMSGSRSV1[0].SONRS[0].FI[0].ORG[0].trim(),
			numeroConta: b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKACCTFROM[0].ACCTID[0].trim(),
			dataInicial: parseDataOFXtoDate(b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].DTSTART[0])?.trim(),
			dataFinal: b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].DTEND[0].trim()
		}

		console.log(dadosGerais)
		console.log('/////////////////////////////////////////////////////////////-------------------------------------------------------///////////////////////////////////////////////')
		console.log(tran)
	}
}
tratarDados(caminhoDoArquivo)