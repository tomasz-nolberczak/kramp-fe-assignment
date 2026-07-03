import Link from 'next/link';
import { useRouter } from 'next/router';
import { CartIcon } from './cartIcon';
import styles from './Header.module.css';
import Search from './Search';

export function Header() {
  const router = useRouter();

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

        <CartIcon />
      </div>
    </header>
  );
}
