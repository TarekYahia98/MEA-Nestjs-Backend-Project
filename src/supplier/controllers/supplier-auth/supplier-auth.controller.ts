import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { CustomResponse } from 'src/common/classes';
import { IsPrivateAuthOrPublic, Persona } from 'src/common/decorators';
import { SupplierJwtPersona } from 'src/common/interfaces';
import { Supplier, ISupplierInstanceMethods } from 'src/supplier/schemas';
import { SupplierAuthService } from 'src/supplier/services/supplier-auth/supplier-auth.service';
import { ForgetPasswordDto } from 'src/user/dtos/forget-passwrod.dto';
import { ResetPasswordDto } from 'src/user/dtos/reset-password.dto';
import { VerifyEmailDto } from 'src/user/dtos/verify-email.dto';
import { RefreshTokenGuard } from 'src/user/guards/refresh-token.guard';
import { IRefreshTokenPayload } from 'src/user/strategies/refresh-token/refresh-token-strategy-payload.interface';

@Controller('auth')
@ApiTags('supplier-auth')
export class SupplierAuthController {
  constructor(private readonly supplierAuthService: SupplierAuthService) {}

  @IsPrivateAuthOrPublic()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'generate refresh token' })
  @UseGuards(RefreshTokenGuard)
  @Post('private-auth/refresh-token')
  async refreshToken(@Persona() payload: IRefreshTokenPayload) {
    // const supplier = await this.supplierAuthService.refreshSupplierTokens(payload);

    return new CustomResponse().success({
    //   payload: { data: supplier },
      localizedMessage: {
        en: 'Token refreshed successfully',
        ar: 'تم تحديث الرقم السري بنجاح',
      },
      event: 'TOKEN_REFRESHED_SUCCESS',
    });
  }

  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'login via email' })
//   @UseGuards(LoginEmailGuard)
  @Post('public/login-email')
  async loginSupplier(
    @Persona() supplier: HydratedDocument<Supplier, ISupplierInstanceMethods>,
    // @Body() body: LoginEmailDto,
  ) {
    // const LoggedInSupplier = await this.supplierAuthService.loginByEmail(supplier, body);

    return new CustomResponse().success({
    //   payload: { data: LoggedInSupplier },
    });
  }

  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'forget password via email' })
  @Post('public/forget-password')
  async forgetPassword(@Body() body: ForgetPasswordDto) {
    // await this.supplierAuthService.forgetPassword(body);

    return new CustomResponse().success({});
  }

  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'verify forget password via email' })
  @Post('public/verify-forget-password-email')
  async verifyForgetPasswordEmail(@Body() body: VerifyEmailDto) {
    // const accessToken = await this.supplierAuthService.verifyForgetPasswordEmail(body);

    return new CustomResponse().success({
    //   payload: { data: { accessToken } },
    });
  }

  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'reset password via email' })
  @Post('private-auth/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    // await this.supplierAuthService.resetPassword(body);

    return new CustomResponse().success({});
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'reset password for first login' }) // optional in case admin will create vendor (supplier) account
  @Post('login-reset-password')
  async loginResetPassword(@Persona() persona: SupplierJwtPersona, 
//   @Body() body: NewPasswordDto
) {
    // await this.supplierAuthService.loginResetPassword(persona, body);

    return new CustomResponse().success({});
  }
}