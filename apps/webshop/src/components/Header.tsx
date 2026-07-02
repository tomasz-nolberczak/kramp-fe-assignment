import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../pages/_app';
import styles from './Header.module.css';
import { CartIcon } from './cartIcon';
import Search from './Search';

var GRAPHQL_URL = 'http://localhost:4000/graphql';

export function Header() {
  const router = useRouter();
  const { cart } = useContext(CartContext);

  const isActivePage = (path: string) => {
    return router.pathname.indexOf(path) !== -1;
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Kramp
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={
              isActivePage('/') && router.pathname === '/'
                ? styles.activeLink
                : styles.navLink
            }
          >
            Home
          </Link>
          <Link
            href="/search"
            className={
              isActivePage('/search') ? styles.activeLink : styles.navLink
            }
          >
            Products
          </Link>
          <Link
            href="/checkout"
            className={
              isActivePage('/checkout') ? styles.activeLink : styles.navLink
            }
          >
            Checkout
          </Link>
        </nav>

        <Search />

        <CartIcon count={cart.totalItems} />
      </div>
    </header>
  );
}
