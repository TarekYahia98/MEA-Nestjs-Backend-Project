// import { FactoryProvider, Module } from '@nestjs/common';
// import { getConnectionToken } from '@nestjs/mongoose';
// import { ModelNames } from 'src/common/constants';

// const AdminMongooseDynamicModule: FactoryProvider = {
//   provide: ModelNames.ADMIN,
//   inject: [getConnectionToken()],
//   useFactory: adminSchemaFactory,
// };

// const adminProviders = [AdminMongooseDynamicModule];

// @Module({
//   imports: [],
//   providers: adminProviders,
//   exports: adminProviders,
// })
// export class AdminMongooseModule {}