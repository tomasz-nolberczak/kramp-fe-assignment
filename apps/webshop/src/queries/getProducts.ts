export const QUERY_GET_PRODUCTS = `query GetProducts($ids: [ID!]!) {
              products(ids: $ids) {
                id
                name
                price
                imageUrl
                description
                category
                stock
                createdAt
              }
            }`;
