import { SetMetadata } from '@nestjs/common';
import { ADMIN_PERMISSION_GUARD_METADATA_KEY } from '../constants';
import { AdminPermissionGuardMetadata } from '../interfaces/metadata';

export const AdminPermission = (...permissions: AdminPermissionGuardMetadata[]): MethodDecorator =>
  SetMetadata(ADMIN_PERMISSION_GUARD_METADATA_KEY, permissions);