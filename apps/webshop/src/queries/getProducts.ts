export const GET_PRODUCTS_QUERY = `query GetProducts($ids: [ID!]!) {
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
