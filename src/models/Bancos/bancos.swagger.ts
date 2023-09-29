import { zodBancos } from './bancos'

export const ModelsSwaggerBancos = {
	create: zodBancos.create,
	responseListarBancos: zodBancos.listarBancos,
}