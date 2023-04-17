-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lancamentos_tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletede_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "tagsId" INTEGER NOT NULL,
    "lancamentosId" INTEGER NOT NULL,
    CONSTRAINT "lancamentos_tags_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "lancamentos_tags_lancamentosId_fkey" FOREIGN KEY ("lancamentosId") REFERENCES "Lancamentos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_lancamentos_tags" ("id", "lancamentosId", "tagsId") SELECT "id", "lancamentosId", "tagsId" FROM "lancamentos_tags";
DROP TABLE "lancamentos_tags";
ALTER TABLE "new_lancamentos_tags" RENAME TO "lancamentos_tags";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
