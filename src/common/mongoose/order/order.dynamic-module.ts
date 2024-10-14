import { FactoryProvider, Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/constants';

const OrderMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.ORDER,
  inject: [getConnectionToken(), EventEmitter2],
  useFactory: orderSchemaFactory,
};

const orderProviders = [OrderMongooseDynamicModule];

@Module({
  imports: [],
  providers: orderProviders,
  exports: orderProviders,
})
export class OrderMongooseModule {}