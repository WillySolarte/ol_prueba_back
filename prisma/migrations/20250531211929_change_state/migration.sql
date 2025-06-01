/*
  Warnings:

  - The `estado` column on the `Comerciante` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Comerciante" DROP COLUMN "estado",
ADD COLUMN     "estado" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "Estado";
