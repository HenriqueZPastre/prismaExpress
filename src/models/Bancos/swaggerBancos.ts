import { generateSchema } from '@anatine/zod-openapi'
import { zodBancos } from './zodBancos'

export const ModelsSwaggerBancos = {
	create: generateSchema(zodBancos.create),
	responseListarBancos: generateSchema(zodBancos.listarBancos),
}