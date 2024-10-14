import { RedisService } from '@liaoliaots/nestjs-redis';
import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HydratedDocument } from 'mongoose';
import { CustomError } from 'src/common/classes';
import { ModelNames } from 'src/common/constants';
import { ErrorType } from 'src/common/enums';
import { AppConfig } from 'src/common/services';
import { IUserModel } from '../schemas';
import { BaseAuthService } from './base-auth/base-auth.service';
import { ForgetPasswordDto } from '../dtos/forget-passwrod.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { SignupUserDto } from '../dtos/signup-user.dto';
import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { PendingUser } from '../schemas/pending-user';
import { ITempAccessTokenPayload } from '../interfaces/tem-access-token.interface';
import { IRefreshTokenPayload } from '../strategies/refresh-token/refresh-token-strategy-payload.interface';

@Injectable()
export class UserAuthService extends BaseAuthService {
  constructor(
    @Inject(ModelNames.USER) private _userModel: IUserModel,
    private readonly _appConfig: AppConfig,
    private readonly _jwtService: JwtService,
    private readonly _redisService: RedisService,
    // private readonly sesService: AwsSESService,
  ) {
    super(_userModel, _appConfig, _jwtService, _redisService);
  }

  async signupUser({ name, phoneNumber, email , password }: SignupUserDto) {
    const userEmail = await this.userModel.findOne({ email: email.toLowerCase() });

    if (userEmail) {
      throw new BadRequestException(
        new CustomError({
          localizedMessage: {
            en: 'Email Already Exists',
            ar: 'البريد الإلكتروني موجود بالفعل',
          },
          event: 'EMAIL_ALREADY_EXISTS',
          errorType: ErrorType.WRONG_INPUT,
        }),
      );
    }

    const attempts = await this.redis.get(`${email}-trials`);

    if (Number(attempts) >= 3) {
      throw new ForbiddenException(
        new CustomError({
          localizedMessage: {
            en: 'You have exceeded the maximum number of attempts, please try again later',
            ar: 'لقد تجاوزت الحد الأقصى لعدد المحاولات ، يرجى المحاولة مرة أخرى لاحقًا',
          },
          event: 'MAX_ATTEMPTS_EXCEEDED',
          errorType: ErrorType.FORBIDDEN,
        }),
      );
    }

    // let pendingUser: HydratedDocument<PendingUser> = await this.pendingUserModel.findOne({
    //   email: email.toLowerCase(),
    // });

    // pendingUser = pendingUser || new this.pendingUserModel();

    // pendingUser.set({
    //   name,
    //   email,
    //   password,
    // });

    // const savedPendingUser = (await pendingUser.save()).toJSON();

    // delete savedPendingUser.password;

    const code = await this.generateEmailVerificationCode(email.toLowerCase(), attempts);

    // await this.sesService.sendEmail({
    //   emails: email,
    //   subject: 'MEA Email Verification',
    //   body: `Your verification code is ${code}. This code expires in 10 minutes.`,
    // });

    // return savedPendingUser;
  }

  async verifySignupEmailVerificationCode({ email, code }: VerifyEmailDto) {
    // const pendingUser = await this.pendingUserModel.findOne({ email: email.toLowerCase() });

    // if (!pendingUser) {
    //   throw new UnauthorizedException(
    //     new CustomError({
    //       localizedMessage: {
    //         en: 'Incorrect email',
    //         ar: 'البريد الإلكتروني غير صحيح',
    //       },
    //       event: 'INCORRECT_EMAIL',
    //       errorType: ErrorType.WRONG_REQUEST,
    //     }),
    //   );
    // }

    await this.validateEmailVerificationCode({ email: email.toLowerCase(), code });

    let newUser = await this.userModel.findOne({ email: email.toLowerCase() });
    newUser = newUser || new this.userModel();

    // newUser.set({
    //   email: pendingUser.email,
    //   name: pendingUser.name,
    //   password: pendingUser.password,
    // });

    newUser.unmarkModified('password');

    await newUser.save();
    // await pendingUser.deleteOne();

    const user = newUser.toJSON();

    delete user.updatedAt;

    return {
      ...user,
      ...(await this.generateTokens(newUser)),
    };
  }

  async refreshUserTokens(payload: IRefreshTokenPayload) {
    const { _id: userId, sessionId } = payload;

    // Delete current session from redis
    const removeResult = await this.redis.lrem(userId, 0, sessionId);

    if (removeResult === 0) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Invalid session',
            ar: 'جلسة غير صالحة',
          },
          event: 'INVALID_SESSION',
          errorType: ErrorType.UNAUTHORIZED,
        }),
      );
    }

    const user = await this.userModel.findById(userId, {
      _id: 1,
      name: 1,
      email: 1,
      password: 1,
    });

    return {
      ...user.toJSON(),
      ...(await this.generateTokens(user)),
    };
  }

  async forgetPassword({ email }: ForgetPasswordDto) {
    const user = await this.userModel.findOne({ email: email.toLowerCase() });

    if (!user) return;

    const attempts = await this.redis.get(`${email}-trials`);

    if (Number(attempts) >= 3) {
      throw new ForbiddenException(
        new CustomError({
          localizedMessage: {
            en: 'You have exceeded the maximum number of attempts, please try again later',
            ar: 'لقد تجاوزت الحد الأقصى لعدد المحاولات ، يرجى المحاولة مرة أخرى لاحقًا',
          },
          event: 'MAX_ATTEMPTS_EXCEEDED',
          errorType: ErrorType.FORBIDDEN,
        }),
      );
    }

    const code = await this.generateEmailVerificationCode(email.toLowerCase(), attempts);

    // await this.sesService.sendEmail({
    //   emails: email,
    //   subject: 'EMA Email Verification',
    //   body: `Your verification code is ${code}. This code expires in 10 minutes.`,
    // });
  }

  async verifyForgetPasswordEmail({ code, email }: VerifyEmailDto) {
    const storedCode = await this.redis.get(`${email}-verify`);

    if (!storedCode) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Invalid email',
            ar: 'البريد الإلكتروني غير صحيح',
          },
          event: 'INVALID_EMAIL',
          errorType: ErrorType.WRONG_REQUEST,
        }),
      );
    }

    const user = await this.userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Invalid email',
            ar: 'البريد الإلكتروني غير صحيح',
          },
          event: 'INVALID_EMAIL',
          errorType: ErrorType.WRONG_REQUEST,
        }),
      );
    }

    await this.validateEmailVerificationCode({ email: email.toLowerCase(), code });

    return this.generateTempAccessToken(user._id?.toString());
  }

  async resetPassword({ accessToken, newPassword }: ResetPasswordDto) {
    const { _id }: ITempAccessTokenPayload = this.validateTempAccessToken(accessToken);

    const user = await this.userModel.findById(_id);

    if (!user) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Invalid access token',
            ar: 'رمز الوصول غير صالح',
          },
          event: 'INVALID_ACCESS_TOKEN',
          errorType: ErrorType.UNAUTHORIZED,
        }),
      );
    }

    user.password = newPassword;

    await user.save();
  }

  private generateTempAccessToken(userId: string) {
    const payload: ITempAccessTokenPayload = {
      _id: userId,
      temp: true,
    };

    return this.jwtService.sign(payload, {
      secret: this.appConfig.USER_JWT_SECRET,
      expiresIn: '10m',
    });
  }

  private validateTempAccessToken(accessToken: string) {
    const payload = this.jwtService.verify(accessToken, {
      secret: this.appConfig.USER_JWT_SECRET,
    });

    if (!payload?.temp) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Invalid access token',
            ar: 'رمز الوصول غير صالح',
          },
          event: 'INVALID_ACCESS_TOKEN',
          errorType: ErrorType.UNAUTHORIZED,
        }),
      );
    }

    return payload;
  }

  private async generateEmailVerificationCode(email: string, attempts?: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await Promise.all([
      this.redis.set(`${email}-trials`, (Number(attempts) || 0) + 1, 'EX', 3600), // 1 hour
      this.redis.set(`${email}-verify`, code, 'EX', 600), // 10 minutes
    ]);

    return code;
  }

  private async validateEmailVerificationCode({ email, code }: VerifyEmailDto) {
    const storedCode = await this.redis.get(`${email}-verify`);

    if (storedCode !== code) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Incorrect code',
            ar: 'الرمز غير صحيح',
          },
          event: 'INCORRECT_CODE',
          errorType: ErrorType.WRONG_REQUEST,
        }),
      );
    }

    await Promise.all([this.redis.del(`${email}-verify`), this.redis.del(`${email}-trials`)]);
  }
}