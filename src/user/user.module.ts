import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserAuthController } from './controllers/user-auth.controller';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { UserAuthService } from './services/user-auth.service';
import { RefreshTokenStrategyService } from './strategies/refresh-token/refresh-token-strategy.service';
import { RefreshTokenStrategy } from './strategies/refresh-token/refresh-token.strategy';

@Module({
  imports: [PassportModule.register({ session: false, property: 'persona' })],
  controllers: [UserAuthController],
  providers: [
    UserAuthService,
    RefreshTokenStrategyService,
    RefreshTokenStrategy,
    RefreshTokenGuard,
  ],
})
export class UserModule {}