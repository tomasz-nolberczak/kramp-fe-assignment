import { Product } from '../types';
import { formatPrice } from '../utils/formatPrice';
import styles from './SearchDialog.module.css';

interface SearchDialogProps {
  results: Product[];
  onSelect: (id: string) => void;
}

export function SearchDialog({ results, onSelect }: SearchDialogProps) {
  if (!results.length) return null;

  return (
    <div className={styles.dialog}>
      {results.map((result, index) => (
        <div
          key={`search-result-${index}`}
          className={styles.item}
          onClick={() => onSelect(result.id)}
        >
          <span className={styles.itemName}>{result.name}</span>
          <span className={styles.itemPrice}>{formatPrice(result.price)}</span>
        </div>
      ))}
    </div>
  );
}
