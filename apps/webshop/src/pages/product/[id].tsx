import { GetServerSideProps } from 'next';
import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { QUERY_GET_PRODUCT } from '../../queries/getProduct';
import { Product } from '../../types';
import { fetchGraphQL } from '../../utils/fetchGraphQL';
import { formatPrice } from '../../utils/formatPrice';
import styles from './[id].module.css';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const productId = params?.id || '';

  if (!productId) {
    return {
      notFound: true,
    };
  }

  const { product } = await fetchGraphQL<{ product: Product }>(
    QUERY_GET_PRODUCT,
    {
      id: productId,
    },
  );

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

interface SingleProductParams {
  product: Product;
}

export default function ProductPage({ product }: SingleProductParams) {
  const { cart: items, addToCart } = useContext(CartContext);
  const [added, setAdded] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (!product) return;

    const currentItems = [
      ...(items || []),
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    ];
    let runningTotal = 0;
    for (let i = 0; i < currentItems.length; i++) {
      runningTotal += currentItems[i].price * currentItems[i].quantity;
    }
    console.log('cart total after add:', runningTotal);

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });

    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className={styles.page}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <img src={product!.imageUrl} alt="" className={styles.image} />
        </div>
        <div className={styles.details}>
          <p className={styles.category}>{product!.category}</p>
          <h1 className={styles.name}>{product!.name}</h1>
          <p className={styles.price}>{formatPrice(product!.price)}</p>
          <p className={styles.description}>{product!.description}</p>
          <p className={styles.meta}>
            Listed: {new Date(product!.createdAt).toLocaleDateString()}
            {' · '}
            {product!.stock} in stock
          </p>
          <div className={styles.addToCart} onClick={handleAddToCart}>
            {added ? 'Added!' : 'Add to cart'}
          </div>
        </div>
      </div>
    </div>
  );
}
