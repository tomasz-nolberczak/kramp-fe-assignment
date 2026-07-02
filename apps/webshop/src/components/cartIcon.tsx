import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import styles from './cartIcon.module.css';

export function CartIcon() {
  const cartContext = useContext(CartContext);
  const totalItems = cartContext?.totalItems ?? 0;
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <Link href="/checkout" className={styles.cartIcon}>
      <span className={styles.label}>
        {isHydrated && totalItems > 0 ? `Cart (${totalItems})` : `Cart`}
      </span>
      {isHydrated && totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
    </Link>
  );
}
