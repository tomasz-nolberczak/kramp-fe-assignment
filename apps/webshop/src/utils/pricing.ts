import { CartItem } from '../types';

const shippingFeeFromEnv = Number(process.env.NEXT_PUBLIC_SHIPPING_FEE);
const vatRateFromEnv = Number(process.env.NEXT_PUBLIC_VAT_RATE);

export const SHIPPING_FEE = Number.isFinite(shippingFeeFromEnv)
  ? shippingFeeFromEnv
  : 4.95;
export const VAT_RATE = Number.isFinite(vatRateFromEnv) ? vatRateFromEnv : 0.21;

export function calculateCartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateCartTax(items: CartItem[]) {
  return calculateCartSubtotal(items) * VAT_RATE;
}

export function calculateCartShipping(items: CartItem[]) {
  return items.reduce(
    (acc, item) => acc + (item.quantity > 5 ? 0 : SHIPPING_FEE),
    0,
  );
}

export function calculateItemShipping(item: CartItem) {
  return item.quantity > 5 ? 0 : SHIPPING_FEE;
}
