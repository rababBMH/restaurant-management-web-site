import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileDto } from './dto/create-profile.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()

export class ProfileService {

  async createProfile(profile:ProfileDto,email:string){
    const{Description,phone_number,location,facebook_url,Instagram_url,Tiktok_url}=profile;
    const user=await prisma.Restaurant.findUnique({where:{email}})
    if(!user){
      throw new NotFoundException('User not found');
    }
    await prisma.Restaurant.update({where:{email},data:{Description:Description,phone_number:phone_number,location:location,facebook_url:facebook_url,Instagram_url:Instagram_url,Tiktok_url:Tiktok_url}})
  }
}
