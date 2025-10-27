import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ProfileModule } from './profile/profile.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { MenuManageModule } from './menu-manage/menu-manage.module';
import { OrdersModule } from './orders/orders.module';
import { TransactionsModule } from './transactions/transactions.module';


@Module({
  imports: [AuthModule, MailModule, ProfileModule, QrcodeModule, MenuManageModule, OrdersModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
