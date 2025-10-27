import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create a new order and store order_id in cookie' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post(':createOrder/:restaurant_id')
  create(@Body() createOrderDto: CreateOrderDto ,@Param('restaurant_id') restaurant_id:number, @Res() res) {
    const { items } = createOrderDto;
    return this.ordersService.createOrder(createOrderDto,Number(restaurant_id),items,res);
  }

  @ApiOperation({ summary: 'Add items to an existing order' })
  @ApiResponse({ status: 201, description: 'Items added successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('add-items/:order_id')
  addItems(@Param('order_id') order_id:number, @Body() body) {
    const { items } = body;
    return this.ordersService.addItems(Number(order_id),items);
  }


  @ApiOperation({ summary: 'Get my orders using order_id from cookie' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Orders not found' })
  @Get('my-orders/:order_id')
  getMyOrders(@Param('order_id') order_id:number) {
    return this.ordersService.getMyOrders(Number(order_id));
  }

  @ApiOperation({ summary: 'Get all orders for admin by restaurant_id' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Orders not found' })
  @Get('my-orders-admin/:restaurant_id')
  getMyOrdersforAdmin(@Param('restaurant_id') restaurant_id:number) {
    return this.ordersService.getMyOrdersforAdmin(Number(restaurant_id));
  }

  @ApiOperation({ summary: 'Update order status by order_id' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @Patch('update-order-status/:order_id')
  updateOrderStatus(@Param('order_id') order_id:number, @Body() body) {
    const { status } = body;
    return this.ordersService.changeStatus(Number(order_id),status);
  }
}
