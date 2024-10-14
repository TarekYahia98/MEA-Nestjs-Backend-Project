import { FactoryProvider, Module, forwardRef } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/constants';


const ProductMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.PRODUCT,
  inject: [getConnectionToken(), EventEmitter2],
  useFactory: productSchemaFactory,
};

const productProviders = [ProductMongooseDynamicModule];

@Module({
  imports: [forwardRef(() => ProductMongooseModule)],
  providers: productProviders,
  exports: productProviders,
})
export class ProductMongooseModule {}