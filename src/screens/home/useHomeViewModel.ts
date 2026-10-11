import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../../domain/product';
import { ProductRepository } from '../../domain/ProductRepository';
import { ProductRepositoryImpl } from '../../data/ProductRepositoryImpl';
import { HomeScreenNavigationProp } from '../../navigation/types';

// State của HomeScreen (UI State)
export interface HomeUiState {
  readonly products: Product[];
  readonly isLoading: boolean;
  readonly snackbarMessage: string | null;
}

export const useHomeViewModel = (
  repository: ProductRepository = new ProductRepositoryImpl()
) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [state, setState] = useState<HomeUiState>({
    products: [],
    isLoading: true,
    snackbarMessage: null,
  });

  // Tải danh sách sản phẩm từ Repository
  const loadProducts = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const data = await repository.getProducts();
      setState((prev) => ({
        ...prev,
        products: data,
        isLoading: false,
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        snackbarMessage: 'Không thể tải danh sách sản phẩm!',
      }));
    }
  }, [repository]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Event: Bấm vào một sản phẩm
  const onProductPress = useCallback(
    (product: Product) => {
      // 1. Hiển thị Snackbar thông báo sự kiện
      setState((prev) => ({
        ...prev,
        snackbarMessage: `Đang mở: ${product.name}`,
      }));

      // 2. Chuyển màn hình Detail kèm tham số productId
      navigation.navigate('Detail', { productId: product.id });
    },
    [navigation]
  );

  // Event: Tắt Snackbar
  const dismissSnackbar = useCallback(() => {
    setState((prev) => ({ ...prev, snackbarMessage: null }));
  }, []);

  return {
    state,
    onProductPress,
    dismissSnackbar,
    reload: loadProducts,
  };
};
