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

  async deleteItem(id:number) {
    const deletedItem=await prisma.menu_item.findUnique({where:{item_id:id}})
    if (!deletedItem){
      throw new NotFoundException(`menu item with id : ${id}`)
    } 
    await prisma.menu_item.delete({where:{item_id:id}}) 
    return {message:"item deleted successfuly"}   
  }

  findOne(id: number) {
    return `This action returns a #${id} menuManage`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} menuManage`;
  }
}
