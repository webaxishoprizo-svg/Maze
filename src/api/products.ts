import { storefrontClient } from '../lib/storefront';
import { GET_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY, SEARCH_PRODUCTS_QUERY, GET_NEW_ARRIVALS_QUERY } from '../lib/queries';

export interface Variant {
    id: string;
    title: string;
    availableForSale: boolean;
    price: {
        amount: string;
        currencyCode: string;
    };
    compareAtPrice?: {
        amount: string;
        currencyCode: string;
    };
    sku?: string;
    inventoryQuantity?: number;
    selectedOptions: {
        name: string;
        value: string;
    }[];
}

export interface Product {
    id: string;
    variantId?: string;
    title: string;
    handle: string;
    description: string;
    descriptionHtml?: string;
    shippingMetafield?: string;
    careMetafield?: string;
    testimonialsMetafield?: string;
    sizeChartMetafield?: string;
    fabricMetafield?: string;
    tags?: string[];
    image: string;
    price: string | number;
    currencyCode: string;
    images?: string[];
    variants?: Variant[];
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
            descriptionHtml: product.descriptionHtml,
            shippingMetafield: product.shippingMetafield?.value,
            careMetafield: product.careMetafield?.value,
            testimonialsMetafield: product.testimonialsMetafield?.value,
            sizeChartMetafield: product.sizeChartMetafield?.value,
            fabricMetafield: product.fabricMetafield?.value,
            tags: product.tags || [],
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
export async function getNewArrivals(first = 4): Promise<Product[]> {
    try {
        const data = await storefrontClient.request<any>(GET_NEW_ARRIVALS_QUERY, { first });
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
        console.error('Shopify API - getNewArrivals error:', error);
        return [];
    }
}

export async function getStoreTestimonials(): Promise<any[]> {
    try {
        const { GET_STORE_TESTIMONIALS_QUERY } = await import('../lib/queries');
        const data = await storefrontClient.request<any>(GET_STORE_TESTIMONIALS_QUERY);
        if (!data || !data.metaobjects) return [];

        return data.metaobjects.edges.map((edge: any) => {
            const fields: Record<string, string> = {};
            edge.node.fields.forEach((f: any) => {
                fields[f.key] = f.value;
            });
            return fields;
        });
    } catch (error) {
        console.error('Shopify API - getStoreTestimonials error:', error);
        return [];
    }
}

export async function getBestSellers(first = 4): Promise<Product[]> {
    try {
        const { GET_BEST_SELLERS_QUERY } = await import('../lib/queries');
        const data = await storefrontClient.request<any>(GET_BEST_SELLERS_QUERY, { first });

        return data.products.edges.map((edge: any) => ({
            id: edge.node.id,
            variantId: edge.node.variants?.edges[0]?.node.id,
            title: edge.node.title,
            handle: edge.node.handle,
            description: edge.node.description,
            descriptionHtml: edge.node.descriptionHtml,
            shippingMetafield: edge.node.shippingMetafield?.value,
            careMetafield: edge.node.careMetafield?.value,
            testimonialsMetafield: edge.node.testimonialsMetafield?.value,
            sizeChartMetafield: edge.node.sizeChartMetafield?.value,
            fabricMetafield: edge.node.fabricMetafield?.value,
            tags: edge.node.tags || [],
            image: edge.node.featuredImage?.url || edge.node.images.edges[0]?.node.url,
            price: edge.node.priceRange.minVariantPrice.amount,
            currencyCode: edge.node.priceRange.minVariantPrice.currencyCode,
            images: edge.node.images?.edges.map((e: any) => e.node.url) || [],
            variants: edge.node.variants?.edges.map((e: any) => ({
                id: e.node.id,
                title: e.node.title,
                availableForSale: e.node.availableForSale,
                price: e.node.price.amount,
                compareAtPrice: e.node.compareAtPrice?.amount,
                sku: e.node.sku,
            })) || [],
        }));
    } catch (error) {
        console.error('Shopify API - getBestSellers error:', error);
        return [];
    }
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
    try {
        const { GET_PRODUCT_RECOMMENDATIONS_QUERY } = await import('../lib/queries');
        const data = await storefrontClient.request<any>(GET_PRODUCT_RECOMMENDATIONS_QUERY, { productId });

        return data.productRecommendations.map((node: any) => ({
            id: node.id,
            variantId: node.variants?.edges[0]?.node.id,
            title: node.title,
            handle: node.handle,
            description: node.description,
            descriptionHtml: node.descriptionHtml,
            shippingMetafield: node.shippingMetafield?.value,
            careMetafield: node.careMetafield?.value,
            testimonialsMetafield: node.testimonialsMetafield?.value,
            sizeChartMetafield: node.sizeChartMetafield?.value,
            fabricMetafield: node.fabricMetafield?.value,
            tags: node.tags || [],
            image: node.featuredImage?.url || node.images.edges[0]?.node.url,
            price: node.priceRange.minVariantPrice.amount,
            currencyCode: node.priceRange.minVariantPrice.currencyCode,
        }));
    } catch (error) {
        console.error('Shopify API - getProductRecommendations error:', error);
        return [];
    }
}
