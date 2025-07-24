import React, { useState, useEffect } from "react";
import { CommunityRecommended } from "../../community/api/type";
import Button from "../../ui/Button/Button";
import ButtonFunction from "../../ui/Button/ButtonFunction";
import {
  addComunidad,
  removeComunidad,
  UnirseComuniadad,
} from "../api/operations";
import { CommunityMap } from "../../community/components/CommunityMap";

interface CommunityCardProps extends CommunityRecommended {
  userId: number;
  username: string;
  onJoinSuccess?: (joinedCommunityId: number) => void;
  comunidadesGuardadas?: number[] | null;
}

const CommunityCard: React.FC<CommunityCardProps> = (props) => {
  console.log(props.comunidadesGuardadas);

  const [hasRequestedJoin, setHasRequestedJoin] = useState(false);
  const isFavoriteInitial =
    props.comunidadesGuardadas?.includes(props.id) || false;

  console.log(isFavoriteInitial);
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const [loadingFav, setLoadingFav] = useState(false);

  useEffect(() => {
    const fav = props.comunidadesGuardadas?.includes(props.id) || false;
    setIsFavorite(fav);
  }, [props.comunidadesGuardadas, props.id]);

  const handleJoin = async () => {
    if (!props.username) {
      alert("No se pudo obtener el nombre de usuario.");
      return;
    }

    try {
      await UnirseComuniadad({
        userId: props.userId,
        username: props.username,
        communityId: props.id,
        idAdmin: props.admin,
      });

      setHasRequestedJoin(true);
      alert("Solicitud de unión enviada correctamente.");

      if (props.onJoinSuccess) {
        props.onJoinSuccess(props.id);
      }
    } catch (error) {
      console.error("Error al unirse a la comunidad:", error);
      alert("Error al enviar la solicitud.");
    }
  };

  const toggleFavorite = async () => {
    if (loadingFav) return; // evitar clicks rápidos

    setLoadingFav(true);
    try {
      if (isFavorite) await removeComunidad(props.userId, props.id);
      else await addComunidad(props.userId, props.id);

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Error al cambiar favorito.");
    } finally {
      setLoadingFav(false);
    }
  };

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl mb-10 overflow-hidden border">
      {/* Corazón arriba derecha */}
      <button
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        className="absolute top-4 right-4 text-4xl transition-colors duration-300"
        style={{
          userSelect: "none",
          cursor: loadingFav ? "not-allowed" : "pointer",
          background: "none",
          border: "none",
        }}
      >
        {isFavorite ? "❤️" : "🖤"}
      </button>
      <div className="absolute top-4 left-4 w-16 h-16 flex items-center justify-center text-md font-bold text-white rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
        {props.affinity}%
      </div>
      {/* Imagen destacada */}
      {props.fotoUrl ? (
        <img
          src={`http://localhost:8082${props?.fotoUrl}`}
          alt={`Imagen de ${props.name}`}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          Sin imagen disponible
        </div>
      )}

      {/* Contenido principal */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          {props.name}
        </h2>
        <p className="text-gray-600 mb-4 text-center">{props.descripcion}</p>

        <hr className="border-t border-white mb-4" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-800">
          <div>
            <strong>Tranquilidad:</strong> {props.tranquilidad}
          </div>
          <div>
            <strong>Actividad:</strong> {props.actividad}
          </div>
          <div>
            <strong>Limpieza:</strong> {props.limpieza}
          </div>
          <div>
            <strong>Compartir espacios:</strong> {props.compartir_espacios}
          </div>
          <div>
            <strong>Sociabilidad:</strong> {props.sociabilidad}
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <strong>Precio:</strong> {props.precio} €
          </div>
          <div>
            <strong>Admin ID:</strong> {props.admin}
          </div>
        </div>
        {props?.latitud && props?.longitud ? (
          <CommunityMap
            latitude={props.latitud}
            longitude={props.longitud}
            address={props.direccion}
          />
        ) : (
          <div>No hay ubicación disponible</div>
        )}

        <div className="flex flex-wrap gap-4 mt-6">
          <Button
            to={`/TFG_COHOUSING/community/profile/${props.name}`}
            label="Consultar Perfil"
          />
          <ButtonFunction
            label={hasRequestedJoin ? "Solicitud enviada" : "Solicitar Unión"}
            onClick={handleJoin}
            disabled={hasRequestedJoin}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
