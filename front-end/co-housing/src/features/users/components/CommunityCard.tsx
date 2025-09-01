import React from "react";
import { Link } from "react-router-dom";

export interface CommunityRecommended {
  id: number;
  name: string;
  descripcion?: string;
  direccion: string;
  fotoUrl?: string;
  idAdmin: string;
  latitud?: number;
  longitud?: number;
}

interface Props {
  community: CommunityRecommended;
}

const CommunityCard: React.FC<Props> = ({ community }) => {
  const API: String = import.meta.env.VITE_API_BASE;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {community.fotoUrl ? (
        <img
          src={`${API}comunidades${community.fotoUrl}`}
          alt={`Foto de ${community.name}`}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
          Sin imagen
        </div>
      )}

      <div className="p-4">
        <h2 className="text-xl font-bold text-indigo-700 mb-2">
          {community.name}
        </h2>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Ubicación:</span> {community.direccion}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Admin:</span> {community.idAdmin}
        </p>

        <Link
          to={`/community/profile/${community.name}`}
          className="inline-block bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
        >
          Ver perfil
        </Link>
      </div>
    </div>
  );
};

export default CommunityCard;
