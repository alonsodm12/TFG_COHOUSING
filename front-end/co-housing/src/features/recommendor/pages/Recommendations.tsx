import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommunityCard from "../components/CommunityCard";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useUserContext } from "../../ui/Context/UserContext";
import { CommunityRecommended } from "../../community/api/type";
import { modificarDireccion } from "../../users/api/operations";
import { getRecommendations } from "../api/operations";

const Recommendations: React.FC = () => {
  const { id } = useParams();
  const { userProfile } = useUserContext();

  const [communities, setCommunities] = useState<CommunityRecommended[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showUbicacionInput, setShowUbicacionInput] = useState(false);
  const [ubicacion, setUbicacion] = useState("");
  const [maxDistancia, setMaxDistancia] = useState(10);
  const [maxPrecio, setMaxPrecio] = useState(1000);
  const [currentIndex, setCurrentIndex] = useState(0);
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
  
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const response = await getRecommendations(id); // esperamos la promesa
        setCommunities(response); // ahora sí tenemos los datos
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRecommendations();
  }, [id]);

  const aplicarFiltros = () => {
    if (!id) return;

    setIsLoading(true);
    fetch(
      `https://localhost:8084/recommendations-filtered/${id}?precio=${maxPrecio}&distancia=${maxDistancia}`
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
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? communities.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === communities.length - 1 ? 0 : prev + 1));
  };
  return (
    <div id="root" className="min-h-screen bg-gray-50">
      <Header />
      <main className="page px-4 py-8">
        <h1 className="text-5xl font-extrabold mb-10 text-center text-black">
          Comunidades Recomendadas
        </h1>

        {/* Filtros */}
        <section className="mb-12 bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Precio */}
            <div>
              <label
                htmlFor="precioRange"
                className="block text-lg font-semibold text-gray-700 mb-2"
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
                className="w-full h-2 bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm mt-2 text-gray-600 font-medium text-center">
                {maxPrecio} €
              </p>
            </div>

            {/* Distancia */}
            <div>
              <label
                htmlFor="distanciaRange"
                className="block text-lg font-semibold text-gray-700 mb-2"
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
                className="w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-sm mt-2 text-gray-600 font-medium text-center">
                {maxDistancia} km
              </p>
            </div>

            {/* Botón aplicar */}
            <div className="flex items-end justify-center sm:justify-end">
              <button
                onClick={aplicarFiltros}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-200 shadow"
              >
                Aplicar filtros
              </button>
            </div>
          </div>

          {/* Ubicación */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={() => setShowUbicacionInput(!showUbicacionInput)}
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 transition"
            >
              {showUbicacionInput
                ? "Ocultar ubicación ▲"
                : "Añadir ubicación ▼"}
            </button>

            {showUbicacionInput && (
              <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-inner flex flex-col sm:flex-row sm:items-end gap-4">
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
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                >
                  Aplicar
                </button>
              </div>
            )}
          </div>
        </section>
        <div className="flex gap-6 items-center mt-4">
          <button
            onClick={handlePrev}
            className="bg-gray-800 hover:bg-gray-600 text-white text-lg font-bold px-5 py-2 rounded-full transition-transform hover:scale-110"
          >
            ◀
          </button>
          {/* Lista de comunidades */}
          {isLoading ? (
            <p className="text-center text-gray-500 text-lg">
              Cargando recomendaciones...
            </p>
          ) : communities.length > 0 ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-3xl transition-all duration-300 ease-in-out">
                <CommunityCard
                  key={communities[currentIndex].id}
                  {...communities[currentIndex]}
                  userId={id ? parseFloat(id) : 0}
                  username={userProfile?.username || ""}
                  idComunidad={userProfile?.idComunidad || null}
                  onJoinSuccess={handleCommunityJoined}
                  comunidadesGuardadas={
                    userProfile?.comunidadesGuardadas || null
                  }
                />
              </div>

              <span className="text-sm text-gray-600">
                Comunidad {currentIndex + 1} de {communities.length}
              </span>
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No se encontraron recomendaciones.
            </p>
          )}{" "}
          <button
            onClick={handleNext}
            className="bg-gray-800 hover:bg-gray-600 text-white text-lg font-bold px-5 py-2 rounded-full transition-transform hover:scale-110"
          >
            ▶
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;
