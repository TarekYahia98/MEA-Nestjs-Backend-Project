import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';
import { Connection, HydratedDocument, Schema } from 'mongoose';
import { ISupplierInstanceMethods, ISupplierModel, Supplier } from './supplier.type';
import { BaseSchema } from 'src/base';
import { ModelNames } from 'src/common/constants';
import { validateSchema } from 'src/common/helpers';
import { SupplierEventsEnum, SupplierStatusEnum } from './supplier.enum';
import { SupplierAddressSchema } from './subschemas/supplier-address/supplier-address.schema';
import { MediaSchema } from 'src/media/media.schema';


export const SupplierSchema = new Schema<Supplier, ISupplierModel, ISupplierInstanceMethods>(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      trim: true,
      lowercase: true,
      required: true,
    },

    brand: {
      type: String,
      minlength: 1,
      maxlength: 50,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },

    profilePictureUrl: {
      type: String,
      required: false,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    secondaryPhone: {
      type: String,
      required: false,
    },

    documents: {
      type: [MediaSchema],
      required: false,
    },

    address: {
      type: SupplierAddressSchema,
      required: false,
    },

    status: {
      type: String,
      enum: SupplierStatusEnum,
      default: SupplierStatusEnum.ACTIVE,
    },

    suspendedAt: {
      type: Date,
      required: false,
    },

    lastOnline: {
      type: Date,
      required: false,
    },

    // hasCompletedProfile: {
    //   type: Boolean,
    //   default: false,
    // },

    ...BaseSchema,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  },
);

export function supplierSchemaFactory(connection: Connection, eventEmitter: EventEmitter2) {
  SupplierSchema.index({ email: 1 }, { unique: true });
  SupplierSchema.index({ deletedAt: 1 });

  SupplierSchema.pre('validate', async function () {
    // Without this condition, schema validation will fail at the "name" path
    if (!this.isModified('deletedAt') && this.deletedAt !== null) {
      await validateSchema(this, Supplier);
    }
  });

  SupplierSchema.pre('save', async function () {
    if (!this.isModified('password')) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  SupplierSchema.methods.comparePassword = async function (this: HydratedDocument<Supplier>, password: string) {
    return bcrypt.compare(password, this.password);
  };

  SupplierSchema.methods.deleteDoc = async function (this: HydratedDocument<Supplier>) {
    this.name = this.name + '_deleted_' + new Date();
    this.email = this.email + '_deleted_' + new Date();
    this.deletedAt = new Date();
    await this.save();

    eventEmitter.emit(SupplierEventsEnum.DELETE_DOC, this);
  };

  SupplierSchema.methods.suspendDoc = async function (this: HydratedDocument<Supplier>) {
    this.suspendedAt = new Date();
    this.status = SupplierStatusEnum.SUSPENDED;
    await this.save();

    eventEmitter.emit(SupplierEventsEnum.SUSPEND_DOC, this);
  };

  SupplierSchema.methods.unSuspendDoc = async function (this: HydratedDocument<Supplier>) {
    this.suspendedAt = null;
    this.status = SupplierStatusEnum.ACTIVE;
    await this.save();

    eventEmitter.emit(SupplierEventsEnum.UN_SUSPEND_DOC, this);
  };

  const supplierModel = connection.model(ModelNames.SUPPLIER, SupplierSchema);

  return supplierModel;
}