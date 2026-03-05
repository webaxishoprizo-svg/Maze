import { storefrontClient } from './src/lib/storefront.ts';
import { GET_COLLECTIONS_QUERY } from './src/lib/queries.ts';

async function testConnection() {
    try {
        const data = await storefrontClient.request(GET_COLLECTIONS_QUERY, { first: 5 });
        console.log('Collections:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error fetching collections:', error);
    }
}

testConnection();
