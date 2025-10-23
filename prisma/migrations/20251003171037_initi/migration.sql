/*
  Warnings:

  - You are about to drop the column `Time_working` on the `Restaurant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."WorkingHour" DROP CONSTRAINT "WorkingHour_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "public"."Restaurant" DROP COLUMN "Time_working",
ALTER COLUMN "Stutus" SET DEFAULT 'closed';

-- CreateTable
CREATE TABLE "public"."otp" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."WorkingHour" ADD CONSTRAINT "WorkingHour_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."Restaurant"("restaurant_id") ON DELETE CASCADE ON UPDATE CASCADE;
