import { SetMetadata } from '@nestjs/common';
import { SUPPLIER_PERMISSION_GUARD_METADATA_KEY } from '../../constants';
import { SupplierPermissionGuardMetadata } from '../../interfaces/metadata/supplier-permission-guard-metadata.interface';

export const SupplierPermission = (permissions: SupplierPermissionGuardMetadata): MethodDecorator =>
  SetMetadata(SUPPLIER_PERMISSION_GUARD_METADATA_KEY, permissions);