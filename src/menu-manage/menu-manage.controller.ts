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

  
  @Delete('Delete-Item/:item_id')
  @ApiBearerAuth()
  @ApiOperation({summary:"delete a menu item"})
  @ApiResponse({status:201,description:"deleted successfuly"})
  @ApiResponse({status:400,description:"failed to delete Item"})
  DeleteOne(@Param('item_id') item_id:number) {
    return this.menuManageService.deleteItem(Number(item_id));
  }

  @Patch('Update-Item/:item_id')
  @ApiBearerAuth()
  @ApiOperation({summary:"update a menu item"})
  @ApiResponse({status:201,description:"updated successfuly"})
  @ApiResponse({status:400,description:"failed to update Item"})
  UpdateOne(@Param('item_id') id: number, @Body() updatedItemDto:CreateMenuManageDto) {
    return this.menuManageService.updateItem(updatedItemDto,Number(id));
  }

  @Patch('Mark-Item-Availability')
  @ApiBearerAuth()
  @ApiOperation({summary:"mark item availability"})
  @ApiResponse({status:201,description:"item availability updated successfuly"})
  @ApiResponse({status:400,description:"failed to update item availability"})
  MarkAvailability(@Param('id') id: number, @Body('isAvailable') isAvailable:boolean) {
    return this.menuManageService.markItemAvailability(id,isAvailable);
  }
}
