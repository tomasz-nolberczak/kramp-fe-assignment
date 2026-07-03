import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { formatPrice } from '../utils/formatPrice';
import {
  calculateCartShipping,
  calculateCartSubtotal,
  calculateCartTax,
  VAT_RATE,
} from '../utils/pricing';
import styles from './checkout.module.css';
import globalStyles from './index.module.css';

export default function CheckoutPage() {
  const { cart: items, clearCart } = useContext(CartContext);
  const [confirmed, setConfirmed] = useState(false);

  const handlePlaceOrder = () => {
    const total = calculateCartSubtotal(items);
    const tax = calculateCartTax(items);
    const shipping = calculateCartShipping(items);

    console.log(
      'order total:',
      total,
      '| VAT:',
      tax.toFixed(2),
      '| shipping:',
      shipping,
    );

    clearCart();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className={globalStyles.message}>
        <h1>Order placed!</h1>
        <p>
          Thank you for your order. You will receive a confirmation email
          shortly.
        </p>
        <Link href="/">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Checkout</h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty.</p>
            <Link href="/" className={styles.continueLink}>
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item: any, index: number) => (
                <div key={index} className={styles.item}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemQty}>×{item.quantity}</span>
                  <span className={styles.itemPrice}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.total}>
                <span>Total</span>
                <strong>{formatPrice(calculateCartSubtotal(items))}</strong>
              </div>
              <div className={styles.total}>
                <span>VAT ({(VAT_RATE * 100).toFixed(0)}%)</span>
                <strong>{formatPrice(calculateCartTax(items))}</strong>
              </div>
              <div className={styles.total}>
                <span>Shipping</span>
                <strong>{formatPrice(calculateCartShipping(items))}</strong>
              </div>
            </div>

            <div className={styles.actions}>
              <div
                className={styles.placeOrderButton}
                onClick={handlePlaceOrder}
              >
                Place order
              </div>
              <Link href="/" className={styles.continueLink}>
                Continue shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
