import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './cartIcon.module.css';
import { CartContext } from '../pages/_app';
import Link from 'next/link';

export function CartIcon() {
  const { totalItems } = useContext(CartContext);

  return (
    <Link href="/checkout" className={styles.cartIcon}>
      <span className={styles.label}>
        {totalItems > 0 ? `Cart (${totalItems})` : `Cart`}
      </span>
      {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
    </Link>
  );
}
