import fs from 'fs'
import xml2js from 'xml2js'
import { DADOS_GERAIS, OFX, STMTTRNObject, } from './types'
import { parseDataOFXtoDate } from './utils'

const caminhoDoArquivo = './src/reader/sicredi.ofx'

const leitorOFX = async (caminhoDoArquivo: string): Promise<OFX | undefined> => {
	let dados: OFX

	const conteudoDoArquivo = fs.readFileSync(caminhoDoArquivo, 'utf-8')

	const inicioTagOfx = conteudoDoArquivo.indexOf('<OFX>') // Encontra o índice onde começa o elemento <OFX>

	if (inicioTagOfx !== -1) {

		const conteudoOfx = conteudoDoArquivo.slice(inicioTagOfx) // Extrai o conteúdo a partir do índice encontrado

		return new Promise((resolve) => {
			xml2js.parseString(conteudoOfx, (err, result) => {
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

	const b: OFX | undefined = await leitorOFX(caminhoDoArquivo)
	if (b) {
		const dadosGerais: DADOS_GERAIS = {
			idBanco: b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKACCTFROM[0].BANKID[0].trim(),
			nomeBanco: b.SIGNONMSGSRSV1[0].SONRS[0].FI[0].ORG[0].trim(),
			numeroConta: b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKACCTFROM[0].ACCTID[0].trim(),
			dataInicial: parseDataOFXtoDate(b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].DTSTART[0])?.trim(),
			dataFinal: b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].DTEND[0].trim()
		}

		const t: STMTTRNObject[]  = []
		b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].STMTTRN.forEach((element) => {

			const objeto: STMTTRNObject = {
				TRNTYPE: element.TRNTYPE[0],
				DTPOSTED: parseDataOFXtoDate(element.DTPOSTED[0]),
				TRNAMT: element.TRNAMT[0],
				FITID: element.FITID[0],
				REFNUM: element.REFNUM[0],
				MEMO: element.MEMO[0]
			}
			t.push(objeto)
		})

		fs.writeFileSync('./src/reader/resultado.json', JSON.stringify(t, null, 2))

		//console.log(dadosGerais)
		//console.log('/////////////////////////////////////////////////////////////-------------------------------------------------------///////////////////////////////////////////////')
		//console.log(tran)
	}
}
tratarDados(caminhoDoArquivo)