export enum OrderStatusEnum {
    PENDING = 'PENDING',
    RESCHEDULED = 'RESCHEDULED',
    IN_DELIVERY = 'IN_DELIVERY',
    DELIVERED = 'DELIVERED',
  }

  export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed',
    REFUNDED = 'refunded',
  }
  
  export enum OrderPaymentMethod {
    CASH = 'cash',
    CARD = 'card',
  }
  
  export enum OrderEventsEnum {
    ORDER_CREATE_UPDATE_PRODUCT_TOTAL_ORDERS = 'order.postCreateUpdateProductTotalOrders',
  }