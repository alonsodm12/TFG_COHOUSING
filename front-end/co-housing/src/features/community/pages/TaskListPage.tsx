// src/pages/UserTasksPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTareasPorUsuario } from "../api/operations";
import { Tarea } from "../api/type";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";

export const TaskListPage = () => {
  const { userId } = useParams();
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    fetchTareasPorUsuario(parseInt(userId))
      .then((data) => {
        setTasks(data || []);
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
            Tareas asignadas
          </h1>

          {loading ? (
            <p className="text-gray-600 text-center">Cargando tareas...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500 text-center">
              No hay tareas asignadas a este usuario.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-semibold text-blue-700 mb-2">
                    {task.titulo}
                  </h2>
                  <p className="text-gray-700 mb-2">{task.descripcion}</p>
                  <p className="text-sm text-gray-500">
                    Fecha de entrega:{" "}
                    {new Date(task.fechaTope).toLocaleDateString()}
                  </p>
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
