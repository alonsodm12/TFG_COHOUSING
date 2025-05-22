import { getUsernameFromToken } from "../../authUtils";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams para obtener el nombre de la comunidad desde la URL


import { useCommunity } from "../hook/useCommunity";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";

const username: string | null = getUsernameFromToken();

export const CommunityUserPage = () => {
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
    <div id="root">
      <Header />
      <main className="page">
        <h1>¡Bienvenido a tu Comunidad!</h1>
        <p>
          <strong>Nombre:</strong> {community?.name}
        </p>
        <p>
          <strong>Descripción:</strong> {community?.descripcion}
        </p>
        <p>
            <strong>Tareas a realizar</strong>
        </p>
        <p>
            <strong>Consultar calendario</strong>
        </p>
        {/* Mostrar mensaje de éxito o error */}
        {responseMessage && <p>{responseMessage}</p>}
      </main>
      <Footer />
    </div>
  );
};
