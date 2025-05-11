// features/user/hooks/useUser.ts
import { useState, useEffect } from 'react';
import { fetchUserByUsername } from '../api/operations';
import { UserProfile } from '../api/types';

export const useUser = (name: string | null) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (name) {
          const data = await fetchUserByUsername(name);
          setUser(data);
          localStorage.setItem('currentUser', JSON.stringify(data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [name]);

  return { user, loading };
};
