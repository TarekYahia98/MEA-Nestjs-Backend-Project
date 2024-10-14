import { FactoryProvider, Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/constants';
import { pendingUserSchemaFactory } from 'src/user/schemas/pending-user';

const PendingUserMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.PENDING_USER,
  inject: [getConnectionToken()],
  useFactory: pendingUserSchemaFactory,
};

const pendingUserProviders = [PendingUserMongooseDynamicModule];

@Module({
  imports: [],
  providers: pendingUserProviders,
  exports: pendingUserProviders,
})
export class PendingUserMongooseModule {}