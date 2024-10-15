import { FactoryProvider, Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ModelNames } from 'src/common/constants';
import { supplierSchemaFactory } from 'src/supplier/schemas/supplier.schema';

const SupplierMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.SUPPLIER,
  inject: [getConnectionToken(), EventEmitter2],
  useFactory: supplierSchemaFactory,
};

const supplierProviders = [SupplierMongooseDynamicModule];

@Module({
  imports: [],
  providers: supplierProviders,
  exports: supplierProviders,
})
export class SupplierMongooseModule {}