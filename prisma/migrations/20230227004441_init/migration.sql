/*
  Warnings:

  - A unique constraint covering the columns `[Nome]` on the table `TiposLancamentos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TiposLancamentos_Nome_key" ON "TiposLancamentos"("Nome");
