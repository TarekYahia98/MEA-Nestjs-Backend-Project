import { Module } from '@nestjs/common';
import { AdminMongooseModule } from 'src/common/mongoose/admin/admin.dynamic-module';
import { CartMongooseModule } from 'src/common/mongoose/cart/cart.dynamic-module';
import { CategoryMongooseModule } from 'src/common/mongoose/category/category.dynamic-module';
import { OrderMongooseModule } from 'src/common/mongoose/order/order.dynamic-module';
import { ProductMongooseModule } from 'src/common/mongoose/product/product.dynamic-module';
import { SupplierMongooseModule } from 'src/common/mongoose/supplier/supplier.dynamic-module';
import { UserMongooseModule } from 'src/common/mongoose/user/user.dynamic-module';
import { AppConfig } from 'src/common/services';

const imports = [
  UserMongooseModule,
  AdminMongooseModule,
  SupplierMongooseModule,
  ProductMongooseModule,
  CartMongooseModule,
  OrderMongooseModule,
  CategoryMongooseModule,
  // AwsSESModule.registerAsync({
  //   useFactory: (appConfig: AppConfig) => ({
  //     accessKeyId: appConfig.AWS_SES_ACCESS_KEY_ID,
  //     secretAccessKey: appConfig.AWS_SES_SECRET_ACCESS_KEY,
  //     region: appConfig.AWS_SES_REGION,
  //   }),
  //   inject: [AppConfig],
  // }),
];
const providers = [];

@Module({
  imports,
  providers,
  exports: [...imports, ...providers],
})
export class SharedModule {}