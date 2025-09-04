import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Header } from "../../ui/Header/Header";

import { Footer } from "../../ui/Footer/Footer";
import { getTask } from "../api/operations";
import { Tarea } from "../api/type";
import ButtonFunction from "../../ui/Button/ButtonFunction";
import { completarTarea } from "../api/operations";
import { Spinner } from "../../users/components/Spinner";

export const TaskProfilePage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<Tarea>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getTask(Number(taskId));
        setTask(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleCompletar = async () => {
    try {
      await completarTarea(Number(taskId));
      const nuevaTarea = await getTask(Number(taskId));
      setTask(nuevaTarea);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (isLoading) return <Spinner/>;

  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div id="root">
      <Header />
      <main className="page">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl max-w-xl w-full p-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
              Detalle de la Tarea
            </h2>
            <div className="text-gray-800 dark:text-gray-300 text-center space-y-3 mb-8">
              <p>
                <strong>Título:</strong> {task?.titulo}
              </p>
              <p>
                <strong>Descripción:</strong> {task?.descripcion}
              </p>
              <p>
                <strong>Duración:</strong> {task?.duracion}
              </p>
              <p>
                <strong>Fecha Límite:</strong> {task?.fechaTope}
              </p>
              <p>
                <strong>Estado:</strong> {task?.estado}
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <ButtonFunction
                  label="Marcar Completada"
                  onClick={handleCompletar}
                />
              </div>
            </div>
            {error && <p className="text-red-600 mt-6">{error}</p>}
          </div>
        
      </main>
      <Footer />
    </div>
  );
};
