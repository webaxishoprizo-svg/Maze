import { GraphQLClient } from 'graphql-request';

// Robust environment variable loader for both Local and Vercel environments
const getEnv = (key: string) => {
    return import.meta.env[key] || (process.env && process.env[key]) || '';
};

const domain = getEnv('VITE_SHOPIFY_STORE') || getEnv('VITE_STORE_DOMAIN') || 't3tk0h-fw.myshopify.com';
const accessToken = getEnv('VITE_SHOPIFY_TOKEN') || getEnv('VITE_STORE_TOKEN') || 'f56449142a31220e0ff0df389910cf35';
const apiVersion = getEnv('VITE_SHOPIFY_API_VERSION') || '2024-01';

console.log('Shopify Storefront Domain:', domain);
console.log('Shopify Storefront Token present:', !!accessToken);

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export const storefrontClient = new GraphQLClient(endpoint, {
    headers: {
        'X-Shopify-Storefront-Access-Token': accessToken,
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
