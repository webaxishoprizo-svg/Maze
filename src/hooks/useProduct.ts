import { useQuery } from '@tanstack/react-query';
import { getProductByHandle, Product } from '@/api/products';

export function useProduct(handle: string) {
    const { data: product = null, isLoading: loading, error } = useQuery({
        queryKey: ['product', handle],
        queryFn: () => getProductByHandle(handle),
        enabled: !!handle,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        product,
        loading,
        error: error ? (error as Error).message : null
    };
}
