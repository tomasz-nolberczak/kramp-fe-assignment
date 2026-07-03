import { GetServerSideProps, GetStaticProps } from 'next';
import ProductCard from '../components/ProductCard';
import styles from './index.module.css';
import { fetchGraphQL } from '../utils/fetchGraphQL';
import { QUERY_GET_PRODUCTS } from '../queries/getProducts';
import { Product, productCategories } from '../types';
import Link from 'next/link';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { products } = await fetchGraphQL<{ products: Product[] }>(
    QUERY_GET_PRODUCTS,
    {
      ids: [1, 4, 11, 17],
    },
  );

  return {
    props: {
      products,
      timestamp: Date.now(),
    },
  };
};

interface HomePageProps {
  products: Product[];
  timestamp: number;
}

export default function HomePage({ products, timestamp }: HomePageProps) {
  return (
    <div>
      <section className={styles.hero}>
        <Image
          src="https://placehold.co/1200x800/e63329/ffffff?text=Kramp+Webshop"
          alt="Kramp — Your industrial supply partner"
          loading="eager"
          width={1200}
          height={800}
          className={styles.heroImage}
          unoptimized
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Industrial supplies, delivered.</h1>
          <p className={styles.heroSubtitle}>
            Tools, fasteners, safety equipment and power tools for
            professionals.
          </p>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <h2>Featured products</h2>
          <p className={styles.timestamp}>
            Last updated: {new Date(timestamp).toLocaleTimeString()}
          </p>
        </div>
        <div className={styles.grid}>
          {products.map((product, index) => (
            <ProductCard key={`product-card-${index}`} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.categories}>
        <h2>Shop by category</h2>
        <div className={styles.categoryGrid}>
          {productCategories.map((cat, index) => (
            <Link
              key={`category-${index}`}
              href={`/search?q=${cat}`}
              className={styles.categoryCard}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
