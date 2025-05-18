import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommunityCard from "../components/CommunityCard";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import common from "../../../index.css";
import { useUserContext } from "../../ui/Context/UserContext";

interface Community {
  id: number;
  name: string;
  descripcion: string;
  sociabilidad: number;
  tranquilidad: number;
  compartir_espacios: number;
  limpieza: number;
  actividad: number;
  integrantes: number[] | null; // ← acepta nulo
  admin: number;
}

const Recommendations: React.FC = () => {
  const { id } = useParams();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useUserContext();
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8000/recommendations/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        // Asegurar que integrantes no sea null
        const cleaned = data.map((c: Community) => ({
          ...c,
          integrantes: c.integrantes ?? [],
        }));
        setCommunities(cleaned);
      })
      .catch((err) => {
        console.error("Error fetching recommendations:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div id="root">
      <Header />
      <main className="page px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          COMUNIDADES RECOMENDADAS
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-500">
            Cargando recomendaciones...
          </p>
        ) : communities.length > 0 ? (
          communities.map((c) => (
            <CommunityCard
              key={c.id}
              {...c}
              userId={id ? parseFloat(id) : 0}
              username={username}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No se encontraron recomendaciones para este usuario.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;
