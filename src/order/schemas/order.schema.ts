import { EventEmitter2 } from "@nestjs/event-emitter";
import { Schema, Connection, HydratedDocument } from "mongoose";
import { BaseSchema } from "src/base";
import { ModelNames } from "src/common/constants";
import { validateSchema } from "src/common/helpers";
import { OrderStatusEnum, OrderEventsEnum, OrderPaymentMethod, PaymentStatus } from "./order.enum";
import { Order, IOrderModel, IOrderInstanceMethods } from "./order.type";
import { OrderProductSchema } from "./subschemas/order-product/order-product.schema";
import { ExtendedUserSchema } from "./subschemas/extended-user/extended-user.schema";


export const OrderSchema = new Schema<Order, IOrderModel, IOrderInstanceMethods>(
  {
    generatedCode: {
      type: String,
      required: true,
    },

    user: {
      type: ExtendedUserSchema,
      required: true,
      },

    supplier: { 
      type: Schema.Types.ObjectId,
      ref: ModelNames.SUPPLIER,
      required: true 
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    amountTotal: {
      type: Number,
      required: false,
    },

    amountSubTotal: {
      type: Number,
      required: false,
    },

    amountDiscount: {
      type: Number,
      required: false,
    },

    discountPercentage: {
      type: Number,
      required: false,
    },

    shippingFees: {
      type: Number,
      required: false,
      default: 0,
    },

    status: {
      type: String,
      enum: OrderStatusEnum,
      default: OrderStatusEnum.PENDING,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    paymentMethod: {
        type: String,
        enum: OrderPaymentMethod,
        default: OrderPaymentMethod.CASH,
      },
  
    paymentStatus: {
        type: String,
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
      },
    
      orderedProducts: {
        type: [OrderProductSchema],
        required: true,
      },
  
      categories: { type: [Schema.Types.ObjectId], ref: ModelNames.CATEGORY, required: true },

    ...BaseSchema,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.deletedAt;
        delete ret.__v;
      },
    },
  },
);

export function orderSchemaFactory(connection: Connection, eventEmitter: EventEmitter2) {
  OrderSchema.index({ user: 1 });
  OrderSchema.index({ status: 1 });
  OrderSchema.index({ isArchived: 1 });
  OrderSchema.index({ deletedAt: 1 });

  OrderSchema.pre('validate', async function () {
    await validateSchema(this, Order);
  });

  OrderSchema.post('save', async function () {
    eventEmitter.emit(OrderEventsEnum.ORDER_CREATE_UPDATE_PRODUCT_TOTAL_ORDERS, this);
  });

  // OrderSchema.pre('save', async function (next) {
  //   if (!this.orderId) {
  //     try {
  //       const count = await this.model(ModelNames.ORDER).countDocuments();
  //       this.orderId = count + 1;
  //     } catch (error) {
  //       return next(error);
  //     }
  //   }
  //   return next();
  // });

  OrderSchema.pre('validate', async function () {
    if (!this.isNew) {
      return;
    }

    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const generatedCode = `${random}${timestamp}`;

    const generatedCodeExists = await orderModel.exists({ generatedCode });

    if (generatedCodeExists) {
      this.generatedCode = `${random}${new Date().getTime()}`;
      return;
    }

    this.generatedCode = generatedCode;
  });

  OrderSchema.methods.deleteDoc = async function (this: HydratedDocument<Order>) {
    this.deletedAt = new Date();
    await this.save();
  };

  const orderModel = connection.model(ModelNames.ORDER, OrderSchema);

  return orderModel;
}