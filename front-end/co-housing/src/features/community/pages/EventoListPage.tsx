// src/pages/EventoListPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventosPorUsuario } from "../api/operations";
import { Evento} from "../api/type";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";

export const EventoListPage = () => {
  const { userId } = useParams();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetchEventosPorUsuario(parseInt(userId))
      .then((data) => {
        setEventos(data || []);
      })
      .catch((err) => {
        console.error("Error al cargar tareas del usuario", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <div id="root" className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 px-6 md:px-20 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Eventos asignadas
          </h1>

          {loading ? (
            <p className="text-gray-600 text-center">Cargando eventos...</p>
          ) : eventos.length === 0 ? (
            <p className="text-gray-500 text-center">
              No hay eventos asignados a este usuario.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {eventos.map((evento) => (
                <div
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold text-blue-700 mb-2">
                    {evento.titulo}
                  </h2>
                  <p className="text-gray-700 mb-2">{evento.descripcion}</p>
                  <p className="text-sm text-gray-500">
                    Fecha de entrega:{" "}
                    {new Date(evento.fechaTope).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-2">{evento.lugar}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
