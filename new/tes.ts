import fs from 'fs'

import { xml2json, json2xml } from 'xml-js'

const tes = async () => {
	const xmlInicial = await fs.promises.readFile('./tes.ofx', 'utf-8')
	
	const xmlParaJson = await xml2json(xmlInicial, { compact: true, })
	console.log(xmlParaJson)

}

tes()