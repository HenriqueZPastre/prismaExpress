import fs from 'fs'
import xml2js from 'xml2js'
import * as  tt from 'xml-js'


const caminhoDoArquivo = './src/reader/sicredi.ofx'

const conteudoDoArquivo = fs.readFileSync(caminhoDoArquivo, 'utf-8')

const inicioTagOfx = conteudoDoArquivo.indexOf('<OFX>')

const conteudoOfx = conteudoDoArquivo.slice(inicioTagOfx) // Extrai o conteúdo a partir do índice encontrado

/* const parser = new xml2js.Parser()
parser.parseString(conteudoOfx, (err, result) => {
	if (err) {
		console.log(err)
		return
	}
	fs.writeFileSync('./src/reader/resultadssssssssso.json', JSON.stringify(result, null, 2))
}) */


const result1 = tt.xml2json(conteudoOfx, { compact: false})

const xml = JSON.parse(result1)
fs.writeFileSync('./src/reader/choraaaaaaa.json', JSON.stringify(xml, null, 2))