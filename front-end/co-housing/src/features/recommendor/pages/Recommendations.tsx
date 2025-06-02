import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommunityCard from "../components/CommunityCard";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useUserContext } from "../../ui/Context/UserContext";
import { CommunityRecommended } from "../../community/api/type";

const Recommendations: React.FC = () => {
  const { id } = useParams();
  const { username } = useUserContext();

  const [communities, setCommunities] = useState<CommunityRecommended[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [maxPrecio, setMaxPrecio] = useState<number>(1000);
  const [maxDistancia, setMaxDistancia] = useState<number>(50);

  // Lógica para cargar las recomendaciones iniciales (sin filtros)
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    fetch(`http://localhost:8000/recommendations/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        setCommunities(data);
      })
      .catch((err) => {
        console.error("Error fetching recommendations:", err);
        setCommunities([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // Función para aplicar los filtros (se llama al pulsar el botón)
  const aplicarFiltros = () => {
    if (!id) return;

    setIsLoading(true);
    fetch(`http://localhost:8000/recommendations-filtered/${id}?precio=${maxPrecio}&distancia=${maxDistancia}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        setCommunities(data);
      })
      .catch((err) => {
        console.error("Error fetching filtered recommendations:", err);
        setCommunities([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div id="root" className="min-h-screen bg-gray-50">
      <Header />
      <main className="page px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
          Comunidades Recomendadas
        </h1>

        {/* Barra de filtros */}
        <section className="mb-10 p-3 bg-white rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-center gap-8">
          {/* Filtro Precio */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <label htmlFor="precioRange" className="mb-2 text-gray-700 font-semibold text-lg">
              Precio máximo (€)
            </label>
            <input
              id="precioRange"
              type="range"
              min={0}
              max={2000}
              step={50}
              value={maxPrecio}
              onChange={(e) => setMaxPrecio(Number(e.target.value))}
              className="w-full sm:w-64 h-3 bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 rounded-lg appearance-none cursor-pointer"
            />
            <span className="mt-1 text-gray-600 font-medium">{maxPrecio} €</span>
          </div>

          {/* Filtro Distancia */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            <label htmlFor="distanciaRange" className="mb-2 text-gray-700 font-semibold text-lg">
              Distancia máxima (km)
            </label>
            <input
              id="distanciaRange"
              type="range"
              min={0}
              max={50}
              step={1}
              value={maxDistancia}
              onChange={(e) => setMaxDistancia(Number(e.target.value))}
              className="w-full sm:w-64 h-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 rounded-lg appearance-none cursor-pointer"
            />
            <span className="mt-1 text-gray-600 font-medium">{maxDistancia} km</span>
          </div>

          {/* Botón para aplicar filtros */}
          <button
            onClick={aplicarFiltros}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
          >
            Aplicar filtros
          </button>
        </section>

        {/* Lista de comunidades */}
        {isLoading ? (
          <p className="text-center text-gray-500 text-lg">Cargando recomendaciones...</p>
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
          <p className="text-center text-gray-500 text-lg">
            No se encontraron recomendaciones.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;
