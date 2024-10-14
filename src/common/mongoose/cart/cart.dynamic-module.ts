import { FactoryProvider, Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/constants';

const CartMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.CART,
  inject: [getConnectionToken(), EventEmitter2],
  useFactory: cartSchemaFactory,
};

const cartProviders = [CartMongooseDynamicModule];

@Module({
  imports: [],
  providers: cartProviders,
  exports: cartProviders,
})
export class CartMongooseModule {}