import { getUsernameFromToken } from "../../authUtils";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams para obtener el nombre de la comunidad desde la URL
import { CommunityMap } from "../components/CommunityMap";

import { useCommunity } from "../hook/useCommunity";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";

const username: string | null = getUsernameFromToken();

export const CommunityProfilePage = () => {
  // Usamos useParams para obtener el nombre de la comunidad de la URL
  const { communityName } = useParams<{ communityName: string }>(); // Aquí "communityName" es el parámetro de la URL

  // Comprobar si communityName es undefined, y si lo es, asignarle un valor null
  const communityNameValid = communityName ?? null;

  const { community, loading, error } = useCommunity(communityNameValid);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  // Cuando no hay un username, muestra un error inmediatamente.
  if (!username) {
    return <p>Error: No se pudo obtener el nombre de usuario</p>;
  }

  // Si no se obtiene un nombre de comunidad, muestra un error.
  if (!communityNameValid) {
    return (
      <p>Error: No se pudo obtener el nombre de la comunidad desde la URL</p>
    );
  }

  useEffect(() => {
    setResponseMessage(null); // Resetear el mensaje de respuesta cuando se vuelva a renderizar
  }, [community]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      id="root"
      className="min-h-screen flex flex-col bg-gray-50 text-gray-800"
    >
      <Header />
      <main className="page">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">
          Perfil de Comunidad
        </h1>

        {community?.fotoUrl ? (
          <img
            src={`http://localhost:8082${community?.fotoUrl}`}
            alt={`Foto de ${community?.name}`}
            className="w-3/4 h-72 object-cover rounded-lg shadow-md mb-6 border border-gray-300"
          />
        ) : (
          <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-400 rounded-lg mb-6 border border-dashed border-gray-300">
            Sin imagen
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <p className="text-xl font-semibold mb-2">
            <span className="text-indigo-600">Nombre:</span> {community?.name}
          </p>
          <p className="mb-4">
            <span className="font-semibold text-indigo-600">Descripción:</span>{" "}
            {community?.descripcion}
          </p>
          <p className="mb-6">
            <span className="font-semibold text-indigo-600">Admin:</span>{" "}
            {community?.idAdmin}
          </p>
          <p className="mb-4">
            <span className="font-semibold text-indigo-600">Ubicacion:</span>{" "}
            {community?.direccion}
          </p>
          {community?.latitud && community?.longitud ? (
            <CommunityMap
              latitude={community.latitud}
              longitude={community.longitud}
              address={community.direccion}
            />
          ) : (
            <div>No hay ubicación disponible</div>
          )}

          <h3 className="text-2xl font-semibold text-indigo-700 mb-4 border-b border-indigo-300 pb-2">
            Estilo de vida
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
            <li>
              <span className="font-semibold">Tranquilidad:</span>{" "}
              {community?.lifestyleDTO.tranquilidad}
            </li>
            <li>
              <span className="font-semibold">Actividad:</span>{" "}
              {community?.lifestyleDTO.actividad}
            </li>
            <li>
              <span className="font-semibold">Limpieza:</span>{" "}
              {community?.lifestyleDTO.limpieza}
            </li>
            <li>
              <span className="font-semibold">Compartir espacios:</span>{" "}
              {community?.lifestyleDTO.compartirEspacios}
            </li>
            <li>
              <span className="font-semibold">Sociabilidad:</span>{" "}
              {community?.lifestyleDTO.sociabilidad}
            </li>
          </ul>

          {responseMessage && (
            <p className="mt-6 p-3 bg-indigo-100 text-indigo-800 rounded-md shadow-sm">
              {responseMessage}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
