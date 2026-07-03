import { GetServerSideProps } from 'next';
import ProductCard from '../components/ProductCard';
import { QUERY_SEARCH_PRODUCTS } from '../queries/searchProducts';
import { Product } from '../types';
import { fetchGraphQL } from '../utils/fetchGraphQL';
import { groupBy } from '../utils/groupBy';
import styles from './search.module.css';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const q = typeof query.q === 'string' ? query.q : query.q?.[0] || '';

  const { searchProducts: products } = await fetchGraphQL<{
    searchProducts: Product[];
  }>(QUERY_SEARCH_PRODUCTS, {
    q,
  });

  return {
    props: {
      q,
      products,
    },
  };
};

interface SearchParams {
  products: Product[];
  q?: string;
}

export default function SearchPage({ products, q }: SearchParams) {
  const grouped = groupBy(products, 'category');

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          {q ? `Results for "${q}"` : 'All products'}
        </h1>

        {!products.length && <p className={styles.empty}>No products found.</p>}

        {Object.keys(grouped).map(category => (
          <section key={category} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            <div className={styles.grid}>
              {(grouped[category] ?? []).map((product, index) => (
                <ProductCard key={`product-card-${index}`} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
