import { useState, useEffect } from 'react';
import { fetchCommunityByName } from '../api/operations';
import { CommunityProfile } from '../api/type';

export const useCommunity = (name: string | null) => {
  const [community, setCommunity] = useState<CommunityProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Nuevo estado para errores

  useEffect(() => {
    const loadCommunity = async () => {
      if (!name) {
        setLoading(false);
        return; // Si no hay 'name', no hacer nada
      }

      try {
        setLoading(true); // Establece loading a true al inicio de la solicitud
        const data = await fetchCommunityByName(name);
        setCommunity(data);
      } catch (error: any) {
        setError("Hubo un error al obtener la comunidad");
        console.error(error); // Esto sigue siendo útil para depuración
      } finally {
        setLoading(false); // Finalmente, establece loading a false
      }
    };

    loadCommunity();
  }, [name]);

  return { community, loading, error };
};
