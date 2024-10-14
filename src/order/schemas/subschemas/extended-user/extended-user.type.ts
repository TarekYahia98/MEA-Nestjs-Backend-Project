import { IsAlphanumeric, IsEmail, IsInstance, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { TransformObjectId } from 'src/common/decorators/class-transformer/transform-mongo-id.decorator';

export class ExtendedUser {
  @IsInstance(Types.ObjectId)
  @TransformObjectId()
  id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phoneNumber: string;
}