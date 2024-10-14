import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { CustomResponse } from 'src/common/classes';
import { IsPrivateAuthOrPublic, Persona } from 'src/common/decorators';
import { User } from '../schemas';
import { ForgetPasswordDto } from '../dtos/forget-passwrod.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { SignupUserDto } from '../dtos/signup-user.dto';
import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { UserAuthService } from '../services/user-auth.service';
import { LoginPhoneNumberDto } from '../dtos/login-phoneNumber.dto';
import { LoginPhoneNumberGuard } from '../guards/login-phoneNumber.guard';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { IRefreshTokenPayload } from '../strategies/refresh-token/refresh-token-strategy-payload.interface';

@Controller('auth')
@ApiTags('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @IsPrivateAuthOrPublic()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'generate refresh token' })
  @UseGuards(RefreshTokenGuard)
  @Post('private-auth/refresh-token')
  async refreshToken(@Persona() payload: IRefreshTokenPayload) {
    const user = await this.userAuthService.refreshUserTokens(payload);

    return new CustomResponse().success({
      payload: { data: user },
      localizedMessage: {
        en: 'Token refreshed successfully',
        ar: 'تم تحديث الرقم السري بنجاح',
      },
      event: 'TOKEN_REFRESHED_SUCCESS',
    });
  }

  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'login via phoneNumber' })
  @UseGuards(LoginPhoneNumberGuard)
  @Post('public/login-phoneNumber')
  async loginUser(@Persona() user: HydratedDocument<User>, @Body() body: LoginPhoneNumberDto) {
    return new CustomResponse().success({
      payload: { data: user },
    });
  }

  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'signup via phoneNumber' })
  @Post('public/signup-phoneNumber')
  async signupUser(@Body() body: SignupUserDto) {
    const pendingUser = await this.userAuthService.signupUser(body);

    return new CustomResponse().success({
      payload: { data: pendingUser },
    });
  }

  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'verify signup via email' })
  @Post('public/verify-signup-email')
  async verifyEmail(@Body() body: VerifyEmailDto) {
    const user = await this.userAuthService.verifySignupEmailVerificationCode(body);

    return new CustomResponse().success({
      payload: { data: user },
    });
  }

  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'forget password via email' })
  @Post('public/forget-password')
  async forgetPassword(@Body() body: ForgetPasswordDto) {
    await this.userAuthService.forgetPassword(body);

    return new CustomResponse().success({});
  }

  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'verify forget password via email' })
  @Post('public/verify-forget-password-email')
  async verifyForgetPasswordEmail(@Body() body: VerifyEmailDto) {
    const accessToken = await this.userAuthService.verifyForgetPasswordEmail(body);

    return new CustomResponse().success({
      payload: { data: { accessToken } },
    });
  }

  @IsPrivateAuthOrPublic()
  @ApiOperation({ summary: 'reset password via email' })
  @Post('private-auth/reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    await this.userAuthService.resetPassword(body);

    return new CustomResponse().success({});
  }
}