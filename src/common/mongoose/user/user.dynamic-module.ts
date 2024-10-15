import { FactoryProvider, Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getConnectionToken } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/constants';
import { userSchemaFactory } from 'src/user/schemas/user.schema';

const UserMongooseDynamicModule: FactoryProvider = {
  provide: ModelNames.USER,
  inject: [getConnectionToken(), EventEmitter2],
  useFactory: userSchemaFactory,
};

const userProviders = [UserMongooseDynamicModule];

@Module({
  // imports: [MongooseCommonModule.forRoot()],
  providers: userProviders,
  exports: userProviders,
})
export class UserMongooseModule {}