import {
    IsArray,
    IsDate,
    IsDefined,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    Matches,
    MaxLength,
    MinLength,
    ValidateNested,
  } from 'class-validator';
  import { Model } from 'mongoose';
  import { SupplierStatusEnum } from './supplier.enum';
  import { Type } from 'class-transformer';
import { BaseModel, IBaseInstanceMethods } from 'src/base';
import { SupplierAddress } from './subschemas/supplier-address';
import { Media } from 'src/media';
  
  export class Supplier extends BaseModel<Supplier> {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-zA-Z\u0621-\u064A\s0-9]*[a-zA-Z\u0621-\u064A]+[a-zA-Z\u0621-\u064A\s0-9]*$/, {
      message: 'Must be a valid Arabic/English alphanumerical string (numbers only not allowed)',
    })
    name: string;
  
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    @Matches(/^[a-zA-Z\u0621-\u064A\s0-9]*[a-zA-Z\u0621-\u064A]+[a-zA-Z\u0621-\u064A\s0-9]*$/, {
      message: 'Must be a valid Arabic/English alphanumerical string (numbers only not allowed)',
    })
    brand: string;
  
    @IsUrl()
    @IsOptional()
    profilePictureUrl?: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsString()
    @IsPhoneNumber()
    phone: string;
  
    @IsString()
    @IsPhoneNumber()
    @IsOptional()
    secondaryPhone?: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Media)
    @IsOptional()
    documents?: Media[];
  
    @IsObject()
    @ValidateNested()
    @IsOptional()
    address?: SupplierAddress;
  
    @IsString()
    @IsEnum(SupplierStatusEnum)
    status: SupplierStatusEnum;
  
    @IsOptional()
    @IsDate()
    suspendedAt?: Date;
  
    @IsOptional()
    @IsDate()
    lastOnline?: Date;
  
    // @IsBoolean()
    // @IsNotEmpty()
    // hasCompletedProfile: boolean;
  }
  
  export interface ISupplierInstanceMethods extends IBaseInstanceMethods {
    comparePassword(password: string): Promise<boolean>;
    suspendDoc: () => Promise<void>;
    unSuspendDoc: () => Promise<void>;
  }
  
  export interface ISupplierModel extends Model<Supplier, Record<string, unknown>, ISupplierInstanceMethods> {}