export const ORDER = 'order';
export const ORDER_ITEM = 'order-item';
export const ORDER_ITEM_OPTION = 'order-item-option';
export const CUSTOMER = 'customer';
export const ITEM = 'item';
export const ITEM_OPTION = 'item-option';

export const ENDPOINTS = {
  [ORDER]: 'orders',
  [CUSTOMER]: 'customers',
  [ITEM]: 'items',
};

export const RELATIONSHIP_DEFINITIONS = {
  [ORDER]: {
    orderItems: {
      nestedType: ORDER_ITEM,
      isIdentifier: false,
    },
    item: {
      nestedType: ITEM,
      isIdentifier: true,
    },
    options: {
      nestedType: ORDER_ITEM_OPTION,
      isIdentifier: false,
    },
    itemOption: {
      nestedType: ITEM_OPTION,
      isIdentifier: true,
    },
  },
};
