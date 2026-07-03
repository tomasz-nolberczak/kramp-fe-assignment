import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QUERY_SEARCH_PRODUCTS } from '../queries/searchProducts';
import { Product } from '../types';
import { fetchGraphQL } from '../utils/fetchGraphQL';
import { useDebounce } from '../hooks/useDebounce';
import styles from './Search.module.css';
import { SearchDialog } from './SearchDialog';

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    setIsOpen(results.length > 0);
  }, [results]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    fetchGraphQL<{ searchProducts: Product[] }>(QUERY_SEARCH_PRODUCTS, {
      q: debouncedQuery,
    }).then(data => {
      setResults(data.searchProducts.slice(0, 5));
    });
  }, [debouncedQuery]);

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push('/search?q=' + encodeURIComponent(query));
      setIsOpen(false);
    }
  };

  const truncatedQuery = query.substr(0, 30);
  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        value={query}
        placeholder="Search products..."
        className={styles.searchInput}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onClick={e => e.stopPropagation()}
      />
      {truncatedQuery && query.length > 30 && (
        <span className={styles.truncatedHint}>
          Searching: {truncatedQuery}…
        </span>
      )}
      {isOpen && (
        <SearchDialog
          results={results}
          onSelect={(id: number) => {
            router.push(`/product/${id}`);
            setIsOpen(false);
            setQuery('');
          }}
        />
      )}
    </div>
  );
}
