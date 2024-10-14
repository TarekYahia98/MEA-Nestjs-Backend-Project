import { UserJwtPersona, AdminJwtPersona, SupplierJwtPersona } from 'src/common/interfaces';

declare module 'express' {
  interface Request {
    persona?: UserJwtPersona | AdminJwtPersona | SupplierJwtPersona;
  }
}