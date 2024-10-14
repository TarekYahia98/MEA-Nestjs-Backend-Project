import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserCartController } from './controllers/user-cart.controller';
import { UserCartService } from './services/user-cart.service';


@Module({
  imports: [SharedModule],
  controllers: [UserCartController],
  providers: [UserCartService],
})
export class CartModule {}