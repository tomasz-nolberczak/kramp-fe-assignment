import NodeCache from 'node-cache';

const GRAPHQL_URL =
  process.env.GRAPHQL_URL || 'http://localhost:3000/api/products';
  
const cache = new NodeCache({ stdTTL: 300, checkperiod: 30 });

export async function fetchGraphQL<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { cache?: boolean },
): Promise<T> {
  const shouldCache = options?.cache !== false;
  const cacheKey = JSON.stringify({ query, variables });

  if (shouldCache) {
    const cachedValue = cache.get<T>(cacheKey);
    if (cachedValue) return cachedValue;
  }

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    const data = json.data as T;

    if (shouldCache) {
      cache.set(cacheKey, data);
    }

    return data;
  } catch (error) {
    console.error('Error fetching GraphQL data:', error);
    throw error;
  }
}
