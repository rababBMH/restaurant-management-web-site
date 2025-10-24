import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/create-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
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


@ApiBearerAuth() 
@ApiOperation({summary:'get restaurant Info'})
@ApiResponse({status:200,description:"page loaded succussfully"})
@ApiResponse({status:401,description:"Unauthorized"})
@Get('getRestaurantPage')
  getrestaurantInfo(@Request() req) :any {
    return this.profileService.getProfileInfo(req.user.restaurant_id)
  }
  



@ApiBearerAuth() 
@ApiOperation({summary:'get restaurant page'})
@ApiResponse({status:200,description:"page loaded succussfully"})
@ApiResponse({status:401,description:"Unauthorized"})
@Get('getRestaurantMenu')
  getrestaurantmenu(@Request() req,@Body() category:string) :any {
    return this.profileService.getMenuByCategory(req.user.restaurant_id,category)
  }

@ApiBearerAuth() 
@ApiOperation({summary:'get restaurant page'})
@ApiResponse({status:200,description:"page loaded succussfully"})
@ApiResponse({status:401,description:"Unauthorized"})
@Get('getRestaurantMenuforAdmin')
  getrestaurantmenuforAdmin(@Request() req,@Body() category:string) :any {
    return this.profileService.getMenuByCategoryforAdmin(req.user.restaurant_id,category)
  }  

@ApiBearerAuth() 
@ApiOperation({summary:'get restaurant settings'})
@ApiResponse({status:200,description:"settings loaded succussfully"})
@ApiResponse({status:401,description:"Unauthorized"})
@Get('getSettingsrestaurant')
  getSettings(@Request () req) :any {
    return this.profileService.getSettings(req.user.restaurant_id)
  }  

@ApiBearerAuth() 
@ApiOperation({summary:'update restaurant settings'})
@ApiResponse({status:200,description:"settings updated succussfully"})
@ApiResponse({status:401,description:"Unauthorized"})
@Patch('updateSettingsrestaurant')
  updateSettings(@Request () req,@Body() profile:ProfileDto) :any {
    return this.profileService.updateSettings(req.user.restaurant_id,profile)
  }
}