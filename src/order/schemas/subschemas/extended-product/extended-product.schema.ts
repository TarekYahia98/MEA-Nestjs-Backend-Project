import { Schema } from 'mongoose';
import { ExtendedProduct } from './extended-product.type';
import { DiscountTypeEnum } from './extended-product.enum';
import { LocalizedTextSchema } from 'src/common/localized-text/localized-text.schema';
import { ProductType } from 'src/product/schemas/product.enum';

export const ExtendedProductSchema = new Schema<ExtendedProduct>(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    title: { type: LocalizedTextSchema(), required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    quantityInStock: { type: Number, required: true },
    productType: { type: String, enum: ProductType, required: true },
    weight: { type: Number, required: false },
    weightUnit: { type: String, required: false },
    discount: { type: Number, required: false },
    discountType: { type: String, enum: DiscountTypeEnum, required: false },
    isInOffer: { type: Boolean, default: false },
    priceAfterDiscount: { type: Number, required: false },
    category: { type: Schema.Types.ObjectId, required: false },
  },
  {
    _id: false,
  },
);