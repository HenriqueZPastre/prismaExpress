import { insertEnvolvidos } from "src/creates/envolvidos/envolvidos"
import { categoriasInsert } from "./src/creates/categorias/categorias"
import { contasInsert } from "./src/creates/contas/contas"
import { tiposLancamentosInsert } from "./src/creates/tipoLancamento/tipoLancamento"
import { insertSituacao } from "src/creates/situacao/situacao"


try {
	tiposLancamentosInsert()
} finally {
	categoriasInsert()
}

contasInsert()

insertEnvolvidos()

insertSituacao()





