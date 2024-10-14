import { EventEmitter2 } from "@nestjs/event-emitter";
import { Schema, Connection, HydratedDocument, PipelineStage, Types } from "mongoose";
import { BaseSchema } from "src/base";
import { ModelNames } from "src/common/constants";
import { validateSchema } from "src/common/helpers";
import { LocalizedTextSchema } from "src/common/localized-text";
import { BaseProductEventsEnum } from "./product.enum";
import { BaseProduct, IBaseProductModel, IBaseProductInstanceMethods } from "./product.type";
import { DynamicLinkSchema } from "src/common/dynamic-link";


export const BaseProductSchema = new Schema<BaseProduct, IBaseProductModel, IBaseProductInstanceMethods>(
  {
    generatedSku: {
      type: String,
      required: true,
    },
    title: { type: LocalizedTextSchema(), required: true },
    description: { type: LocalizedTextSchema(), required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    quantityInStock: { type: Number, required: true },
    video: { type: String, required: false },
    isArchived: {
      type: Boolean,
      default: false,
    },
    category: { type: Schema.Types.ObjectId, ref: ModelNames.CATEGORY, required: true },
    isArchivedByCategory: {
      type: Boolean,
      default: false,
    },
    isArchivedByAdmin: {
      type: Boolean,
      default: false,
    },

    ...DynamicLinkSchema,
    ...BaseSchema,
  },
  {
    discriminatorKey: 'productType',
    timestamps: true,
  },
);

export function baseProductSchemaFactory(
  connection: Connection,
  eventEmitter: EventEmitter2,
//   productHelperService: ProductHelperService,
) {
  BaseProductSchema.index({ 'title.en': 1 }, { unique: true });
  BaseProductSchema.index({ 'title.ar': 1 }, { unique: true });
  BaseProductSchema.index({ _id: 1, 'title.en': 1 });
  BaseProductSchema.index({ _id: 1, 'title.ar': 1 });
  BaseProductSchema.index({ _id: 1, isArchived: 1 });
  BaseProductSchema.index({ productType: 1 });
  BaseProductSchema.index({ productType: 1, category: 1 });
  BaseProductSchema.index({ productType: 1, category: 1, isArchivedByCategory: 1 });
  BaseProductSchema.index({ productType: 1, brand: 1 });
  BaseProductSchema.index({ productType: 1, applicationSite: 1 });
  BaseProductSchema.index({ productType: 1, degreeOfPenetration: 1 });
  BaseProductSchema.index({ itemProducts: 1 });
  BaseProductSchema.index({ isArchived: 1 });
  BaseProductSchema.index({ category: 1, isArchived: 1 });
  BaseProductSchema.index({ isArchived: 1, createdAt: 1 });
  BaseProductSchema.index({ generatedSku: 1 });

  BaseProductSchema.pre('validate', async function () {
    if (!this.isNew) {
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedSku = `${this.productType.substring(0, 3).toUpperCase()}-${randomNum}`;

    const generatedSkuExist = await baseProductModel.exists({ generatedSku });

    if (generatedSkuExist) {
      this.generatedSku = `${this.productType.substring(0, 3).toUpperCase()}-${Math.floor(
        1000 + Math.random() * 9000,
      )}`;
      return;
    }

    this.generatedSku = generatedSku;
  });

  BaseProductSchema.pre('validate', function (next) {
    this.isArchived = this.isArchivedByCategory || this.isArchivedByAdmin;
    next();
  });

  BaseProductSchema.pre('validate', async function () {
    await validateSchema(this, BaseProduct);
  });

  BaseProductSchema.post('save', async function () {
    if (this.isModified('isArchived') && this.isArchived) {
      eventEmitter.emit(BaseProductEventsEnum.ARCHIVE_DOC, this);
    }
  });

  BaseProductSchema.methods.deleteDoc = async function (this: HydratedDocument<BaseProduct>) {
    this.deletedAt = new Date();
    await this.save();
    eventEmitter.emit(BaseProductEventsEnum.DELETE_DOC, this);
  };

  BaseProductSchema.methods.archiveDoc = async function (this: HydratedDocument<BaseProduct>) {
    if (!this.isArchivedByAdmin) {
      this.isArchivedByAdmin = true;
      await this.save();
    }
  };

  BaseProductSchema.methods.unArchiveDoc = async function (this: HydratedDocument<BaseProduct>) {
    if (this.isArchivedByAdmin) {
      this.isArchivedByAdmin = false;
      await this.save();
    }
  };

  BaseProductSchema.methods._archiveDocDueToCategoryArchival = async function (this: HydratedDocument<BaseProduct>) {
    if (!this.isArchivedByCategory) {
      this.isArchivedByCategory = true;
      await this.save();
    }
  };

  BaseProductSchema.methods._unArchiveDocDueToCategoryUnArchival = async function (
    this: HydratedDocument<BaseProduct>,
  ) {
    if (this.isArchivedByCategory) {
      this.isArchivedByCategory = false;
      await this.save();
    }
  };

  const baseProductModel = connection.model(ModelNames.BASE_PRODUCT, BaseProductSchema);

  return baseProductModel;
}