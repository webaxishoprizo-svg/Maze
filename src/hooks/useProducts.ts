import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductByHandle, getNewArrivals, getStoreTestimonials, getBestSellers, getProductRecommendations, Product } from '@/api/products';
import { storefrontFetch } from '../lib/storefront';
import { GET_PRODUCTS_BY_COLLECTION_QUERY, GET_COLLECTIONS_QUERY } from '../lib/queries';

export function useProducts(first = 12) {
    const { data: products = [], isLoading: loading, error } = useQuery({
        queryKey: ['products', first],
        queryFn: () => getProducts(first),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        products,
        loading,
        error: error ? (error as Error).message : null
    };
}

export function useProductsByCategory(handle: string, first = 20) {
    const { data: products = [], isLoading: loading, error } = useQuery({
        queryKey: ['products-by-category', handle, first],
        queryFn: async () => {
            if (!handle) return [];
            const { body } = await storefrontFetch({
                query: GET_PRODUCTS_BY_COLLECTION_QUERY,
                variables: { handle, first },
            });

            if (body.data.collectionByHandle) {
                return body.data.collectionByHandle.products.edges.map((edge: any) => ({
                    id: edge.node.id,
                    variantId: edge.node.variants?.edges[0]?.node.id,
                    title: edge.node.title,
                    handle: edge.node.handle,
                    description: edge.node.description,
                    image: edge.node.featuredImage?.url || edge.node.images.edges[0]?.node.url,
                    price: edge.node.priceRange.minVariantPrice.amount,
                    currencyCode: edge.node.priceRange.minVariantPrice.currencyCode,
                }));
            }
            return [];
        },
        enabled: !!handle,
        staleTime: 1000 * 60 * 5,
    });

    return {
        products,
        loading,
        error: error ? (error as Error).message : null
    };
}

export function useCollections(first = 5) {
    const { data: collections = [], isLoading: loading, error } = useQuery({
        queryKey: ['collections', first],
        queryFn: async () => {
            const { body } = await storefrontFetch({
                query: GET_COLLECTIONS_QUERY,
                variables: { first },
            });
            return body.data.collections.edges.map((edge: any) => edge.node);
        },
        staleTime: 1000 * 60 * 10, // 10 minutes
    });

    return {
        collections,
        loading,
        error: error ? (error as Error).message : null
    };
}

export function useNewArrivals(first = 4) {
    const { data: products = [], isLoading: loading, error } = useQuery({
        queryKey: ['new-arrivals', first],
        queryFn: () => getNewArrivals(first),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        products,
        loading,
        error: error ? (error as Error).message : null
    };
}

export function useStoreTestimonials() {
    const { data: testimonials = [], isLoading: loading, error } = useQuery({
        queryKey: ['store-testimonials'],
        queryFn: () => getStoreTestimonials(),
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    return {
        testimonials,
        loading,
        error: error ? (error as Error).message : null
    };
}

export function useBestSellers(first = 4) {
    const { data: products = [], isLoading: loading, error } = useQuery({
        queryKey: ['best-sellers', first],
        queryFn: () => getBestSellers(first),
        staleTime: 1000 * 60 * 5,
    });

    return { products, loading, error: error ? (error as Error).message : null };
}

export function useProductRecommendations(productId: string) {
    const { data: products = [], isLoading: loading, error } = useQuery({
        queryKey: ['product-recommendations', productId],
        queryFn: () => getProductRecommendations(productId),
        enabled: !!productId,
        staleTime: 1000 * 60 * 5,
    });

    return { products, loading, error: error ? (error as Error).message : null };
}
