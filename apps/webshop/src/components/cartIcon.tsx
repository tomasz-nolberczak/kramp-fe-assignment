import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import styles from './cartIcon.module.css';

export function CartIcon() {
  const cartContext = useContext(CartContext);
  const totalItems = cartContext?.totalItems ?? 0;

  return (
    <Link href="/checkout" className={styles.cartIcon}>
      <span className={styles.label}>Cart</span>
      {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
    </Link>
  );
}
