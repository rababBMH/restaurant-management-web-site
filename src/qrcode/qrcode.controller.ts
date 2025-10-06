import { Controller, Get, Param } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import {  ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Get(':restaurantId')
  @ApiParam({ name: 'restaurantId'})
  @ApiResponse({ status: 200, description: 'Generate QR code for restaurant page' })
  async getQrForRestaurant(@Param('restaurantId') restaurantId: string) {
    const qrCode = await this.qrcodeService.generateRestaurantQr(restaurantId);
    const restaurantUrl = `https://myapp.com/restaurant/${restaurantId}`;
    return {
      restaurantId,
      restaurantUrl,
      qrCode, 
    };
  }
}
