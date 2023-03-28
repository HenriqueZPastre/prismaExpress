-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lancamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "descricao" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "dataVencimento" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contasId" INTEGER NOT NULL,
    "contasNome" TEXT NOT NULL,
    "dataPagamento" DATETIME,
    "tipo" INTEGER NOT NULL,
    CONSTRAINT "Lancamentos_contasId_fkey" FOREIGN KEY ("contasId") REFERENCES "Contas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lancamentos" ("contasId", "contasNome", "create_at", "dataPagamento", "dataVencimento", "deletede_at", "descricao", "id", "tipo", "valor") SELECT "contasId", "contasNome", "create_at", "dataPagamento", "dataVencimento", "deletede_at", "descricao", "id", "tipo", "valor" FROM "Lancamentos";
DROP TABLE "Lancamentos";
ALTER TABLE "new_Lancamentos" RENAME TO "Lancamentos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
