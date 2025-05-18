// src/components/CommunityCard.tsx
import ButtonFunction from '../../ui/Button/ButtonFunction';
import Button from '../../ui/Button/Button';
import React from 'react';
import { UnirseComuniadad } from '../api/operations';

interface CommunityCardProps {
  id: number;
  name: string;
  descripcion: string;
  sociabilidad: number;
  tranquilidad: number;
  compartir_espacios: number;
  limpieza: number;
  actividad: number;
  integrantes: number[] | null;
  admin: number;
  userId: number;
  username: string | null;
}

const CommunityCard: React.FC<CommunityCardProps> = (props) => {
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
        idAdmin: props.admin
      });
      alert("Solicitud de unión enviada correctamente.");
    } catch (error) {
      console.error("Error al unirse a la comunidad:", error);
      alert("Error al enviar la solicitud.");
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-lg mb-4">
      <h2 className="text-xl font-bold">{props.name}</h2>
      <p className="text-gray-600 mb-2">{props.descripcion}</p>
      <ul className="text-sm text-gray-800">
        <li><strong>Sociabilidad:</strong> {props.sociabilidad}</li>
        <li><strong>Tranquilidad:</strong> {props.tranquilidad}</li>
        <li><strong>Compartir espacios:</strong> {props.compartir_espacios}</li>
        <li><strong>Limpieza:</strong> {props.limpieza}</li>
        <li><strong>Actividad:</strong> {props.actividad}</li>
        <li><strong>Integrantes:</strong> {(props.integrantes ?? []).join(', ')}</li>
        <li><strong>Admin:</strong> {props.admin}</li>
      </ul>
      <div className="flex gap-4 mt-4">
        <Button to={`/TFG_COHOUSING/community/profile/${props.name}`} label="Consultar Perfil" />
        <ButtonFunction label="Solicitar Unión" onClick={handleJoin} />
      </div>
    </div>
  );
};

export default CommunityCard;
