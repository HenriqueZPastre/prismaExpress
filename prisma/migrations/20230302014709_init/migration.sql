/*
  Warnings:

  - Added the required column `nome` to the `Situacao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Situacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME,
    "nome" TEXT NOT NULL
);
INSERT INTO "new_Situacao" ("create_at", "deletede_at", "id") SELECT "create_at", "deletede_at", "id" FROM "Situacao";
DROP TABLE "Situacao";
ALTER TABLE "new_Situacao" RENAME TO "Situacao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
