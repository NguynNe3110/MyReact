import { useEffect, useState } from 'react';
import { Product } from '../../product/types';
import { getProductById } from '../../product/api/productApi';

export function useDetailProduct(productId?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Nếu không có productId truyền vào, báo lỗi ngay lập tức thay vì treo loading
    if (!productId) {
      setLoading(false);
      setError('Không nhận được mã sản phẩm (productId) từ route param!');
      return;
    }

    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);
        console.log('[useDetailProduct] Đang gọi API với productId:', productId);
        
        const data = await getProductById(productId!);
        console.log('[useDetailProduct] Dữ liệu API trả về:', data);

        // Hỗ trợ cả trường hợp API trả về { item: product } hoặc trực tiếp { product }
        const actualProduct = (data as any)?.item || data;

        if (!actualProduct) {
          setError('Không tìm thấy sản phẩm trong hệ thống!');
        } else {
          setProduct(actualProduct);
        }
      } catch (err: any) {
        console.error('[useDetailProduct] Lỗi khi gọi API:', err);
        setError(err?.message || 'Lỗi khi tải chi tiết sản phẩm');
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [productId]);

  return { product, loading, error };
}