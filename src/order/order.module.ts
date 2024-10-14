import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserOrderController } from './controllers/user-order.controller';
import { UserOrderService } from './services/user-order.service';


@Module({
  imports: [SharedModule],
  controllers: [UserOrderController],
  providers: [UserOrderService],
})
export class CartModule {}