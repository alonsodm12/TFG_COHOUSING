// src/pages/Recommendations.tsx
import React, { useEffect, useState } from "react";
import CommunityCard from "../components/CommunityCard";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import common from "../../../index.css";

interface Community {
  id: number;
  name: string;
  descripcion: string;
  sociabilidad: number;
  tranquilidad: number;
  compartir_espacios: number;
  limpieza: number;
  actividad: number;
  integrantes: number[];
  admin: number;
}

const Recommendations: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const userId = 2; // <-- aquí pondrías el ID dinámico si lo tienes

  useEffect(() => {
    fetch(`http://localhost:8000/recommendations/${userId}`)
      .then((res) => res.json())
      .then((data) => setCommunities(data))
      .catch((err) => console.error("Error fetching recommendations:", err));
  }, []);

  return (
    <div id="root">
      <Header />
      <main className="page">
        <h1 className="text-2xl font-bold mb-6">Comunidades recomendadas</h1>
        {communities.map((c) => (
          <CommunityCard key={c.id} {...c} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;
