/*
  Warnings:

  - You are about to drop the column `municipio` on the `Comerciante` table. All the data in the column will be lost.
  - Added the required column `municipioId` to the `Comerciante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comerciante" DROP COLUMN "municipio",
ADD COLUMN     "municipioId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Municipio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Municipio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Municipio_nombre_key" ON "Municipio"("nombre");

-- AddForeignKey
ALTER TABLE "Comerciante" ADD CONSTRAINT "Comerciante_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
