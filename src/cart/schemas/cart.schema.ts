import { ClientSession, Connection, HydratedDocument, Schema } from 'mongoose';
import { BaseSchema } from 'src/base';
import { ModelNames } from 'src/common/constants';
import { validateSchema } from 'src/common/helpers';
import { Cart, ICartModel, ICartInstanceMethods } from './cart.type';


export const CartSchema = new Schema<Cart, ICartModel, ICartInstanceMethods>(
  {
    supplier: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelNames.SUPPLIER,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: ModelNames.USER,
      required: true,
    },

    item: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: ModelNames.PRODUCT,
      optional: true,
    },

    quantity: {
      items: {
        type: Number,
        required: false, 
        default: 0, 
      },
      units: {
        type: Number,
        required: false,
        default: 0, 
      },
    },

    ...BaseSchema,
  },
  { timestamps: true },
);
export function cartSchemaFactory(connection: Connection) {
  CartSchema.index({ user: 1 });
  CartSchema.index({ product: 1 });
  CartSchema.index({ user: 1, product: 1 });

  CartSchema.pre('validate', async function () {
    await validateSchema(this, Cart);
  });

  CartSchema.methods.deleteDoc = async function (this: HydratedDocument<Cart>, session?: ClientSession) {
    await this.deleteOne({ session });
  };

  const cartModel = connection.model(ModelNames.CART, CartSchema);

  return cartModel;
}