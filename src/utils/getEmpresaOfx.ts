import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import { ReaderOfx } from '../reader/main'


const texto = 'VE0858584 VALENTE SUPERMERCADO MARAU BR-18'
const criarLancamentoConciliacao = async (/* dadosBanco: DadosDoBanco, transacoes: Transacao[] */) => {
	const prisma = new PrismaClient()
	const t = fs.readFileSync('./src/utils/agosto.ofx', 'base64')
	const { dadosBanco, todasAsTransacoes } = await ReaderOfx(t)
	
	for await (const item of todasAsTransacoes) {

		

		await prisma.conciliacaoBancaria.create({
			data: {
				data: item.dataDeTransacao ? item.dataDeTransacao : new Date(),
				descricao: item.memo ? item.memo : 'Sem descrição',
				valor: item.valor ? item.valor : 0,
				tipoOperacao: item.tipoOperacao ,
				especieTransacao: item.tipoDeTransacao ? item.tipoDeTransacao : '999',
				fitID: item.fitid ? item.fitid : '999',
				contasId: 1,
			}
		})
	}
}

criarLancamentoConciliacao()