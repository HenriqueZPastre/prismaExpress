-- AlterTable
ALTER TABLE "Tags" ADD COLUMN "fitID" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ConciliacaoBancaria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "update_at" DATETIME,
    "fitID" TEXT NOT NULL,
    "tipoOperacao" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "valor" REAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "especieTransacao" TEXT NOT NULL,
    "contasId" INTEGER NOT NULL,
    "tagsId" INTEGER,
    CONSTRAINT "ConciliacaoBancaria_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ConciliacaoBancaria_contasId_fkey" FOREIGN KEY ("contasId") REFERENCES "Contas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ConciliacaoBancaria" ("contasId", "create_at", "data", "deletede_at", "descricao", "especieTransacao", "fitID", "id", "tipoOperacao", "update_at", "valor") SELECT "contasId", "create_at", "data", "deletede_at", "descricao", "especieTransacao", "fitID", "id", "tipoOperacao", "update_at", "valor" FROM "ConciliacaoBancaria";
DROP TABLE "ConciliacaoBancaria";
ALTER TABLE "new_ConciliacaoBancaria" RENAME TO "ConciliacaoBancaria";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
