import { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from '../../domain/product';
import { ProductRepository } from '../../domain/ProductRepository';
import { ProductRepositoryImpl } from '../../data/ProductRepositoryImpl';
import { DetailScreenNavigationProp, DetailScreenRouteProp } from '../../navigation/types';

export interface DetailUiState {
  readonly product: Product | null;
  readonly isLoading: boolean;
}

export const useDetailViewModel = (
  repository: ProductRepository = new ProductRepositoryImpl()
) => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { productId } = route.params;

  const [state, setState] = useState<DetailUiState>({
    product: null,
    isLoading: true,
  });

  const loadDetail = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const product = await repository.getProductById(productId);
    setState({
      product,
      isLoading: false,
    });
  }, [productId, repository]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    state,
    goBack,
  };
};
