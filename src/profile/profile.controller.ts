import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request, Query} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/create-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto/create-profile.dto';  
import { categoryDto } from './dto/create-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { promises } from 'dns';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

 @UseGuards(AuthGuard('jwt'))
 @ApiBearerAuth() 
 @ApiOperation({ summary: 'Create restaurant profile' })
 @ApiResponse({ status: 200, description: 'Profile created successful' })
 @ApiResponse({ status: 401, description: 'Unauthorized' })
 @Post('createProfile')
  create( @Body() ProfileDto: ProfileDto,@Request() req) {
    return this.profileService.createProfile(ProfileDto,req.user.email);
  }

@ApiOperation({summary:'get restaurant Info'})
@ApiResponse({status:200,description:"page loaded succussfully"})
@ApiResponse({status:401,description:"Unauthorized"})
@Get('getRestaurantPage/:restaurant_id')
  async getrestaurantInfo(@Param('restaurant_id') restaurant_id:number,@Query('category') category: categoryDto) :Promise<any> {
    const info = await this.profileService.getProfileInfo(Number(restaurant_id));
    const menu = await this.profileService.getMenuByCategory(Number(restaurant_id),category);
    return {info, menu};
  }


@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth() 
@ApiOperation({summary:'get restaurant page'})
@ApiResponse({status:200,description:"page loaded succussfully"})
@ApiResponse({status:401,description:"Unauthorized"})
@Get('getRestaurantMenuforAdmin')
  getrestaurantmenuforAdmin(@Request() req,@Query('category') category: categoryDto) :any {
    return this.profileService.getMenuByCategoryforAdmin(req.user.restaurant_id,category)
  }  
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth() 
@ApiOperation({summary:'get restaurant settings'})
@ApiResponse({status:200,description:"settings loaded succussfully"})
@ApiResponse({status:401,description:"Unauthorized"})
@Get('getSettingsrestaurant')
  getSettings(@Request () req) :any {
    return this.profileService.getSettings(req.user.restaurant_id)
  }  
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth() 
@ApiOperation({summary:'update restaurant settings'})
@ApiResponse({status:200,description:"settings updated succussfully"})
@ApiResponse({status:401,description:"Unauthorized"})
@Patch('updateSettingsrestaurant')
  updateSettings(@Request () req,@Body() profile:UpdateProfileDto) :any {
    return this.profileService.updateSettings(req.user.restaurant_id,profile)
  }
}