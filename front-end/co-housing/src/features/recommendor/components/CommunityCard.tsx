// src/components/CommunityCard.tsx
import Button from '../../ui/Button/Button';
import React from 'react';

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
}

const CommunityCard: React.FC<CommunityCardProps> = (props) => {
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
      <Button to={`/TFG_COHOUSING/community/profile/${props.name}`} label="Consultar Perfil" />

    </div>
  );
};

export default CommunityCard;
