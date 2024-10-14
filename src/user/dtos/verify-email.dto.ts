import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  @Transform(({ obj, key }) => obj[key]?.toLowerCase?.())
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  code: string;
}