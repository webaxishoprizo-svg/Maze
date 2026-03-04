import { useState, useEffect } from 'react';
import { getProductByHandle, Product } from '@/api/products';

export function useProduct(handle: string) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            if (!handle) return;
            try {
                setLoading(true);
                const data = await getProductByHandle(handle);
                setProduct(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [handle]);

    return { product, loading, error };
}
