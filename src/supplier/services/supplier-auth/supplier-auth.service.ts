import { RedisService } from "@liaoliaots/nestjs-redis";
import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CustomError } from "src/common/classes";
import { ModelNames } from "src/common/constants";
import { ErrorType } from "src/common/enums";
import { AppConfig } from "src/common/services";
import { ISupplierModel } from "src/supplier/schemas";
import { VerifyEmailDto } from "src/user/dtos/verify-email.dto";
import { ITempAccessTokenPayload } from "src/user/interfaces/tem-access-token.interface";
import { BaseAuthService } from "src/user/services/base-auth";

@Injectable()
export class SupplierAuthService extends BaseAuthService {
//   constructor(
//     @Inject(ModelNames.SUPPLIER) private _supplierModel: ISupplierModel,
//     private readonly _appConfig: AppConfig,
//     private readonly _jwtService: JwtService,
//     private readonly _redisService: RedisService,
//     // private readonly sesService: AwsSESService,
//   ) {
//     super(_supplierModel, _appConfig, _jwtService, _redisService);
//   }

//   async refreshSupplierTokens(){}

//   async forgetPassword(){}

//   async verifyForgetPasswordEmail(){}

//   async resetPassword(){}

//   async loginResetPassword(){}

//   private generateTempAccessToken(supplierId: string) {
//     const payload: ITempAccessTokenPayload = {
//       _id: supplierId,
//       temp: true,
//     };

//     return this.jwtService.sign(payload, {
//       secret: this.appConfig.SUPPLIER_JWT_SECRET,
//       expiresIn: '10m',
//     });
//   }

//   private validateTempAccessToken(accessToken: string) {
//     const payload = this.jwtService.verify(accessToken, {
//       secret: this.appConfig.SUPPLIER_JWT_SECRET,
//     });

//     if (!payload?.temp) {
//       throw new UnauthorizedException(
//         new CustomError({
//           localizedMessage: {
//             en: 'Invalid access token',
//             ar: 'رمز الوصول غير صالح',
//           },
//           event: 'INVALID_ACCESS_TOKEN',
//           errorType: ErrorType.UNAUTHORIZED,
//         }),
//       );
//     }

//     return payload;
//   }

//   private async generateEmailVerificationCode(email: string, attempts?: string) {
//     const code = Math.floor(100000 + Math.random() * 900000).toString();

//     await Promise.all([
//       this.redis.set(`${email}-trials`, (Number(attempts) || 0) + 1, 'EX', 3600), // 1 hour
//       this.redis.set(`${email}-verify`, code, 'EX', 600), // 10 minutes
//     ]);

//     return code;
//   }

//   private async validateEmailVerificationCode({ email, code }: VerifyEmailDto) {
//     const storedCode = await this.redis.get(`${email}-verify`);

//     if (storedCode !== code) {
//       throw new UnauthorizedException(
//         new CustomError({
//           localizedMessage: {
//             en: 'Incorrect code',
//             ar: 'الرمز غير صحيح',
//           },
//           event: 'INCORRECT_CODE',
//           errorType: ErrorType.WRONG_REQUEST,
//         }),
//       );
//     }

//     await Promise.all([this.redis.del(`${email}-verify`), this.redis.del(`${email}-trials`)]);
//   }

}