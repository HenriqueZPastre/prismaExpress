import { Request } from 'express'
import { z } from 'zod'

export const ZodParametroID = z.object({
	id: z.string().trim()
})

export type parametroID = z.infer<typeof ZodParametroID>

export interface RequestParametroID extends Request {
	params: parametroID
}

export * as ParametroID from './parametroID'