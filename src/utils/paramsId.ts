import { Request } from 'express'
import { z } from 'zod'

export const paramsId = z.object({
	id: z.string()
})

export type paramsId = z.infer<typeof paramsId>

export interface RequestParamsId extends Request {
	params: paramsId
}

export * as ParamsId from './paramsId'