import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { groupBy } from '../utils/groupBy';
import ProductCard from '../components/ProductCard';
import styles from './search.module.css';
import { GetServerSideProps } from 'next';
import { QUERY_SEARCH_PRODUCTS } from '../queries/searchProducts';
import { fetchGraphQL } from '../utils/fetchGraphQL';
import { Product } from '../types';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = new URL(req.url!, `http://${req.headers.host || 'localhost'}`);

  const { searchProducts: products } = await fetchGraphQL<{
    searchProducts: Product[];
  }>(QUERY_SEARCH_PRODUCTS, {
    q: url.searchParams.get('q') || '',
  });

  return {
    props: {
      products,
    },
  };
};

interface SearchParams {
  products: Product[];
}

export default function SearchPage({ products }: SearchParams) {
  const router = useRouter();
  const grouped = groupBy(products, 'category');

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          {router.query.q ? `Results for "${router.query.q}"` : 'All products'}
        </h1>

        {!products.length && <p className={styles.empty}>No products found.</p>}

        {Object.keys(grouped).map(category => (
          <section key={category} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            <div className={styles.grid}>
              {(grouped[category] ?? []).map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
