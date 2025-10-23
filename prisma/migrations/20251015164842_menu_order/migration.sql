/*
  Warnings:

  - Added the required column `menu_item_id` to the `Order_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order_item" ADD COLUMN     "menu_item_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order_item" ADD CONSTRAINT "Order_item_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "Menu_item"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;
