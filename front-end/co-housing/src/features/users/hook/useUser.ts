// features/user/hooks/useUser.ts
import { useState, useEffect } from 'react';
import { fetchUserByUsername } from '../api/operations';
import { UserProfile } from '../api/types';

export const useUser = (name: string | null) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserByUsername(name)
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [name]);

  return { user, loading };
};
