import Link from 'next/link';
import globalStyles from './index.module.css';

export default function NotFound() {
  return (
    <div className={globalStyles.message}>
      <h1>Page Not Found</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
