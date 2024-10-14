import { IsDefined, IsEmail, IsNotEmpty, IsObject, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Model } from 'mongoose';
import { UserAddress, UserSettingsSubSchemaType } from '../subschemas';
import { BaseModel, IBaseInstanceMethods } from 'src/base/base.type';
import { IsBirthDate } from 'src/common/decorators/class-validator/is-birth-date.decorator';


export class User extends BaseModel<User> {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z\u0621-\u064A\s0-9]*[a-zA-Z\u0621-\u064A]+[a-zA-Z\u0621-\u064A\s0-9]*$/, {
    message: 'Must be a valid Arabic/English alphanumerical string (numbers only not allowed)',
  })
  name: string;

  @IsPhoneNumber()
  phoneNumber : string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsObject()
  @ValidateNested()
  @IsOptional()
  address?: UserAddress;

  @IsOptional()
  @IsString()
  googleId?: string;

  @IsOptional()
  @IsString()
  appleId?: string;

  @IsOptional()
  @IsBirthDate()
  birthDate?: string;

  @IsOptional()
  @ValidateNested()
  settings?: UserSettingsSubSchemaType;
}

export interface IUserInstanceMethods extends IBaseInstanceMethods {
  comparePassword(password: string): Promise<boolean>;
}
export interface IUserModel extends Model<User, Record<string, unknown>, IUserInstanceMethods> {}