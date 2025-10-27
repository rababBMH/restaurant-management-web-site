-- DropForeignKey
ALTER TABLE "public"."Order_item" DROP CONSTRAINT "Order_item_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "stutus" SET DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE "Order_item" ADD CONSTRAINT "Order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;
