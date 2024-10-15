import { Schema } from "mongoose";
import { PointLocationSchema } from "src/point";
import { SupplierAddress } from "./supplier-address.type";


export const SupplierAddressSchema = new Schema<SupplierAddress>(
  {
    location: {
      type: PointLocationSchema,
      required: false,
      index: '2dsphere',
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
  },
);