import { createLancamentos } from "src/models/lancamentos";
import { getIdSituacao } from "../utils/getIdSituacao";
import { getIdContas } from "../utils/getIdContas";
import { getIdCategorias } from "../utils/getIdCategorias";
import { getIdEnvolvidos } from "../utils/getIdEnvolvidos";

export const lancamentosData: createLancamentos[] = [
	{
		nome: 'Internet',
		dataVencimento: new Date(2023, 3, 10),
		dataPagamento: new Date(),
		descricaoBasica: 'Conta da Internet',
		valor: 35.00,
		situacaoId: getIdSituacao('Aberto'),
		envolvidosId: getIdEnvolvidos('Claro'),
		contasId: getIdContas('Sicredi'),
		categoriasId: getIdCategorias('Internet')
	}	
]

