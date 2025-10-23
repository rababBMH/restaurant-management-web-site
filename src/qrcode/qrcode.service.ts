import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrcodeService {
  async generateRestaurantQr(restaurantId: string): Promise<string> {
    const url = `https://myapp.com/restaurant/${restaurantId}`;
    return await QRCode.toDataURL(url);
  }
}

