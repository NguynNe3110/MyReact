import { useEffect, useState } from 'react';
import { User } from './types';
import { getUsers } from './api/userApi';
import { AppError, mapApiError } from '../../api/AppError';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AppError | null>(null);

  //0 false, 1 true
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // setup effect
    let ignore = false;

    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const data = await getUsers();

        if (!ignore) {
          setUsers(data);
        }
      } catch (cause: unknown) {
        if (!ignore) {
          const appError = mapApiError(cause);

          if (appError.kind !== 'cancelled') {
            setError(appError);
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadUsers();

    //cleanup effect
    return () => {
      ignore = true;
    };

    // dependency
  }, [reloadKey]);

  function reload() {
    setLoading(true);
    setReloadKey(pre => pre + 1);
  }

  function removeUser(userId: number) {
    setUsers(previousUsers => previousUsers.filter(user => user.id !== userId));
  }

  return {
    users,
    loading,
    error,
    reload,
    removeUser,
  };
}
