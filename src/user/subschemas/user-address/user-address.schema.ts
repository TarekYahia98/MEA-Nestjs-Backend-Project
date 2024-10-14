import { Schema } from 'mongoose';
import { UserAddress } from './user-address.type';
import { PointLocationSchema } from 'src/point/point.schema';

export const UserAddressSchema = new Schema<UserAddress>(
  {
    name: {
      type: String,
      required: true,
    },

    location: { type: PointLocationSchema, required: true, index: '2dsphere' },
  },
  {
    timestamps: true,
  },
);