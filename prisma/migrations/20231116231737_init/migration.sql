-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" TIMESTAMP(3),
    "update_at" TIMESTAMP(3),
    "nome" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "token" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bancos" (
    "id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" TIMESTAMP(3),
    "update_at" TIMESTAMP(3),
    "nome" TEXT NOT NULL,

    CONSTRAINT "Bancos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contas" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" TIMESTAMP(3),
    "codigoBanco" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "saldoInicial" DOUBLE PRECISION NOT NULL,
    "saldoAtual" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Contas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lancamentos" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" TIMESTAMP(3),
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contasId" INTEGER NOT NULL,
    "contasNome" TEXT NOT NULL,
    "dataPagamento" TIMESTAMP(3),
    "tipo" INTEGER NOT NULL,
    "situacao" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Lancamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConciliacaoBancaria" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" TIMESTAMP(3),
    "update_at" TIMESTAMP(3),
    "fitID" TEXT NOT NULL,
    "tipoOperacao" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "especieTransacao" TEXT NOT NULL,
    "contasId" INTEGER NOT NULL,
    "tagsId" INTEGER,

    CONSTRAINT "ConciliacaoBancaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" TIMESTAMP(3),
    "fitID" TEXT,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lancamentos_tags" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" TIMESTAMP(3),
    "tagsId" INTEGER NOT NULL,
    "lancamentosId" INTEGER NOT NULL,

    CONSTRAINT "lancamentos_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- AddForeignKey
ALTER TABLE "Contas" ADD CONSTRAINT "Contas_codigoBanco_fkey" FOREIGN KEY ("codigoBanco") REFERENCES "Bancos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamentos" ADD CONSTRAINT "Lancamentos_contasId_fkey" FOREIGN KEY ("contasId") REFERENCES "Contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConciliacaoBancaria" ADD CONSTRAINT "ConciliacaoBancaria_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConciliacaoBancaria" ADD CONSTRAINT "ConciliacaoBancaria_contasId_fkey" FOREIGN KEY ("contasId") REFERENCES "Contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamentos_tags" ADD CONSTRAINT "lancamentos_tags_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lancamentos_tags" ADD CONSTRAINT "lancamentos_tags_lancamentosId_fkey" FOREIGN KEY ("lancamentosId") REFERENCES "Lancamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
