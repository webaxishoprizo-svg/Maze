import { storefrontClient } from '../lib/storefront';
import { GET_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY, SEARCH_PRODUCTS_QUERY } from '../lib/queries';

export interface Product {
    id: string;
    variantId?: string;
    title: string;
    handle: string;
    description: string;
    image: string;
    price: string | number;
    currencyCode: string;
    images?: string[];
    variants?: any[];
    options?: {
        name: string;
        values: string[];
    }[];
}

export async function getProducts(first = 12): Promise<Product[]> {
    try {
        const data = await storefrontClient.request<any>(GET_PRODUCTS_QUERY, { first });
        if (!data || !data.products) return [];

        return data.products.edges.map((edge: any) => {
            const product = edge.node;
            const firstVariant = product.variants?.edges[0]?.node;

            return {
                id: product.id,
                variantId: firstVariant?.id,
                title: product.title,
                handle: product.handle,
                description: product.description,
                image: product.featuredImage?.url || product.images?.edges[0]?.node.url,
                price: product.priceRange.minVariantPrice.amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode,
            };
        });
    } catch (error) {
        console.error('Shopify API - getProducts error:', error);
        return [];
    }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
    try {
        if (!handle) return null;
        const data = await storefrontClient.request<any>(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
        const product = data?.productByHandle;
        if (!product) return null;

        return {
            id: product.id,
            variantId: product.variants?.edges[0]?.node.id,
            title: product.title,
            handle: product.handle,
            description: product.description,
            image: product.featuredImage?.url || product.images?.edges[0]?.node.url,
            price: product.priceRange.minVariantPrice.amount,
            currencyCode: product.priceRange.minVariantPrice.currencyCode,
            images: product.images?.edges.map((e: any) => e.node.url) || [],
            variants: product.variants?.edges.map((e: any) => e.node) || [],
            options: product.options || [],
        };
    } catch (error) {
        console.error('Shopify API - getProductByHandle error:', error);
        return null;
    }
}

export async function searchProducts(query: string, first = 20): Promise<Product[]> {
    try {
        const data = await storefrontClient.request<any>(SEARCH_PRODUCTS_QUERY, { query, first });
        if (!data || !data.products) return [];

        return data.products.edges.map((edge: any) => {
            const product = edge.node;
            const firstVariant = product.variants?.edges[0]?.node;

            return {
                id: product.id,
                variantId: firstVariant?.id,
                title: product.title,
                handle: product.handle,
                description: product.description,
                image: product.featuredImage?.url || product.images?.edges[0]?.node.url,
                price: product.priceRange.minVariantPrice.amount,
                currencyCode: product.priceRange.minVariantPrice.currencyCode,
            };
        });
    } catch (error) {
        console.error('Shopify API - searchProducts error:', error);
        return [];
    }
}
