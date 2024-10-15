export enum SupplierStatusEnum {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    PENDING_SUSPENSION = 'PENDING_SUSPENSION', // In case a suspension attempt happens while a there is a pending transaction
    }

export enum SupplierEventsEnum {
    DELETE_DOC = 'supplier.deleteDoc',
    SUSPEND_DOC = 'supplier.suspendDoc',
    UN_SUSPEND_DOC = 'supplier.unSuspendDoc',
    }