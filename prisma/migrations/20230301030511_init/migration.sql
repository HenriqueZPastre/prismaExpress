-- CreateTable
CREATE TABLE "Envolvidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TiposLancamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "nome" TEXT NOT NULL,
    "tiposLancamentosId" INTEGER NOT NULL,
    CONSTRAINT "Categorias_tiposLancamentosId_fkey" FOREIGN KEY ("tiposLancamentosId") REFERENCES "TiposLancamentos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subcategorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "nome" TEXT NOT NULL,
    "categoriasId" INTEGER NOT NULL,
    CONSTRAINT "Subcategorias_categoriasId_fkey" FOREIGN KEY ("categoriasId") REFERENCES "Categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "nome" TEXT NOT NULL,
    "dataVencimento" DATETIME NOT NULL,
    "dataPagamento" DATETIME,
    "descricaoBasica" TEXT NOT NULL,
    "descricaoAdicional" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Situacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "TiposLancamentos_nome_key" ON "TiposLancamentos"("nome");
