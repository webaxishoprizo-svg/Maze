import { GraphQLClient } from 'graphql-request';

const domain = import.meta.env.VITE_STORE_DOMAIN;
const accessToken = import.meta.env.VITE_STORE_TOKEN;
const apiVersion = import.meta.env.VITE_STORE_API_VERSION || '2024-01';

if (!domain || !accessToken) {
    console.error('Storefront configuration missing. Please check your .env file.');
}

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export const storefrontClient = new GraphQLClient(endpoint, {
    headers: {
        'X-Shopify-Storefront-Access-Token': accessToken || '',
        'Content-Type': 'application/json',
    },
});

// Helper for raw fetch if needed, but we'll prefer the client
export async function storefrontFetch({ query, variables = {} }: { query: string; variables?: Record<string, unknown> }) {
    try {
        const data = await storefrontClient.request(query, variables);
        return {
            status: 200,
            body: { data },
        };
    } catch (error) {
        console.error('Error fetching from storefront:', error);
        throw error;
    }
}
