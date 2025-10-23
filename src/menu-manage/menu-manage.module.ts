import { Module } from '@nestjs/common';
import { MenuManageService } from './menu-manage.service';
import { MenuManageController } from './menu-manage.controller';

@Module({
  controllers: [MenuManageController],
  providers: [MenuManageService],
})
export class MenuManageModule {}
