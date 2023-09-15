import fs from 'fs'
import xml2js from 'xml2js'
import * as  tt from 'xml-js'


/* const caminhoDoArquivo = './src/reader/itau.ofx'

const conteudoDoArquivo = fs.readFileSync(caminhoDoArquivo, 'utf-8')

const inicioTagOfx = conteudoDoArquivo.indexOf('<OFX>')

const conteudoOfx = conteudoDoArquivo.slice(inicioTagOfx) // Extrai o conteúdo a partir do índice encontrado */

/* const parser = new xml2js.Parser()
parser.parseString(conteudoOfx, (err, result) => {
	if (err) {
		console.log(err)
		return
	}
	fs.writeFileSync('./src/reader/resultadssssssssso.json', JSON.stringify(result, null, 2))
}) */



/* 
const result1 = tt.xml2json(conteudoOfx, { compact: false})

const xml = JSON.parse(result1)
fs.writeFileSync('./src/reader/itau.json', JSON.stringify(xml, null, 2)) */

const xmlData = fs.readFileSync('./src/reader/itau.ofx', 'utf-8')
const inicioTagOfx = xmlData.indexOf('<OFX>')

const conteudoOfx = xmlData.slice(inicioTagOfx)
function corrigirTagsNaoFechadas(xml: string) {
	const regex = /<(\w+)([^>]*)>([^<]*)/g
	return xml.replace(regex, (match, tagName, attributes, content) => {
		const tagFechamento = `</${tagName}>`
		const tagAbertura = `<${tagName}${attributes}>${content}`
		return tagAbertura + tagFechamento
	})
}
console.log(corrigirTagsNaoFechadas(conteudoOfx))
/* fs.writeFileSync('./src/reader/itau2.ofx', corige)
// Converter o XML para um objeto JavaScript
xml2js.parseString(corige, (err, result) => {
	console.log(result)
	if (err) {
		console.error(err)
	} */
//})