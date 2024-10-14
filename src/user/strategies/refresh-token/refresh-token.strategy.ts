import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IRefreshTokenPayload } from './refresh-token-strategy-payload.interface';
import { RefreshTokenStrategyService } from './refresh-token-strategy.service';
import { CustomError } from 'src/common/classes';
import { ErrorType } from 'src/common/enums';
import { AppConfig } from 'src/common/services';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'user-refresh-token') {
  constructor(
    private readonly appConfig: AppConfig,
    private readonly refreshTokenStrategyService: RefreshTokenStrategyService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.USER_JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: IRefreshTokenPayload) {
    const session = this.refreshTokenStrategyService.validateUserSession(payload);

    if (!session) {
      throw new UnauthorizedException(
        new CustomError({
          localizedMessage: {
            en: 'Unfortunately, your session is expired',
            ar: 'للأسف ، جلستك منتهي',
          },
          event: 'REFRESH_TOKEN_FAILED',
          errorType: ErrorType.UNAUTHORIZED,
        }),
      );
    }

    return payload;
  }
}