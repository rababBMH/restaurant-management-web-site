-- CreateTable
CREATE TABLE "public"."Restaurant" (
    "restaurant_id" SERIAL NOT NULL,
    "restaurant_name" TEXT NOT NULL,
    "Description" TEXT,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "Stutus" TEXT NOT NULL,
    "Time_working" TIMESTAMP(3) NOT NULL,
    "facebook_url" TEXT,
    "Instagram_url" TEXT,
    "Tiktok_url" TEXT,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("restaurant_id")
);

-- CreateTable
CREATE TABLE "public"."QRCode" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "restaurant_url" TEXT NOT NULL,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Menu_item" (
    "item_id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "number_of_orders" INTEGER NOT NULL,

    CONSTRAINT "Menu_item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "order_id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "table_number" INTEGER NOT NULL,
    "stutus" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "public"."Order_item" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "Description" TEXT,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WorkingHour" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkingHour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_phone_number_key" ON "public"."Restaurant"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_email_key" ON "public"."Restaurant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_facebook_url_key" ON "public"."Restaurant"("facebook_url");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_Instagram_url_key" ON "public"."Restaurant"("Instagram_url");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_Tiktok_url_key" ON "public"."Restaurant"("Tiktok_url");

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_restaurant_id_key" ON "public"."QRCode"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_restaurant_url_key" ON "public"."QRCode"("restaurant_url");

-- AddForeignKey
ALTER TABLE "public"."QRCode" ADD CONSTRAINT "QRCode_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."Restaurant"("restaurant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Menu_item" ADD CONSTRAINT "Menu_item_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."Restaurant"("restaurant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."Restaurant"("restaurant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_item" ADD CONSTRAINT "Order_item_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."Restaurant"("restaurant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkingHour" ADD CONSTRAINT "WorkingHour_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."Restaurant"("restaurant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
