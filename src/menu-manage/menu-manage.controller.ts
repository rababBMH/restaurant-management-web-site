import { Controller, Get, Post, Body, Patch, Param, Delete ,Request, UseGuards} from '@nestjs/common';
import { MenuManageService } from './menu-manage.service';
import { CreateMenuManageDto } from './dto/create-menu-manage.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller('menu-manage')
export class MenuManageController {
  constructor(private readonly menuManageService: MenuManageService) {}

  @Post('Add-Item')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({summary:"add a menu item"})
  @ApiResponse({status:201,description:"added successfuly"})
  @ApiResponse({status:400,description:"failed to add Item"})
  create(@Body() createMenuManageDto: CreateMenuManageDto,@Request() req) {
    return this.menuManageService.createItem(createMenuManageDto,req.user.restaurant_id);
  }

  
  @Delete('Delete-Item')
  @ApiBearerAuth()
  @ApiOperation({summary:"delete a menu item"})
  @ApiResponse({status:201,description:"deleted successfuly"})
  @ApiResponse({status:400,description:"failed to delete Item"})
  findAll(@Param('id') id:number) {
    return this.menuManageService.deleteItem(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuManageService.findOne(+id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuManageService.remove(+id);
  }
}
