import { useCallback, useEffect, useState } from "react";
import { Product } from "../types";
import { getProductById, getProductsApi } from "../api/productApi";


export function useProducts() {
    //1 list products
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<String | null>(null);

    const fetchProducts = useCallback(
        async () => {
            //logic hàm
            try {
                setLoading(true);
                setError(null);

                const data = await getProductsApi();
                setProducts(data);

            } catch (error: any) {
                setError(error?.message || 'Có lỗi xảy ra khi tải sản phẩm');
            } finally {
                setLoading(false);
            }
        }, 
        // mảng điều kiện
        // mảng rỗng -> chỉ tạo 1 lần, không tạo mới
        []
    );

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products, loading, error, refresh: fetchProducts
    }
}