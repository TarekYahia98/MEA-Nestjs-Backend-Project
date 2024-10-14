import { FactoryProvider, Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getConnectionToken } from '@nestjs/mongoose';
import { categorySchemaFactory } from 'src/category/category.schema';
import { ModelNames } from 'src/common/constants';

const CategoryMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.CATEGORY,
  inject: [getConnectionToken(), EventEmitter2],
  useFactory: categorySchemaFactory,
};

const categoryProviders = [CategoryMongooseDynamicModule];

@Module({
  imports: [],
  providers: categoryProviders,
  exports: categoryProviders,
})
export class CategoryMongooseModule {}