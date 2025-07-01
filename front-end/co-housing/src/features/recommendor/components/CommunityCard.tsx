import React, { useState } from "react";
import { CommunityRecommended } from "../../community/api/type";
import Button from "../../ui/Button/Button";
import ButtonFunction from "../../ui/Button/ButtonFunction";
import { UnirseComuniadad } from "../api/operations";
import { CommunityMap } from "../../community/components/CommunityMap";

interface CommunityCardProps extends CommunityRecommended {
  userId: number;
  username: string;
  onJoinSuccess?: (joinedCommunityId: number) => void; // Nueva prop para avisar éxito
}

const CommunityCard: React.FC<CommunityCardProps> = (props) => {
  const [hasRequestedJoin, setHasRequestedJoin] = useState(false);

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

      setHasRequestedJoin(true); // Cambia estado interno para desactivar botón
      alert("Solicitud de unión enviada correctamente.");

      if (props.onJoinSuccess) {
        props.onJoinSuccess(props.id); // Avisamos al padre para eliminar comunidad
      }
    } catch (error) {
      console.error("Error al unirse a la comunidad:", error);
      alert("Error al enviar la solicitud.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl mb-10 overflow-hidden border">
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
        <p className="text-red-500 font-bold mb-2">{props.affinity}</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{props.name}</h2>
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
