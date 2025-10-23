/*
  Warnings:

  - You are about to drop the column `available` on the `Menu_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Menu_item" DROP COLUMN "available",
ADD COLUMN     "Isavailable" BOOLEAN NOT NULL DEFAULT true;
