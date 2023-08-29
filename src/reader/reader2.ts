import fs from 'fs'
import xml2js from 'xml2js'
import { xml2json } from 'xml-js'
import { OFX } from './types'

const xmlData = fs.readFileSync('./src/reader/sicredi.ofx', 'utf-8')

let dados: OFX
const read = async () => {

	const converter = await xml2json(xmlData, { compact: true, })
	const xml: OFX = JSON.parse(converter)
	console.log(xml.OFX.BANKMSGSRSV1.STMTTRNRS)

	/* await xml2js.parseString(xmlData, (err, result) => {
		if (err) {
			console.log(err)
			return
		}
		dados = result

		console.log(result.OFX.BANKMSGSRSV1.STMTTRNRS)
	})
	return dados */
}
/* const go = async () => {
	const t = await read()
	//console.log(t.BANKMSGSRSV1)
} */


read()