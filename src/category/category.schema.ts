import { EventEmitter2 } from "@nestjs/event-emitter";
import { Schema, Connection, HydratedDocument } from "mongoose";
import { BaseSchema } from "src/base";
import { ModelNames } from "src/common/constants";
import { validateSchema } from "src/common/helpers";
import { CategoryEventsEnum } from "./category.enum";
import { Category, ICategoryModel, ICategoryInstanceMethods } from "./category.type";
import { LocalizedTextSchema } from "src/common/localized-text/localized-text.schema";


export const CategorySchema = new Schema<Category, ICategoryModel, ICategoryInstanceMethods>(
  {
    name: {
      type: LocalizedTextSchema(),
      required: true,
    },

    pictureUrl: {
      type: String,
      required: true,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    ...BaseSchema,
  },
  {
    timestamps: true,
  },
);

export function categorySchemaFactory(connection: Connection, eventEmitter: EventEmitter2) {
  CategorySchema.index({ 'name.en': 1 }, { unique: true });
  CategorySchema.index({ 'name.ar': 1 }, { unique: true });
  CategorySchema.index({ _id: 1, 'name.en': 1 });
  CategorySchema.index({ _id: 1, 'name.ar': 1 });

  CategorySchema.pre('validate', async function () {
    await validateSchema(this, Category);
  });

  CategorySchema.methods.deleteDoc = async function (this: HydratedDocument<Category>) {
    this.deletedAt = new Date();
    await this.save();
  };

  CategorySchema.methods.archiveDoc = async function (this: HydratedDocument<Category>) {
    this.isArchived = true;
    await this.save();

    eventEmitter.emit(CategoryEventsEnum.ARCHIVE_DOC, this);
  };

  CategorySchema.methods.unArchiveDoc = async function (this: HydratedDocument<Category>) {
    if (this.isArchived === true) {
      this.isArchived = false;
      await this.save();

      eventEmitter.emit(CategoryEventsEnum.UN_ARCHIVE_DOC, this);
    }
  };

  const categoryModel = connection.model(ModelNames.CATEGORY, CategorySchema);

  return categoryModel;
}