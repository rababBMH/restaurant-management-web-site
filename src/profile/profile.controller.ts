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
 @Patch('createProfile')
  update( @Body() ProfileDto: ProfileDto,@Request() req) {
    return this.profileService.createProfile(ProfileDto,req.user.email);
  }

}
