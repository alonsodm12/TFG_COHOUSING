import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  activarRepartoSemanal,
  completarEvento,
  deleteEliminarComunidad,
  deleteEliminarUsuario,
  fetchCommunityById,
  fetchEventosPorUsuario,
  fetchTareasPorUsuario,
  getPorcentajeTareasComunidad,
  getPorcentajeTareasUsuario,
  obtenerUsuariosDeComunidad,
} from "../api/operations";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useUserContext } from "../../ui/Context/UserContext";
import { CommunityProfile, Evento, Tarea } from "../api/type";
import { Calendario } from "../components/Calendar";

import { AlertModal } from "../../ui/AlertModal/AlertModal";

import BarraProgreso from "../components/BarraProgreso";
import Modal from "../components/Modal";
import TaskModal from "../components/ModalTarea";
import EventoModal from "../components/ModalEvento";
import { Spinner } from "../../users/components/Spinner";
interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  role: string;
  email?: string;
  fotoUrl?: string;
}
export const CommunityUserPage = () => {
  const API: String = import.meta.env.VITE_API_BASE;
  const { userProfile, isLoading: isUserLoading } = useUserContext();
  const username: string | undefined = userProfile?.username;
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };
  const [community, setCommunity] = useState<CommunityProfile>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [taskIndex, setTaskIndex] = useState(0);
  const [eventoIndex, setEventoIndex] = useState(0);
  const [porcentajeUsuario, setPorcentajeUsuario] = useState<number | null>(
    null
  );
  const [porcentajeComunidad, setPorcentajeComunidad] = useState<number | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Tarea | null>(null);
  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);
  const [isModalEventOpen, setIsModalEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  //FUNCIONES PARA ABRIR MODALES
  const openTaskModal = (tarea: Tarea) => {
    setSelectedTask(tarea);
    setIsModalTaskOpen(true);
  };

  const openEventModal = (evento: Evento) => {
    setSelectedEvent(evento);
    setIsModalEventOpen(true);
  };

  // 1. useEffect - Datos del usuario
  useEffect(() => {
    const userId = userProfile?.id;

    if (!userId) return;

    // Tareas
    fetchTareasPorUsuario(userId)
      .then((data) => setTasks(data || []))
      .catch((err) => console.error("Error al cargar tareas", err));

    // Eventos
    fetchEventosPorUsuario(userId)
      .then((data) => setEventos(data || []))
      .catch((err) => console.error("Error al cargar eventos", err));

    // Porcentaje del usuario
    getPorcentajeTareasUsuario(userId)
      .then((data) => setPorcentajeUsuario(data.porcentaje))
      .catch((err) =>
        console.error("Error al cargar porcentaje de usuario", err)
      );
  }, [userProfile?.id]);

  // 2. useEffect - Datos de la comunidad
  useEffect(() => {
    const comunidadId = userProfile?.idComunidad;

    if (isUserLoading || !comunidadId || comunidadId === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);

    obtenerUsuariosDeComunidad(comunidadId)
      .then((data) => {
        setUsuarios(data);
      })
      .catch(() => {
        setError("Error al cargar los usuarios de la comunidad");
      });
    fetchCommunityById(comunidadId.toString())
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
  }, [userProfile?.idComunidad, isUserLoading]);

  // 3. useEffect - Porcentaje de comunidad + limpiar mensaje
  useEffect(() => {
    const comunidadId = userProfile?.idComunidad;

    if (!comunidadId) return;

    // Limpiar mensaje de respuesta al cambiar comunidad
    setResponseMessage(null);

    // Cargar porcentaje de comunidad
    getPorcentajeTareasComunidad(comunidadId)
      .then((data) => setPorcentajeComunidad(data.porcentaje))
      .catch((err) =>
        console.error("Error al cargar porcentaje de comunidad", err)
      );
  }, [community]);

  // Paginación de tareas
  const visibleTasks = tasks.slice(taskIndex, taskIndex + 2);
  const handlePrev = () => {
    if (taskIndex >= 2) setTaskIndex(taskIndex - 2);
  };
  const handleNext = () => {
    if (taskIndex + 2 < tasks.length) setTaskIndex(taskIndex + 2);
  };

  // Paginación de eventos
  const visibleEventos = eventos.slice(eventoIndex, eventoIndex + 2);
  const handlePrevEvento = () => {
    if (eventoIndex >= 2) setEventoIndex(eventoIndex - 2);
  };
  const handleNextEvento = () => {
    if (eventoIndex + 2 < eventos.length) setEventoIndex(eventoIndex + 2);
  };

  if (!username) {
    return <Spinner />;
  }

  if (isUserLoading) {
    return <Spinner />;
  }

  if (userProfile?.idComunidad === null) {
    return (
      <div id="root">
        <Header />
        <main className="page">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Todavía no formas parte de ninguna comunidad!
          </h1>
          {userProfile.role === "buscador" && (
            <>
              <p className="text-gray-600 mb-6">
                Puedes buscar una comunidad que se ajuste a ti y unirte cuando
                estés listo.
              </p>
              <button
                onClick={() => navigate(`/recommendations/${userProfile.id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Buscar comunidad
              </button>
            </>
          )}

          {userProfile.role === "ofertante" && (
            <>
              <p className="text-gray-600 mb-6">
                Crea una comunidad que se ajuste a ti y observa cómo la gente
                busca formar parte de ella.
              </p>
              <button
                onClick={() => navigate(`/home`)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Home
              </button>
            </>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="root">
      <Header />
      <main className="page">
        <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-3">
          {/* Comunidad */}
          <section className="rounded p-6 text-gray-900 md:col-span-4 items-center">
            <h1 className="text-5xl font-extrabold mb-10 text-center text-black">
              ¡Bienvenido a {community?.name}!
            </h1>
            <div className="bg-white/50 backdrop-blur-3xl p-6 rounded-2xl shadow-xl max-w-3xl mx-auto">
              <div className="relative w-full h-72 mb-6 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={`${API}comunidades${community?.fotoUrl}`}
                  alt={`Imagen de ${community?.name}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 text-black text-xl font-bold drop-shadow">
                  {community?.name}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="mt-6 px-5 py-2 flex items-center gap-2 rounded-md bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition duration-300 mx-auto"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Gestionar Comunidad
              </button>
            </div>

            {menuOpen && (
              <div className="w-2/4 mx-auto bg-gray-800 border border-gray-200 rounded shadow-2xl flex flex-col items-center">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(`/CreateTask/${userProfile?.idComunidad}`);
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-600 text-white"
                >
                  Crear Tarea
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(`/CreateEvent/${userProfile?.idComunidad}`);
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-600 text-white"
                >
                  Crear Evento
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(`/AdministrarTareas/${userProfile?.id}`);
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-600 text-white"
                >
                  Administrar Tus Tareas
                </button>

                {/* Renderizado condicional para role "ofertante" */}
                {userProfile?.role === "ofertante" && (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      // Aquí pon la navegación o acción que quieras
                      navigate(`/community/edit`, {
                        state: { community: community },
                      });
                    }}
                    className="w-full px-4 py-2 hover:bg-gray-600 text-white"
                  >
                    Editar Comunidad
                  </button>
                )}
                {userProfile?.role === "ofertante" && (
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full px-4 py-2 hover:bg-gray-600 text-white"
                  >
                    Eliminar Comunidad
                  </button>
                )}
                {userProfile?.role === "buscador" && (
                  <button
                    onClick={() => setShowLeaveModal(true)}
                    className="w-full px-4 py-2 hover:bg-gray-600 text-white"
                  >
                    Abandonar Comunidad
                  </button>
                )}
                <button
                  onClick={async () => {
                    try {
                      const data = await activarRepartoSemanal();
                      console.log("Reparto semanal activado:", data);
                      console.log(alertOpen);
                      console.log(alertMessage);
                      showAlert("Reparto semanal activado correctamente");
                    } catch (error) {
                      console.error(error);
                      showAlert("Error al activar el reparto semanal");
                    }
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-600 text-white"
                >
                  Reparto Semanal
                </button>
              </div>
            )}
          </section>

          <section className="bg-gray-800 text-white rounded-full px-10 py-6 flex justify-around items-center gap-8 md:col-span-4 w-3/4 mx-auto shadow-lg">
            {porcentajeUsuario !== null && (
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-2">
                  Total progreso Individual
                </p>
                <BarraProgreso porcentaje={porcentajeUsuario} />
              </div>
            )}
            <div className="h-32 w-0.5 bg-white mx-4" />
            {porcentajeComunidad !== null && (
              <div className="flex flex-col items-center">
                <p className="text-sm font-medium mb-2">
                  Total progreso Grupal
                </p>
                <BarraProgreso porcentaje={porcentajeComunidad} />
              </div>
            )}
          </section>
          <section className="rounded p-6 md:col-span-4 bg-white/50 backdrop-blur-3xl rounded-lg shadow-md text-center mx-auto w-2/4">
            <h2 className="text-2xl font-semibold text-center text-black">
              ¡Tareas para hoy!
            </h2>

            <div className="grid md:grid-cols-2 gap-6 items-start mt-6">
              {/* Columna izquierda: tareas */}
              <div>
                {(() => {
                  const hoy = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD local
                  const tareasHoy = tasks.filter((task) => {
                    const fecha = new Date(task.fechaTope).toLocaleDateString(
                      "en-CA"
                    );
                    return fecha === hoy;
                  });

                  if (tareasHoy.length === 0) {
                    return (
                      <p className="text-black mt-6">
                        No tienes tareas para hoy
                      </p>
                    );
                  }

                  return (
                    <ul className="space-y-3">
                      {tareasHoy.map((tarea) => (
                        <li
                          key={tarea.id}
                          onClick={() => navigate(`/Tarea/${tarea.id}`)}
                          className="cursor-pointer rounded px-4 py-3 hover:bg-green-300 transition bg-green-100 shadow-md"
                        >
                          <p className="font-semibold text-green-700">
                            {tarea.titulo}
                          </p>
                          <p className="text-black text-sm">
                            {tarea.descripcion}
                          </p>
                        </li>
                      ))}
                    </ul>
                  );
                })()}
              </div>
              {/* Columna derecha: calendario del día */}
              <div className="flex justify-center items-center h-full">
                <div>
                  <div className="text-5xl">🗓️</div>
                  <p className="text-xl font-bold text-gray-800 mt-4">
                    {new Date().toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tareas */}
          <section className="bg-gray-800 rounded p-6 text-gray-900 md:col-span-2">
            <div className="flex-1 justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">
                Tareas asignadas
              </h2>
              <button
                onClick={() => navigate(`/TaskListPage/${userProfile?.id}`)}
                className="text-blue-600 hover:underline text-white"
              >
                Ver todas
              </button>
            </div>

            {tasks.length === 0 ? (
              <p className="text-gray-600">No tienes tareas asignadas.</p>
            ) : (
              <>
                <ul className="space-y-3">
                  {visibleTasks.map((tarea) => (
                    <li
                      key={tarea.id}
                      onClick={() => openTaskModal(tarea)}
                      className="cursor-pointer rounded px-3 py-2 hover:bg-blue-300 transition bg-blue-100"
                    >
                      <p className="font-semibold text-blue-700">
                        {tarea.titulo}
                      </p>
                      <p className="text-black text-sm">{tarea.descripcion}</p>
                    </li>
                  ))}
                </ul>
                {tasks.length > 2 && (
                  <div className="flex justify-center mt-4 gap-4">
                    <button
                      onClick={handlePrev}
                      disabled={taskIndex === 0}
                      className={`px-4 py-2 rounded ${
                        taskIndex === 0
                          ? "bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white transition`}
                    >
                      Anterior
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={taskIndex + 2 >= tasks.length}
                      className={`px-4 py-2 rounded ${
                        taskIndex + 2 >= tasks.length
                          ? "bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white transition`}
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            )}

            {selectedTask && (
              <TaskModal
                isOpen={isModalTaskOpen}
                onClose={() => setIsModalTaskOpen(false)}
                tarea={selectedTask}
                usuarios={usuarios}
              />
            )}
          </section>

          {/* Eventos */}
          <section className="bg-gray-800 rounded p-6 text-gray-900 md:col-span-2">
            <div className="flex-1 justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">
                Eventos asignados
              </h2>
              <button
                onClick={() => navigate(`/EventosListPage/${userProfile?.id}`)}
                className="text-blue-600 hover:underline text-white"
              >
                Ver todos
              </button>
            </div>

            {eventos.length === 0 ? (
              <p className="text-gray-600">No tienes eventos asignados.</p>
            ) : (
              <>
                <ul className="space-y-3">
                  {visibleEventos.map((evento) => (
                    <li
                      key={evento.id}
                      onClick={() => openEventModal(evento)}
                      className="cursor-pointer rounded px-3 py-2 hover:bg-blue-300 transition bg-blue-100"
                    >
                      <p className="font-semibold text-blue-700">
                        {evento.titulo}
                      </p>
                      <p className="text-black text-sm">{evento.descripcion}</p>
                    </li>
                  ))}
                </ul>
                {eventos.length > 2 && (
                  <div className="flex justify-center mt-4 gap-4">
                    <button
                      onClick={handlePrevEvento}
                      disabled={eventoIndex === 0}
                      className={`px-4 py-2 rounded ${
                        eventoIndex === 0
                          ? "bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white transition`}
                    >
                      Anterior
                    </button>
                    <button
                      onClick={handleNextEvento}
                      disabled={eventoIndex + 2 >= eventos.length}
                      className={`px-4 py-2 rounded ${
                        eventoIndex + 2 >= eventos.length
                          ? "bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white transition`}
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            )}

            {selectedEvent && (
              <EventoModal
                isOpen={isModalEventOpen}
                onClose={() => setIsModalEventOpen(false)}
                evento={selectedEvent}
                onComplete={async () => {
                  setIsModalEventOpen(false);
                  await completarEvento(selectedEvent.id);
                  setEventos((prevEventos) =>
                    prevEventos.filter((e) => e.id !== selectedEvent.id)
                  );
                }}
                onProgress={() => setIsModalEventOpen(false)}
              />
            )}
          </section>

          {/* Calendario */}
          <section className="bg-white/80 backdrop-blur-3xl rounded p-6 mb-6 text-gray-900 md:col-span-4">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Calendario
            </h2>
            <Calendario
              userId={userProfile?.id!}
              tareas={tasks}
              eventos={eventos}
            />
          </section>

          {/* Mensaje respuesta */}
          {responseMessage && (
            <div className="p-4 bg-green-100 text-green-800 rounded md:col-span-3">
              {responseMessage}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/*   MODALES    */}
      <Modal
        isOpen={showLeaveModal}
        title="Abandonar comunidad"
        onClose={() => setShowLeaveModal(false)}
        footer={
          <>
            <button
              onClick={() => setShowLeaveModal(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (userProfile?.id && userProfile?.idComunidad)
                  deleteEliminarUsuario(
                    userProfile?.id,
                    userProfile?.idComunidad
                  );
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Abandonar
            </button>
          </>
        }
      >
        <p>¿Estás seguro de que quieres abandonar la comunidad?</p>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        title="Eliminar comunidad"
        onClose={() => setShowDeleteModal(false)}
        footer={
          <>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              No
            </button>
            <button
              onClick={() => {
                if (userProfile?.idComunidad)
                  deleteEliminarComunidad(userProfile?.idComunidad);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Sí
            </button>
          </>
        }
      >
        <p>¿Estás seguro de que quieres eliminar la comunidad?</p>
      </Modal>
      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        message={alertMessage}
      />
    </div>
  );
};
