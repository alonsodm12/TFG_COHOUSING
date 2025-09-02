import { useEffect, useState } from "react";
import CommunityCard from "../components/CommunityCard";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useUserContext } from "../../ui/Context/UserContext";
import { CommunityRecommended } from "../components/CommunityCard";
import { obtenerComunidadesGuardadas } from "../api/operations"; // asegúrate de exportar esa función

export const UserComunidadesGuardadas = () => {
  const { userProfile } = useUserContext();
  const [communities, setCommunities] = useState<CommunityRecommended[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchComunidades = async () => {
      if (!userProfile || !userProfile.comunidadesGuardadas?.length) return;

      setIsLoading(true);
      try {
        const data = await obtenerComunidadesGuardadas(
          userProfile.comunidadesGuardadas
        );
        setCommunities(data);
      } catch (error) {
        console.error("Error al obtener comunidades guardadas:", error);
        setCommunities([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComunidades();
  }, [userProfile]);

  return (
    <>
      <Header />
      <main className="page">
        <h1 className="text-5xl font-bold text-black mb-2">
          Tus comunidades guardadas
        </h1>

        {isLoading ? (
          <p>Cargando comunidades...</p>
        ) : communities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {communities.map((comunidad) => (
              <CommunityCard community={comunidad} />
            ))}
          </div>
        ) : (
          <p>No tienes comunidades guardadas.</p>
        )}
      </main>
      <Footer />
    </>
  );
};
