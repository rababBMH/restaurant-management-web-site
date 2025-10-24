import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/create-profile.dto';  
import { categoryDto } from './dto/create-profile.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()

export class ProfileService {

  async createProfile(profile:ProfileDto,email:string){
    const{Description,phone_number,location,facebook_url,Instagram_url,Tiktok_url}=profile;
    const user=await prisma.restaurant.findUnique({where:{email}})
    if(!user){
      throw new NotFoundException('User not found');
    }
    await prisma.restaurant.update({where:{email},data:{Description:Description,phone_number:phone_number,location:location,facebook_url:facebook_url,Instagram_url:Instagram_url,Tiktok_url:Tiktok_url}})
  }
  async getProfileInfo(restaurant_id:number){
    const restaurant=await prisma.restaurant.findUnique({where:{restaurant_id}})
    if(!restaurant){
      throw new NotFoundException("restaurant not found")
    }

    return({restaurant_name:restaurant.restaurant_name,
      Description:restaurant.Description,
      status:restaurant.Stutus}) 
      

    
}
  async getMenuByCategory(restaurant_id: number, categoryDto: categoryDto) {
  let menuCategory;
  const { category } = categoryDto||{category:"all"};
  if (category === "all") {
    menuCategory = await prisma.menu_item.findMany({
      where: { restaurant_id, Isavailable: true },
    });
  } else {
    menuCategory = await prisma.menu_item.findMany({
      where: { restaurant_id, category, Isavailable: true },
    });
  }

  if (menuCategory.length === 0) {
    return { message: `No ${category} menu items today for this restaurant` };
  }

  return menuCategory.map((item) => ({
    item_id: item.item_id,
    item_name: item.item_name,
    price: item.price,
    description: item.description,
    image_url: item.image_url,
  }));
}
  async getMenuByCategoryforAdmin(restaurant_id: number, categoryDto: categoryDto) {
  let menuCategory;
  const { category } = categoryDto; 
  if (category === "all") {
    menuCategory = await prisma.menu_item.findMany({
      where: { restaurant_id},
    });
  } else {
    menuCategory = await prisma.menu_item.findMany({
      where: { restaurant_id, category},
    });
  }

  if (menuCategory.length === 0) {
    return { message: `No ${category} menu items today for this restaurant` };
  }

  return menuCategory.map((item) => ({
    item_id: item.item_id,
    item_name: item.item_name,
    price: item.price,
    description: item.description,
    category: item.category,
    image_url: item.image_url,
    number_of_orders: item.number_of_orders,
  }));
}


async getSettings(restaurant_id:number){
  const restaurant=await prisma.restaurant.findUnique({where:{restaurant_id:restaurant_id}})
  if(!restaurant){
    throw new NotFoundException("restaurant not found")
  }
  const {
    restaurant_name,
    location,
    phone_number,
    facebook_url,
    Instagram_url,
    Tiktok_url,
    Description,
    email,
  } = restaurant;
  return {
    restaurant_name,
    location,
    phone_number,
    facebook_url,
    Instagram_url,
    Tiktok_url,
    Description,
    email,
  };
}
async updateSettings(restaurant_id:number,profile:UpdateProfileDto){
  const{restaurant_name,Description,phone_number,location,facebook_url,Instagram_url,Tiktok_url}=profile;
  const restaurant=await prisma.restaurant.findUnique({where:{restaurant_id}})
  if(!restaurant){
    throw new NotFoundException("restaurant not found")
  }
  await prisma.restaurant.update({where:{restaurant_id},data:{restaurant_name,Description,phone_number,location,facebook_url,Instagram_url,Tiktok_url}})
}}
