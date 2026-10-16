import { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { mapApiError } from '../../api/AppError';
import type { AppError } from '../../api/AppError';
import { getUserById } from '../home/api/userApi';
import type { User } from '../user/types';
import type {
  DetailScreenNavigationProp,
  DetailScreenRouteProp,
} from '../../navigation/types';

export interface DetailUiState {
  readonly user: User | null;
  readonly isLoading: boolean;
  readonly error: AppError | null;
}

export const useDetailViewModel = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { userId } = route.params;

  const [state, setState] = useState<DetailUiState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let ignore = false;

    setState({ user: null, isLoading: true, error: null });

    async function loadDetail() {
      try {
        const user = await getUserById(userId);

        if (!ignore) {
          setState({ user, isLoading: false, error: null });
        }
      } catch (error: unknown) {
        if (!ignore) {
          setState({
            user: null,
            isLoading: false,
            error: mapApiError(error),
          });
        }
      }
    }

    loadDetail();

    return () => {
      ignore = true;
    };
  }, [userId]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    state,
    goBack,
  };
};
