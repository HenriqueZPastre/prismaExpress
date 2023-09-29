import { z } from 'zod'
import { zodLancamentos } from './lancamentos'
import { Request } from 'express'
import { ParametroID } from 'src/utils/parametroID'

export type createLancamentos = z.infer<typeof zodLancamentos.create>
export type editarLancamentos = z.infer<typeof zodLancamentos.editar>

/**
 * Tipagem para usa na função de atualizar saldo de uma conta bancária
 */
export type InfoValores = {
	situacao: number,
	tipo: number,
	contasId: createLancamentos['contasId'],
	valor: createLancamentos['valor']
}
export interface ICreateLancamentos extends Request {
	body: createLancamentos
}
export interface IEditarLancamentos extends Request {
	params: ParametroID.parametroID
	body: editarLancamentos
}