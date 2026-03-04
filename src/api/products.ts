import { storefrontClient } from '../lib/storefront';
import { GET_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY } from '../lib/queries';

export interface Product {
    id: string;
    title: string;
    handle: string;
    description: string;
    image: string;
    price: string | number;
    currencyCode: string;
    images?: string[];
    variants?: any[];
}

export async function getProducts(first = 12): Promise<Product[]> {
    try {
        const data = await storefrontClient.request<any>(GET_PRODUCTS_QUERY, { first });
        return data.products.edges.map((edge: any) => ({
            id: edge.node.id,
            title: edge.node.title,
            handle: edge.node.handle,
            description: edge.node.description,
            image: edge.node.featuredImage?.url || edge.node.images.edges[0]?.node.url,
            price: edge.node.priceRange.minVariantPrice.amount,
            currencyCode: edge.node.priceRange.minVariantPrice.currencyCode,
        }));
    } catch (error) {
        console.error('getProducts error:', error);
        return [];
    }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
    try {
        const data = await storefrontClient.request<any>(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
        const product = data.productByHandle;
        if (!product) return null;

        return {
            id: product.id,
            title: product.title,
            handle: product.handle,
            description: product.description,
            image: product.featuredImage?.url || product.images.edges[0]?.node.url,
            price: product.priceRange.minVariantPrice.amount,
            currencyCode: product.priceRange.minVariantPrice.currencyCode,
            images: product.images.edges.map((e: any) => e.node.url),
            variants: product.variants.edges.map((e: any) => e.node),
        };
    } catch (error) {
        console.error('getProductByHandle error:', error);
        return null;
    }
}
