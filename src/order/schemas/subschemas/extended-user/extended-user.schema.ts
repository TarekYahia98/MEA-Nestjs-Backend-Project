import { Schema } from 'mongoose';
import { ExtendedUser } from './extended-user.type';

export const ExtendedUserSchema = new Schema<ExtendedUser>(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  {
    _id: false,
  },
);