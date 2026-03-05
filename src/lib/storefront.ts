import { GraphQLClient } from 'graphql-request';

const domain = import.meta.env.VITE_SHOPIFY_STORE;
const accessToken = import.meta.env.VITE_SHOPIFY_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01';

if (!domain || !accessToken) {
    console.error('Shopify configuration missing. Please check your environment variables (VITE_SHOPIFY_STORE, VITE_SHOPIFY_TOKEN).');
}

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export const storefrontClient = new GraphQLClient(endpoint, {
    headers: {
        'X-Shopify-Storefront-Access-Token': accessToken || '',
        'Content-Type': 'application/json',
    },
});

export async function storefrontFetch({ query, variables = {} }: { query: string; variables?: Record<string, unknown> }) {
    try {
        const data = await storefrontClient.request(query, variables);
        return {
            status: 200,
            body: { data },
        };
    } catch (error) {
        console.error('Error fetching from Shopify Storefront API:', error);
        throw error;
    }
}
