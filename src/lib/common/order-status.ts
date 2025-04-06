export const orderStatuses = [
  'Processing',
  'Paid',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Refunded',
] as const;

export const orderStatusActions: Record<
  (typeof orderStatuses)[number],
  string
> = {
  Processing: 'Processing',
  Paid: 'Pay',
  Shipped: 'Ship',
  Delivered: 'Deliver',
  Cancelled: 'Cancel',
  Refunded: 'Refund',
};

export const orderStatusTransitions: Record<
  (typeof orderStatuses)[number],
  (typeof orderStatuses)[number][]
> = {
  Processing: ['Paid', 'Cancelled'],
  Paid: ['Shipped', 'Cancelled'],
  Shipped: ['Delivered', 'Cancelled'],
  Delivered: ['Refunded'],
  Cancelled: ['Refunded'],
  Refunded: [],
};
