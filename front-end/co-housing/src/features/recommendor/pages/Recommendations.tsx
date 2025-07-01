import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommunityCard from "../components/CommunityCard";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useUserContext } from "../../ui/Context/UserContext";
import { CommunityRecommended } from "../../community/api/type";
import { modificarDireccion } from "../../users/api/operations";

const Recommendations: React.FC = () => {
  const { id } = useParams();
  const { username } = useUserContext();

  const [communities, setCommunities] = useState<CommunityRecommended[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showUbicacionInput, setShowUbicacionInput] = useState(false);
  const [ubicacion, setUbicacion] = useState("");
  const [maxDistancia, setMaxDistancia] = useState(10);
  const [maxPrecio, setMaxPrecio] = useState(1000);

  const [latitud, setLatitud] = useState<string | null>(null);
  const [longitud, setLongitud] = useState<string | null>(null);

  const handleAplicarUbicacion = async () => {
    if (!ubicacion || !id) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          ubicacion
        )}`
      );
      const data = await res.json();

      if (data.length === 0) {
        alert("No se encontró la ubicación especificada.");
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      // Guardar en el backend
      await modificarDireccion(ubicacion, lat, lon, parseInt(id));

      // Guardar en estado local si quieres usarlo luego
      setLatitud(lat.toString());
      setLongitud(lon.toString());

      alert("Ubicación actualizada correctamente.");

      // (Opcional) aplicar filtros si quieres refrescar resultados
      aplicarFiltros();
    } catch (error) {
      console.error("Error al aplicar ubicación:", error);
      alert("Ocurrió un error al aplicar la ubicación.");
    }
  };
  // Función para eliminar comunidad del listado tras unión
  const handleCommunityJoined = (joinedId: number) => {
    setCommunities((prev) => prev.filter((c) => c.id !== joinedId));
  };

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

  const aplicarFiltros = () => {
    if (!id) return;

    setIsLoading(true);
    fetch(
      `http://localhost:8000/recommendations-filtered/${id}?precio=${maxPrecio}&distancia=${maxDistancia}`
    )
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
        <section className="mb-10 p-6 bg-white rounded-3xl shadow-lg space-y-6">
          {/* Filtro Precio */}
          <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col items-center sm:items-start w-full sm:w-1/3">
              <label
                htmlFor="precioRange"
                className="mb-2 text-gray-700 font-semibold text-lg"
              >
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
                className="w-full h-3 bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 rounded-lg appearance-none cursor-pointer"
              />
              <span className="mt-1 text-gray-600 font-medium">
                {maxPrecio} €
              </span>
            </div>

            {/* Filtro Distancia */}
            <div className="flex flex-col items-center sm:items-start w-full sm:w-1/3">
              <label
                htmlFor="distanciaRange"
                className="mb-2 text-gray-700 font-semibold text-lg"
              >
                Radio de búsqueda (km)
              </label>
              <input
                id="distanciaRange"
                type="range"
                min={1}
                max={50}
                step={1}
                value={maxDistancia}
                onChange={(e) => setMaxDistancia(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 rounded-lg appearance-none cursor-pointer"
              />
              <span className="mt-1 text-gray-600 font-medium">
                {maxDistancia} km
              </span>
            </div>

            {/* Botón aplicar */}
            <div className="w-full sm:w-1/3 flex justify-center sm:justify-end">
              <button
                onClick={aplicarFiltros}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
              >
                Aplicar filtros
              </button>
            </div>
          </div>

          {/* Desplegable de ubicación */}
          <div className="border-t pt-4">
            <button
              onClick={() => setShowUbicacionInput(!showUbicacionInput)}
              className="text-indigo-600 font-medium hover:underline flex items-center gap-2"
            >
              {showUbicacionInput
                ? "Ocultar ubicación ▲"
                : "Añadir ubicación ▼"}
            </button>

            {showUbicacionInput && (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="flex flex-col w-full sm:w-auto">
                  <label
                    htmlFor="ubicacionInput"
                    className="mb-1 text-gray-700 font-semibold"
                  >
                    Dirección
                  </label>
                  <input
                    id="ubicacionInput"
                    type="text"
                    placeholder="Ej: Camino de Ronda, Granada"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <button
                  onClick={handleAplicarUbicacion}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow self-start sm:self-auto"
                >
                  Aplicar
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Lista de comunidades */}
        {isLoading ? (
          <p className="text-center text-gray-500 text-lg">
            Cargando recomendaciones...
          </p>
        ) : communities.length > 0 ? (
          communities.map((c) => (
            <CommunityCard
              key={c.id}
              {...c}
              userId={id ? parseFloat(id) : 0}
              username={username ? username : "null"}
              onJoinSuccess={handleCommunityJoined}
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
