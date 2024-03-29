import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { HandleResponse } from '../utils/HandleResponse/HandleResponse'


const prisma = new PrismaClient()

export const controllerValores = {

	async getAll(req: Request, res: Response) {
		const despesas = await prisma.lancamentos.findMany({
			select: {
				id: true,
				descricao: true,
				valor: true,
			},
			where: {
				deletede_at: null,
				dataPagamento: null,
				tipo: 1,
				situacao: 0
			}
		})

		const saldoAtual = await prisma.contas.findMany({
			select: {
				saldoAtual: true,
				nome: true,
				id: true
			},
			where: {
				deletede_at: null,
			}
		})

		let despesasTotal = 0
		despesas.forEach((item: { 
			id: number;
			descricao: string;
			valor: number;
		}) => {
			despesasTotal += item.valor
		})
		let atual = 0
		saldoAtual.forEach((item: {saldoAtual: number;
			nome: string;
			id: number;}) => {
			atual += item.saldoAtual
		})

		const valorLiquido = atual - despesasTotal

		const t = {
			Despesas: despesas, Contas: saldoAtual, total: {
				despesas: despesasTotal,
				SaldoAtual: atual,
				liquido: valorLiquido
			}
		}

		return HandleResponse.main(res, 200, { data: t })
	}
}
