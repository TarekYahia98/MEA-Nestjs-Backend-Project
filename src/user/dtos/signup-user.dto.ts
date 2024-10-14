import { Transform } from 'class-transformer';
import { IsPhoneNumber, Matches } from 'class-validator';
import { PendingUser } from '../schemas/pending-user/pending-user.type';

export class SignupUserDto extends PendingUser {
  @Transform(({ obj, key }) => obj[key]?.toLowerCase?.())
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, {
    message: 'Password too weak',
  })
  password: string;
}