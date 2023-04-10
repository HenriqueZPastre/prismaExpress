import { Request } from 'express'
import { z } from 'zod'

export const schema_tag = z.object({
	nome: z.string(),
})

export type tag = z.infer<typeof schema_tag>

export interface TES extends Request {
	body: tag
}

export * as TAG from './test'