import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileDto } from './dto/create-profile.dto';
import { PrismaClient, Restaurant } from '@prisma/client';

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
    const restaurant=await prisma.restaurant.findUnique({where:{restaurant_id:restaurant_id}})
    if(!restaurant){
      throw new NotFoundException("restaurant not found")
    }
    

    // return restaurant.map(item=>({
    //   restaurant_name:item.restaurant_name,
    //   Description:item.Description,
    //   status:item.status
    // }))
    return({restaurant_name:restaurant.restaurant_name,
      Description:restaurant.Description,
      status:restaurant.Stutus}) 
      

    
}
    async getMenuByCategory(restaurant_id:number,category:string){
      let menuCategory;
      if (category==="all"){
       menuCategory=await prisma.menu_item.findMany({where:{restaurant_id,Isavailable:true}})
      if(!menuCategory){
      }
      else{
         menuCategory=await prisma.menu_item.findMany({where:{restaurant_id,category}})
      }
    
      if(menuCategory.length === 0){
         return {message:`No ${category} menu items today for this restaurant`}
      }
      return menuCategory.map(item=>({
        item_name:item.item_name,
        price: item.price,
        description: item.description,
        category: item.category,
        image_url: item.image_url,
        number_of_orders: item.number_of_orders,
      }))

    }
}}
