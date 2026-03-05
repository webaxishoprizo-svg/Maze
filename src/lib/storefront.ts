import { GraphQLClient } from 'graphql-request';

// Support both new and old environment variable names for backward compatibility during transition
const domain = import.meta.env.VITE_SHOPIFY_STORE || import.meta.env.VITE_STORE_DOMAIN;
const accessToken = import.meta.env.VITE_SHOPIFY_TOKEN || import.meta.env.VITE_STORE_TOKEN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || import.meta.env.VITE_STORE_API_VERSION || '2024-01';

if (!domain || !accessToken) {
    console.warn('Shopify configuration missing. Please check your Vercel Environment Variables.');
    console.log('Domain found:', !!domain);
    console.log('Token found:', !!accessToken);
} else {
    console.log('Shopify Storefront connected to:', domain);
    // Log a masked version of the token for verification without exposing it
    console.log('Token verified (masked):', accessToken.substring(0, 4) + '...' + accessToken.substring(accessToken.length - 4));
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
