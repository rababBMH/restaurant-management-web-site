import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuManageDto } from './dto/create-menu-manage.dto';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from 'rxjs';

const prisma=new PrismaClient();
@Injectable()
export class MenuManageService {
  async createItem(createMenuManageDto: CreateMenuManageDto,restaurant_id:number) {
    const {item_name,price,description,category,image_url}=createMenuManageDto;
    await prisma.menu_item.create({data:{restaurant_id,item_name,price,description,category,image_url,number_of_orders:0}})

}

  async deleteItem(item_id:number) {
    const deletedItem=await prisma.menu_item.findUnique({where:{item_id}})
    if (!deletedItem){
      throw new NotFoundException(`menu item with id : ${item_id}`)
    } 
    await prisma.menu_item.delete({where:{item_id}}) 
    return {message:"item deleted successfuly"}   
  }

  async updateItem(updatedItemDto:CreateMenuManageDto,item_id:number){
    const updatedItem=await prisma.menu_item.findUnique({where:{item_id}})
    if (!updatedItem){
      throw new NotFoundException(`menu item with id : ${item_id}`)
    } 
    await prisma.menu_item.update({where:{item_id},data:{
      item_name:updatedItemDto.item_name,
      price:updatedItemDto.price,
      description:updatedItemDto.description,
      category:updatedItemDto.category,
      image_url:updatedItemDto.image_url
    }})
    return {message:"item updated successfuly"}
    
  }
  async markItemAvailability(item_id:number,isAvailable:boolean){
    const item=await prisma.menu_item.findUnique({where:{item_id:item_id}})
    if(!item){
      throw new NotFoundException(`menu item with id : ${item_id}`)
    }
    await prisma.menu_item.update({where:{item_id:item_id},data:{Isavailable:isAvailable}})
    return {message:"item availability updated successfully"}
  }
}
