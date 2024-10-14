import { ExtendedProductSchema } from '../extended-product/extended-product.schema';
import { OrderProduct } from './order-product.type';
import { Schema } from 'mongoose';

export const OrderProductSchema = new Schema<OrderProduct>(
  {
    product: {
      type: ExtendedProductSchema,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);