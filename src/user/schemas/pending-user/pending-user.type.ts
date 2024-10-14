import { PickType } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { User } from '../user.type';
import { IBaseInstanceMethods } from 'src/base/base.type';

export class PendingUser extends PickType(User, ['name', 'email', 'password'] as const) {
  constructor(pendingUser: PendingUser) {
    super(pendingUser);
    Object.assign(this, pendingUser);
  }
}

export interface IPendingUserInstanceMethods extends IBaseInstanceMethods {}
export interface IPendingUserModel extends Model<PendingUser, Record<string, unknown>, IPendingUserInstanceMethods> {}