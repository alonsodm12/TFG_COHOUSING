// Community Profile Page

import { getUsernameFromToken } from "../../authUtils";
import { useState, useEffect } from "react";

import Button from "../../ui/Button/Button";
import ButtonFunction from "../../ui/Button/ButtonFunction";
import { deleteCommunity } from "../api/operations";
import { useCommunity } from "../hook/useCommunity";

const username: string | null = getUsernameFromToken();

export const CommunityProfilePage = () => {
  const { community, loading, error } = useCommunity("community-name");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  // Cuando no hay un username, muestra un error inmediatamente.
  if (!username) {
    return <p>Error: No se pudo obtener el nombre de usuario</p>;
  }

  useEffect(() => {
    setResponseMessage(null); // Resetear el mensaje de respuesta cuando se vuelva a renderizar
  }, [community]);
  
  // Manejo de la eliminación de la comunidad
  const handleRemove = async () => {
    try {
      const response = await deleteCommunity(username);

      if (!response.ok) {
        throw new Error("Error al eliminar la comunidad");
      }

      const result = await response.json();
      setResponseMessage("Comunidad eliminada con éxito");
      console.log("✅ Respuesta:", result);
    } catch (err) {
      setResponseMessage((err as Error).message);
    }
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Perfil de Comunidad</h2>
      <p>
        <strong>Nombre:</strong> {community?.name}
      </p>
      <p>
        <strong>Descripción:</strong> {community?.descripcion}
      </p>
      <p>
        <strong>Admin:</strong> {community?.idAdmin}
      </p>

      <h3>Estilo de vida</h3>
      <ul>
        <li>Tranquilo: {community?.lifestyleDTO.tranquilo}</li>
        <li>Actividad: {community?.lifestyleDTO.actividad}</li>
        <li>Limpieza: {community?.lifestyleDTO.limpieza}</li>
        <li>Compartir espacios: {community?.lifestyleDTO.compartirEspacios}</li>
        <li>Sociabilidad: {community?.lifestyleDTO.sociabilidad}</li>
      </ul>

      {/* Mostrar mensaje de éxito o error */}
      {responseMessage && <p>{responseMessage}</p>}

      <ButtonFunction label="Eliminar comunidad" onClick={handleRemove} />

      <Button
        label="Editar comunidad"
        to="/TFG_COHOUSING/community/edit"
        state={{ community }}
      />
    </div>
  );
};
