export const QUERY_SEARCH_PRODUCTS = `
query SearchProducts($q: String!, $limit: Int = 5) {
            searchProducts(query: $q, limit: $limit) {
              id
              name
              price
              imageUrl
              category
              description
              stock
              createdAt
            }
          }
        `;
