import { GraphQLClient } from 'graphql-request';

const domain = 'maze-9983.myshopify.com';
const accessToken = 'bfe4c13bf4e02a5e373e70586b08936b';
const apiVersion = '2024-01';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

const storefrontClient = new GraphQLClient(endpoint, {
    headers: {
        'X-Shopify-Storefront-Access-Token': accessToken,
        'Content-Type': 'application/json',
    },
});

const GET_COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

async function testConnection() {
    try {
        const data = await storefrontClient.request(GET_COLLECTIONS_QUERY, { first: 5 });
        console.log('Collections:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error fetching collections:', error);
    }
}

testConnection();
