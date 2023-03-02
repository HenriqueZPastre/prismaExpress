-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lancamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "nome" TEXT NOT NULL,
    "dataVencimento" DATETIME NOT NULL,
    "dataPagamento" DATETIME,
    "descricaoBasica" TEXT NOT NULL,
    "descricaoAdicional" TEXT,
    "valor" REAL NOT NULL,
    "situacaoId" INTEGER NOT NULL,
    "envolvidosId" INTEGER NOT NULL,
    "contasId" INTEGER NOT NULL,
    "categoriasId" INTEGER NOT NULL,
    "subcategoriasId" INTEGER,
    CONSTRAINT "Lancamentos_situacaoId_fkey" FOREIGN KEY ("situacaoId") REFERENCES "Situacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_envolvidosId_fkey" FOREIGN KEY ("envolvidosId") REFERENCES "Envolvidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_contasId_fkey" FOREIGN KEY ("contasId") REFERENCES "Contas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_categoriasId_fkey" FOREIGN KEY ("categoriasId") REFERENCES "Categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_subcategoriasId_fkey" FOREIGN KEY ("subcategoriasId") REFERENCES "Subcategorias" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lancamentos" ("categoriasId", "contasId", "create_at", "dataPagamento", "dataVencimento", "deletede_at", "descricaoAdicional", "descricaoBasica", "envolvidosId", "id", "nome", "situacaoId", "subcategoriasId", "valor") SELECT "categoriasId", "contasId", "create_at", "dataPagamento", "dataVencimento", "deletede_at", "descricaoAdicional", "descricaoBasica", "envolvidosId", "id", "nome", "situacaoId", "subcategoriasId", "valor" FROM "Lancamentos";
DROP TABLE "Lancamentos";
ALTER TABLE "new_Lancamentos" RENAME TO "Lancamentos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
