/*
  Warnings:

  - You are about to drop the `QRCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."QRCode" DROP CONSTRAINT "QRCode_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "Qrcode" TEXT;

-- DropTable
DROP TABLE "public"."QRCode";
