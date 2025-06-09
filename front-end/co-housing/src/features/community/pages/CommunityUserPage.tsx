import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsernameFromToken } from "../../authUtils";
import { fetchCommunityById, fetchTareasPorUsuario } from "../api/operations";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useUserContext } from "../../ui/Context/UserContext";
import { CommunityProfile, Tarea } from "../api/type";
import { Calendar } from "../components/Calendar";

export const CommunityUserPage = () => {
  const { userProfile, isLoading: isUserLoading } = useUserContext();
  const username: string | null = getUsernameFromToken();
  const navigate = useNavigate();

  const [community, setCommunity] = useState<CommunityProfile>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {
    if (
      isUserLoading ||
      !userProfile?.idComunidad ||
      userProfile.idComunidad === 0
    ) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchCommunityById(userProfile.idComunidad.toString())
      .then((data) => {
        setCommunity(data);
        setError(null);
      })
      .catch((err) => {
        setError("Error al cargar la comunidad");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [userProfile]);

  useEffect(() => {
    if (!userProfile?.id) return;

    fetchTareasPorUsuario(userProfile.id)
      .then((data) => {
        setTasks(data || []);
      })
      .catch((err) => {
        console.error("Error al cargar tareas", err);
      });
  }, [userProfile]);

  useEffect(() => {
    setResponseMessage(null);
  }, [community]);

  const visibleTasks = tasks.slice(taskIndex, taskIndex + 2);

  const handlePrev = () => {
    if (taskIndex >= 2) setTaskIndex(taskIndex - 2);
  };

  const handleNext = () => {
    if (taskIndex + 2 < tasks.length) setTaskIndex(taskIndex + 2);
  };

  if (!username) {
    return <p>Error: No se pudo obtener el nombre de usuario</p>;
  }

  if (isUserLoading) {
    return <p>Cargando perfil de usuario...</p>;
  }

  if (userProfile?.idComunidad === 0) {
    return (
      <div id="root">
        <Header />
        <main className="page text-center py-12 px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Todavía no formas parte de ninguna comunidad!
          </h1>
          <p className="text-gray-600 mb-6">
            Puedes buscar una comunidad que se ajuste a ti y unirte cuando estés
            listo.
          </p>
          <button
            onClick={() =>
              navigate(`/TFG_COHOUSING/recommendations/${userProfile.id}`)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Buscar comunidad
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) return <p>Cargando datos de la comunidad...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="root" className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 px-6 md:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Tarjeta de la comunidad */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Bienvenido a tu Comunidad!
            </h1>
            <img
              src={`http://localhost:8082${community?.fotoUrl}`}
              alt={`Imagen de ${community?.name}`}
              className="w-full h-64 object-cover"
            />
            <p className="text-lg text-gray-700 mb-2">
              <strong>Nombre:</strong> {community?.name}
            </p>
            <p className="text-gray-600">
              <strong>Descripción:</strong> {community?.descripcion}
            </p>
          </div>
          <button
            onClick={() =>
              navigate(`/TFG_COHOUSING/CreateTask/${userProfile?.idComunidad}`)
            }
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow"
          >
            Crear Tarea
          </button>
          <button
            onClick={() => navigate("/TFG_COHOUSING/crear-evento")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow"
          >
            Crear Evento
          </button>
          {/* Tareas asignadas */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Tareas asignadas
            </h2>

            {tasks.length === 0 ? (
              <p className="text-gray-500">No tienes tareas asignadas.</p>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Flecha izquierda */}
                <button
                  onClick={handlePrev}
                  disabled={taskIndex === 0}
                  className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
                ></button>

                {/* Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                  {visibleTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                    >
                      <h3 className="font-bold text-lg text-blue-700">
                        {task.titulo}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Asignada a: {task.descripcion}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate("/TFG_COHOUSING/crear-evento")}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg shadow"
                >
                  Mostrar Tareas
                </button>
                {/* Flecha derecha */}
                <button
                  onClick={handleNext}
                  disabled={taskIndex + 2 >= tasks.length}
                  className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
                ></button>
              </div>
            )}
          </div>

          {/* Calendario */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Calendario
            </h2>
            <Calendar userId={userProfile?.id!} />
          </div>

          {responseMessage && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md shadow">
              {responseMessage}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
