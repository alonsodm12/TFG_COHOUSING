import React, { useEffect, useState } from "react";
import { SolicitudesDTO } from "../api/types";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSolicitudesUsuario,
  aceptarSolicitud,
  rechazarSolicitud,
  eliminarSolicitud,
} from "../api/operations";

const SolicitudesPage: React.FC = () => {
  const { userId } = useParams();
  const [solicitudes, setSolicitudes] = useState<SolicitudesDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();

  const fetchSolicitudes = async () => {
    if (!userId) return;
    try {
      setRefreshing(true);
      const data = await getSolicitudesUsuario(userId);
      setSolicitudes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const eliminar = async (id: number) => {
    try {
      await eliminarSolicitud(id);
      setSolicitudes((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, [userId]);

  const handleAccion = async (id: number, tipo: "aceptar" | "rechazar") => {
    setLoading(true);
    try {
      if (tipo === "aceptar") await aceptarSolicitud(id);
      else await rechazarSolicitud(id);

      setSolicitudes((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      alert("Ocurrió un error al procesar la solicitud.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="root">
      <Header />
      <main className="page">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Mis Solicitudes
        </h1>

        <button
          onClick={fetchSolicitudes}
          disabled={refreshing || loading}
          className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {refreshing ? "Actualizando..." : "Actualizar solicitudes"}
        </button>

        {solicitudes.length === 0 ? (
          <p className="text-gray-500 text-center">
            No hay solicitudes disponibles.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {solicitudes.map((solicitud, index) => {
              const match = solicitud.descripcion.match(
                /El usuario: (.+?) ha solicitado/
              );
              const username = match ? match[1] : "";

              return (
                <div
                  key={solicitud.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                    Solicitud #{index + 1}
                  </h2>
                  <p className="text-gray-500 mb-1 capitalize">
                    Tipo: <strong>{solicitud.tipo}</strong>
                  </p>
                  <p className="text-gray-700 mb-4">{solicitud.descripcion}</p>

                  <div className="flex gap-4">
                    {solicitud.tipo === "compleja" && (
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleAccion(solicitud.id, "aceptar")}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                          disabled={loading}
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => handleAccion(solicitud.id, "rechazar")}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                          disabled={loading}
                        >
                          Rechazar
                        </button>
                        <button
                          onClick={() => navigate(`/user/externo/${username}`)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                          disabled={loading}
                        >
                          Conoce al usuario
                        </button>
                      </div>
                    )}

                    {solicitud.tipo === "basica" && (
                      <button
                        onClick={() => eliminar(solicitud.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        disabled={loading}
                      >
                        Aceptar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SolicitudesPage;
