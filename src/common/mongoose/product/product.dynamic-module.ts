import { FactoryProvider, Module, forwardRef } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/constants';
import { baseProductSchemaFactory } from 'src/product/schemas/product.schema';


const ProductMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.BASE_PRODUCT,
  inject: [getConnectionToken(), EventEmitter2],
  useFactory: baseProductSchemaFactory,
};

const productProviders = [ProductMongooseDynamicModule];

@Module({
  imports: [forwardRef(() => ProductMongooseModule)],
  providers: productProviders,
  exports: productProviders,
})
export class ProductMongooseModule {}