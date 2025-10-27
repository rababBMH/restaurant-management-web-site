import { Injectable, Res } from '@nestjs/common';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from '@prisma/client';
import express from 'express';
const prisma = new PrismaClient();
@Injectable()
export class OrdersService {
  async createOrder(createOrderDto: CreateOrderDto,restaurant_id:number,items:OrderItemDto[],@Res() res: express.Response) {
    const { table_number, total_price } = createOrderDto;
    const order=await prisma.order.create({
      data: {
        restaurant_id,
        table_number,
        stutus:"pending",
        total_price,
      },
    });
    res.cookie("order_id",order.order_id,{httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    const orderItemDate=items.map((item)=>({
      order_id:order.order_id,
      menu_item_id: item.menu_item_id,
      quantity:item.quantity
    }))
    await prisma.order_item.createMany({
      data:orderItemDate
    })
    const addedTransactions=await prisma.transaction.create({
      data:{
        restaurant_id:restaurant_id,
        amount:total_price,
        type:"income",
        category:"order",
        Description:`New order with id ${order.order_id} created`,
      }
    })
    return res.status(201).json({
    message: "Order created successfully",
    order_id: order.order_id,
  });
  }
  async addItems(order_id:number,items:OrderItemDto[]){
    const orderItemDate=items.map((item)=>({
      order_id:order_id,
      menu_item_id: item.menu_item_id,
      quantity:item.quantity
    }))
    await prisma.order_item.createMany({
      data:orderItemDate
    })
    return {message:"items added successfully"}
  }
  async getMyOrders(order_id:number) {
   const myOrder = await prisma.order.findUnique({
    where: { order_id },
    include: {
      order_items: {
        include: {
          Menu_order: true,
        },
      },
     
    },
  });
;
if(!myOrder){
  return {message:"no orders found for this order id"}
} else{
    const result={
    order_id: myOrder.order_id,
    table_number: myOrder.table_number,
    stutus: myOrder.stutus,
    total_price: myOrder.total_price,
    time: myOrder.time,
    order_items: myOrder.order_items.map(item => ({
      quantity: item.quantity,
      Menu_order: {
        item_name: item.Menu_order.item_name,
        price: item.Menu_order.price,
      },
    })),  
     };
     return result;
  }
  }

   async getMyOrdersforAdmin(restaurant_id:number) {
   const myOrderAdmin = await prisma.restaurant.findUnique({
    where: { restaurant_id },
    include: {
      orders: {
        where: {
          NOT: {
            stutus: "finished",
          },
          },
        orderBy: {
            time: 'asc', 
          },
        include: {
          order_items:{
            include:{
              Menu_order:true
            }
          }
        },
      },
     
    },
  });
;
  if(!myOrderAdmin){
    return {message:"no orders found for this restaurant"}
  } else{ 
      const result = {
        restaurant_id: myOrderAdmin.restaurant_id,
        restaurant_name: myOrderAdmin.restaurant_name,
        orders: myOrderAdmin.orders.map(order => ({
          order_id: order.order_id,
          table_number: order.table_number,
          stutus: order.stutus,
          total_price: order.total_price,
          time: order.time,
          order_items: order.order_items.map(item => ({
            quantity: item.quantity,
            Menu_order: {
              item_name: item.Menu_order.item_name,
              price: item.Menu_order.price,
            },
          })),
        })),
      };
      return result;
      }
      }

  //update order status    
  async changeStatus(order_id:number,status:string){
    const order=await prisma.order.findUnique({where:{order_id}})
    if(!order){
      return {message:"order not found"}
    }
    await prisma.order.update({where:{order_id},data:{stutus:status}})
    return {message:"order status updated successfully"}
  }  
  ;
}