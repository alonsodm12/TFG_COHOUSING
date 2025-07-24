import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsernameFromToken } from "../../authUtils";
import {
  fetchCommunityById,
  fetchEventosPorUsuario,
  fetchTareasPorUsuario,
} from "../api/operations";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useUserContext } from "../../ui/Context/UserContext";
import { CommunityProfile, Evento, Tarea } from "../api/type";
import { Calendario } from "../components/Calendar";
import { Link } from "react-router-dom";
import ButtonFunction from "../../ui/Button/ButtonFunction";

export const CommunityUserPage = () => {
  const { userProfile, isLoading: isUserLoading } = useUserContext();
  const username: string | null = getUsernameFromToken();
  const navigate = useNavigate();

  const [community, setCommunity] = useState<CommunityProfile>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [taskIndex, setTaskIndex] = useState(0);
  const [eventoIndex, setEventoIndex] = useState(0);

  //Carga los datos de la comunidad

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
        userProfile.idComunidad = null;
        setError("Error al cargar la comunidad");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [userProfile]);

  //Carga las tareas del usuario

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

  //Carga los eventos del usuario

  useEffect(() => {
    if (!userProfile?.id) return;

    fetchEventosPorUsuario(userProfile.id)
      .then((data) => {
        setEventos(data || []);
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
  const handlePrevEvento = () => {
    if (eventoIndex >= 2) setEventoIndex(eventoIndex - 2);
  };

  const handleNextEvento = () => {
    if (eventoIndex + 2 < eventos.length) setEventoIndex(eventoIndex + 2);
  };

  if (!username) {
    return <p>Error: No se pudo obtener el nombre de usuario</p>;
  }

  if (isUserLoading) {
    return <p>Cargando perfil de usuario...</p>;
  }

  if (userProfile?.idComunidad === null) {
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
    <div id="root" className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow py-12 px-6 md:px-20 text-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Comunidad */}
          <section className="bg-white rounded-xl shadow-lg p-8 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">
              ¡Bienvenido a tu comunidad {community?.name}!
            </h1>
            <img
              src={`http://localhost:8082${community?.fotoUrl}`}
              alt={`Imagen de ${community?.name}`}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <p className="text-xl mb-2">
              <strong>Nombre:</strong> {community?.name}
            </p>
            <p className="text-gray-700">
              <strong>Descripción:</strong> {community?.descripcion}
            </p>
          </section>

          {/* Acciones */}
          <section className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() =>
                navigate(
                  `/TFG_COHOUSING/CreateTask/${userProfile?.idComunidad}`
                )
              }
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow-md transition"
            >
              Crear Tarea
            </button>
            <button
              onClick={() =>
                navigate(
                  `/TFG_COHOUSING/CreateEvent/${userProfile?.idComunidad}`
                )
              }
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg shadow-md transition"
            >
              Crear Evento
            </button>
            <ButtonFunction
              label="Administrar Tus Tareas"
              onClick={() =>
                navigate(`/TFG_COHOUSING/AdministrarTareas/${userProfile?.id}`)
              }
            />
          </section>

          {/* Tareas */}
          <section className="bg-white rounded-xl shadow-lg p-8 text-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold">Tareas asignadas</h2>
              <button
                onClick={() =>
                  navigate(`/TFG_COHOUSING/TaskListPage/${userProfile?.id}`)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow"
              >
                Ver todas
              </button>
            </div>

            {tasks.length === 0 ? (
              <p className="text-gray-600">No tienes tareas asignadas.</p>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={taskIndex === 0}
                  className="..."
                >
                  ◀
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                  {visibleTasks.map((tarea) => (
                    <div
                      key={tarea.id}
                      className="bg-gray-100 p-6 rounded-lg shadow transition hover:shadow-xl"
                    >
                      <h3 className="font-bold text-lg text-green-700 mb-2">
                        {tarea.titulo}
                      </h3>
                      <p className="text-gray-700">{tarea.descripcion}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={taskIndex + 2 >= tasks.length}
                  className="..."
                >
                  ▶
                </button>
              </div>
            )}
          </section>

          {/* Eventos */}
          <section className="bg-white rounded-xl shadow-lg p-8 text-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold">Eventos asignados</h2>
              <button
                onClick={() =>
                  navigate(`/TFG_COHOUSING/EventosListPage/${userProfile?.id}`)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow"
              >
                Ver todos
              </button>
            </div>

            {eventos.length === 0 ? (
              <p className="text-gray-600">No tienes eventos asignados.</p>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevEvento}
                  disabled={eventoIndex === 0}
                  className="..."
                >
                  ◀
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                  {eventos.slice(eventoIndex, eventoIndex + 2).map((evento) => (
                    <div
                      key={evento.id}
                      className="bg-gray-100 p-6 rounded-lg shadow transition hover:shadow-xl"
                    >
                      <h3 className="font-bold text-lg text-purple-700 mb-2">
                        {evento.titulo}
                      </h3>
                      <p className="text-gray-700">{evento.descripcion}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleNextEvento}
                  disabled={eventoIndex + 2 >= eventos.length}
                  className="..."
                >
                  ▶
                </button>
              </div>
            )}
          </section>

          {/* Calendario */}
          <section className="bg-white rounded-xl shadow-lg p-8 text-gray-800">
            <h2 className="text-3xl font-semibold mb-4">Calendario</h2>
            <Calendario userId={userProfile?.id!} />
          </section>

          {/* Mensaje de respuesta */}
          {responseMessage && (
            <div className="p-4 bg-green-100 text-green-800 rounded-md shadow">
              {responseMessage}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
