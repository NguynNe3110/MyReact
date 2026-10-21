import { useEffect, useState } from "react";
import { Product } from "../../product/types";
import { getProductById } from "../../product/api/productApi";


export function useDetailProduct(productId: string) {
    const[product, setProduct] = useState<Product | null>(null);
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState<string | null> (null);
    
    useEffect(() => {
        async function fetchDetail() {
            try {
                setLoading(true);
                const data = await getProductById(productId);
                setProduct(data);
            } catch (err: any) {
                setError(err?.message || 'Lỗi tải chi tiết sản phẩm');
            } finally {
                setLoading(false);
            }
        }

        if(productId) {
            fetchDetail();
        }
    }, [productId]);

    return {product, loading, error};
}