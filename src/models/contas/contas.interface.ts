import { ParametroID } from 'src/utils/parametroID'
import { z } from 'zod'
import { zodContas } from './contas'
import { Request } from 'express'

export type createContas = z.infer<typeof zodContas.create>
export type listarContas = z.infer<typeof zodContas.listar>
export type editarContas = z.infer<typeof zodContas.editar>

export interface ICreateContas extends Request {
	body: createContas
}
export interface IEditarContas extends Request {
	params: ParametroID.parametroID
	body: editarContas
}