-- CreateTable
CREATE TABLE "Envolvidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME NOT NULL,
    "Nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TiposLancamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "Nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME NOT NULL,
    "Nome" TEXT NOT NULL,
    "TiposLancamentosID" INTEGER NOT NULL,
    CONSTRAINT "Categorias_TiposLancamentosID_fkey" FOREIGN KEY ("TiposLancamentosID") REFERENCES "TiposLancamentos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subcategorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME NOT NULL,
    "Nome" TEXT NOT NULL,
    "CategoriasID" INTEGER NOT NULL,
    CONSTRAINT "Subcategorias_CategoriasID_fkey" FOREIGN KEY ("CategoriasID") REFERENCES "Categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME NOT NULL,
    "Nome" TEXT NOT NULL,
    "SaldoInicial" REAL NOT NULL,
    "SaldoAtual" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Lancamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME NOT NULL,
    "Nome" TEXT NOT NULL,
    "Data" DATETIME NOT NULL,
    "DataPagamento" DATETIME NOT NULL,
    "DescricaoBasica" TEXT NOT NULL,
    "DescricaoAdicional" TEXT NOT NULL,
    "Valor" REAL NOT NULL,
    "Situacao" INTEGER NOT NULL,
    "EnvolvidosID" INTEGER NOT NULL,
    "ContasID" INTEGER NOT NULL,
    "CategoriasID" INTEGER NOT NULL,
    "SubcategoriasID" INTEGER NOT NULL,
    CONSTRAINT "Lancamentos_EnvolvidosID_fkey" FOREIGN KEY ("EnvolvidosID") REFERENCES "Envolvidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_ContasID_fkey" FOREIGN KEY ("ContasID") REFERENCES "Contas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_CategoriasID_fkey" FOREIGN KEY ("CategoriasID") REFERENCES "Categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lancamentos_SubcategoriasID_fkey" FOREIGN KEY ("SubcategoriasID") REFERENCES "Subcategorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
