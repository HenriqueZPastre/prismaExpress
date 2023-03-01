import { categoriasInsert } from "./src/creates/categorias/categorias"
import { contasInsert } from "./src/creates/contas/contas"
import { tiposLancamentosInsert } from "./src/creates/tipoLancamento/tipoLancamento"


try {
	tiposLancamentosInsert()
} finally {
	categoriasInsert()
}

contasInsert()





