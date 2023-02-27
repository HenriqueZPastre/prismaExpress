/*
  Warnings:

  - Added the required column `situacaoId` to the `Lancamentos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lancamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "Nome" TEXT NOT NULL,
    "DataVencimento" DATETIME NOT NULL,
    "DataPagamento" DATETIME,
    "DescricaoBasica" TEXT NOT NULL,
    "DescricaoAdicional" TEXT NOT NULL,
    "Valor" REAL NOT NULL,
    "situacaoId" INTEGER NOT NULL,
    "EnvolvidosID" INTEGER NOT NULL,
    "ContasID" INTEGER NOT NULL,
    "CategoriasID" INTEGER NOT NULL,
    "SubcategoriasID" INTEGER NOT NULL,
    CONSTRAINT "Lancamentos_situacaoId_fkey" FOREIGN KEY ("situacaoId") REFERENCES "Situacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_EnvolvidosID_fkey" FOREIGN KEY ("EnvolvidosID") REFERENCES "Envolvidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_ContasID_fkey" FOREIGN KEY ("ContasID") REFERENCES "Contas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_CategoriasID_fkey" FOREIGN KEY ("CategoriasID") REFERENCES "Categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_SubcategoriasID_fkey" FOREIGN KEY ("SubcategoriasID") REFERENCES "Subcategorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lancamentos" ("CategoriasID", "ContasID", "DataPagamento", "DataVencimento", "DescricaoAdicional", "DescricaoBasica", "EnvolvidosID", "Nome", "SubcategoriasID", "Valor", "create_at", "deletede_at", "id") SELECT "CategoriasID", "ContasID", "DataPagamento", "DataVencimento", "DescricaoAdicional", "DescricaoBasica", "EnvolvidosID", "Nome", "SubcategoriasID", "Valor", "create_at", "deletede_at", "id" FROM "Lancamentos";
DROP TABLE "Lancamentos";
ALTER TABLE "new_Lancamentos" RENAME TO "Lancamentos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
