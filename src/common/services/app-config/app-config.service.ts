import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentEnum } from 'src/common/enums/enviroment.enum';

@Injectable()
export class AppConfig {
  constructor(private readonly configService: ConfigService) {}

  NODE_ENV: string = this.configService.get('NODE_ENV');
  MONGODB_URL: string = this.configService.get('MONGODB_URL');
  USER_JWT_SECRET: string = this.configService.get('USER_JWT_SECRET');
  USER_JWT_REFRESH_SECRET: string = this.configService.get('USER_JWT_REFRESH_SECRET');
  USER_JWT_EXPIRY: number = this.configService.get('USER_JWT_EXPIRY');
  USER_JWT_REFRESH_EXPIRY: string = this.configService.get('USER_JWT_REFRESH_EXPIRY');
  SUPPLIER_JWT_SECRET: string = this.configService.get('SUPPLIER_JWT_SECRET');
  SUPPLIER_JWT_REFRESH_SECRET: string = this.configService.get('SUPPLIER_JWT_REFRESH_SECRET');
  SUPPLIER_JWT_EXPIRY: number = this.configService.get('SUPPLIER_JWT_EXPIRY');
  SUPPLIER_JWT_REFRESH_EXPIRY: string = this.configService.get('SUPPLIER_JWT_REFRESH_EXPIRY');
  ADMIN_JWT_SECRET: string = this.configService.get('ADMIN_JWT_SECRET');
  ADMIN_JWT_REFRESH_SECRET: string = this.configService.get('ADMIN_JWT_REFRESH_SECRET');
  ADMIN_JWT_EXPIRY: number = this.configService.get('ADMIN_JWT_EXPIRY');
  ADMIN_JWT_REFRESH_EXPIRY: string = this.configService.get('ADMIN_JWT_REFRESH_EXPIRY');
  S2S_JWT_SECRET: string = this.configService.get('S2S_JWT_SECRET');
  APP_SHORT_NAME: string = this.configService.get('APP_SHORT_NAME');
  REDIS_HOST: string = this.configService.get('REDIS_HOST');
  REDIS_PORT: number = this.configService.get('REDIS_PORT');
  LOGDNA_KEY: string = this.configService.get('LOGDNA_KEY');
  AWS_UPLOAD_BUCKET_NAME: string = this.configService.get('AWS_UPLOAD_BUCKET_NAME');
  AWS_UPLOAD_ACCESS_KEY_ID: string = this.configService.get('AWS_UPLOAD_ACCESS_KEY_ID');
  AWS_UPLOAD_SECRET_ACCESS_KEY: string = this.configService.get('AWS_UPLOAD_SECRET_ACCESS_KEY');
  AWS_UPLOAD_REGION: string = this.configService.get('AWS_UPLOAD_REGION');
  MEDIA_DOMAIN: string = this.configService.get('MEDIA_DOMAIN');
  AWS_SES_ACCESS_KEY_ID: string = this.configService.get('AWS_SES_ACCESS_KEY_ID');
  AWS_SES_SECRET_ACCESS_KEY: string = this.configService.get('AWS_SES_SECRET_ACCESS_KEY');
  AWS_SES_REGION: string = this.configService.get('AWS_SES_REGION');
  ELASTIC_SEARCH_URL: string = this.configService.get('ELASTIC_SEARCH_URL');
  DEEP_LINKS_DOMAIN: string = this.configService.get('FIREBASE_DEEP_LINKS_DOMAIN');
  DEFAULT_DEEP_LINK: string = this.configService.get('FIREBASE_DEFAULT_DEEP_LINK');

  get UPTIME() {
    return process.uptime();
  }

  static get NODE_ENV() {
    return process.env.NODE_ENV as EnvironmentEnum;
  }
}