import { useState, useEffect } from 'react';
import { getProducts, getProductByHandle, Product } from '@/api/products';
import { storefrontFetch } from '../lib/storefront';
import { GET_PRODUCTS_BY_COLLECTION_QUERY, GET_COLLECTIONS_QUERY } from '../lib/queries';

export function useProducts(first = 10) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts(first);
                setProducts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [first]);

    return { products, loading, error };
}

export function useProductsByCategory(handle: string, first = 20) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchByCategory() {
            if (!handle) return;
            try {
                setLoading(true);
                const { body } = await storefrontFetch({
                    query: GET_PRODUCTS_BY_COLLECTION_QUERY,
                    variables: { handle, first },
                });

                if (body.data.collectionByHandle) {
                    const mapped = body.data.collectionByHandle.products.edges.map((edge: any) => ({
                        id: edge.node.id,
                        title: edge.node.title,
                        handle: edge.node.handle,
                        description: edge.node.description,
                        image: edge.node.featuredImage?.url || edge.node.images.edges[0]?.node.url,
                        price: edge.node.priceRange.minVariantPrice.amount,
                        currencyCode: edge.node.priceRange.minVariantPrice.currencyCode,
                    }));
                    setProducts(mapped);
                } else {
                    setProducts([]);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchByCategory();
    }, [handle, first]);

    return { products, loading, error };
}

export function useCollections(first = 5) {
    const [collections, setCollections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCollections() {
            try {
                const { body } = await storefrontFetch({
                    query: GET_COLLECTIONS_QUERY,
                    variables: { first },
                });
                setCollections(body.data.collections.edges.map((edge: any) => edge.node));
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCollections();
    }, [first]);

    return { collections, loading, error };
}
