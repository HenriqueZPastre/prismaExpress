import { ParametroID } from '../../utils/parametroID'
import { z } from 'zod'
import { zodTag } from './tags'
import { Request } from 'express'

export type Tag = z.infer<typeof zodTag.tag>

export interface ITag extends Request {
	body: Tag
}

export interface ITagEditar extends Request {
	params: ParametroID.parametroID
	body: Tag
}
