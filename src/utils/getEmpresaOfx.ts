import { PrismaClient } from '@prisma/client'
import { DadosDoBanco, Transacao } from 'src/reader/interfaces'
import { ReaderOfx } from 'src/reader/main'
import { number } from 'zod'


const texto = 'VE0858584 VALENTE SUPERMERCADO MARAU BR-18'
const { dadosBanco, todasAsTransacoes } = ReaderOfx('')
const criarLancamentoConciliacao = async (dadosBanco: DadosDoBanco, transacoes: Transacao) => {
	const prisma = new PrismaClient()

	if (transacoes.fitid?.includes('VE')) {
		type tag = null | number
		const objeto = {
			data: transacoes.dataDeTransacao,
			descricao: transacoes.memo,
			valor: transacoes.valor,
			especieTransacao: transacoes.tipoDeTransacao,
			fitID: transacoes.fitid,
			tipoOperacao: transacoes.tipoOperacao,
			contasId: dadosBanco.id,
			tagsId: null as tag,
		}

		const fitId = transacoes.fitid?.split(' ')
		const empresa = fitId[1].concat(' ', fitId[2])
		const existe = await prisma.tags.findFirst({
			select: {
				id: true,
			},
			where: {
				nome: {
					contains: empresa,
				}
			}
		})

		if (!existe) {
			const create = await prisma.tags.create({
				select: {
					id: true,
				},
				data: {
					nome: empresa,
				}
			})
			objeto.tagsId = create.id
		} else {
			objeto.tagsId = existe.id
		}
	}
}

