-- CreateTable
CREATE TABLE "Contas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "nome" TEXT NOT NULL,
    "saldoInicial" REAL NOT NULL,
    "saldoAtual" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Lancamentos" (
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
    "situacao" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Lancamentos_contasId_fkey" FOREIGN KEY ("contasId") REFERENCES "Contas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "lancamentos_tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "tagsId" INTEGER NOT NULL,
    "lancamentosId" INTEGER NOT NULL,
    CONSTRAINT "lancamentos_tags_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "lancamentos_tags_lancamentosId_fkey" FOREIGN KEY ("lancamentosId") REFERENCES "Lancamentos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
