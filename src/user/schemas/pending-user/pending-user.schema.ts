import * as bcrypt from 'bcrypt';
import { Connection, Schema } from 'mongoose';
import { UserSchema } from '../user.schema';
import { ModelNames } from 'src/common/constants';
import { validateSchema } from 'src/common/helpers';
import { PendingUser, IPendingUserModel, IPendingUserInstanceMethods } from './pending-user.type';

const { name, email, password } = UserSchema.obj;

const PendingUserSchema = new Schema<PendingUser, IPendingUserModel, IPendingUserInstanceMethods>(
  {
    name,
    email,
    password,
  },
  {
    timestamps: true,
  },
);

export function pendingUserSchemaFactory(connection: Connection) {
  PendingUserSchema.index({ email: 1 });

  PendingUserSchema.pre('validate', async function () {
    await validateSchema(this, PendingUser);
  });

  PendingUserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  const pendingUserModel = connection.model(ModelNames.PENDING_USER, PendingUserSchema);

  return pendingUserModel;
}