import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupplierAuthController } from './controllers/supplier-auth/supplier-auth.controller';
import { SupplierAuthService } from './services/supplier-auth/supplier-auth.service';
import { SupplierProfileController } from './controllers/supplier-profile/supplier-profile.controller';
import { SupplierProfileService } from './services/supplier-profile/supplier-profile.service';

@Module({
  imports: [PassportModule.register({ session: false, property: 'persona' })],
  controllers: [SupplierAuthController , SupplierProfileController],
  providers: [
    SupplierAuthService,
    SupplierProfileService
    // RefreshTokenStrategyService,
    // RefreshTokenStrategy,
    // RefreshTokenGuard,
  ],
})
export class UserModule {}