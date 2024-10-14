import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserAuthController } from './controllers/user-auth.controller';

@Module({
  imports: [PassportModule.register({ session: false, property: 'persona' })],
  controllers: [UserAuthController],
  providers: [
    // UserAuthService,
    // RefreshTokenStrategyService,
    // RefreshTokenStrategy,
    // RefreshTokenGuard,
  ],
})
export class UserModule {}