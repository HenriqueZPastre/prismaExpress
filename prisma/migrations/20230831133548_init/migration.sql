-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "codigoBanco" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "saldoInicial" REAL NOT NULL,
    "saldoAtual" REAL NOT NULL,
    CONSTRAINT "Contas_codigoBanco_fkey" FOREIGN KEY ("codigoBanco") REFERENCES "Bancos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contas" ("codigoBanco", "create_at", "deletede_at", "id", "nome", "saldoAtual", "saldoInicial") SELECT "codigoBanco", "create_at", "deletede_at", "id", "nome", "saldoAtual", "saldoInicial" FROM "Contas";
DROP TABLE "Contas";
ALTER TABLE "new_Contas" RENAME TO "Contas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
