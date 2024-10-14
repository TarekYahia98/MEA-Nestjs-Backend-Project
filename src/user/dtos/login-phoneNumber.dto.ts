import { IsBoolean, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class LoginPhoneNumberDto {
  @IsPhoneNumber()  
  phoneNumber: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean = false;
}