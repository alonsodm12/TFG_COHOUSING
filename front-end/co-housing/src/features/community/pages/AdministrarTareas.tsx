// AdministrarTareas.tsx
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { useParams } from "react-router-dom";
import { fetchTareasPorUsuario, updateDateTarea } from "../api/operations";
import { Tarea } from "../api/type";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";

// FullCalendar CSS

import "@fullcalendar/common/main.css";

export const AdministrarTareas = () => {
  type conFechaData = {
    id: string;
    title: string;
    start: string;
  };

  const [tareasSinFecha, setTareasSinFecha] = useState<Tarea[]>([]);
  const [tareasConFecha, setTareasConFecha] = useState<conFechaData[]>([]);
  const { id } = useParams<{ id: string }>();

  // Fetch de tareas
  useEffect(() => {
    if (!id) return;

    fetchTareasPorUsuario(Number(id))
      .then((data) => {
        const sinFecha = data.filter((t) => !t.fechaTope);
        const conFecha = data
          .filter((t) => t.fechaTope)
          .map((t) => ({
            id: String(t.id),
            title: t.titulo,
            start: new Date(t.fechaTope!).toISOString(),
          }));

        setTareasSinFecha(sinFecha);
        setTareasConFecha(conFecha);
      })
      .catch((err) => console.error("Error al cargar tareas", err));
  }, [id]);

  // Inicializar Draggable solo una vez
  useEffect(() => {
    const draggableEl = document.getElementById("external-tasks");
    if (draggableEl && !(draggableEl as any)._draggableInitialized) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-task",
        eventData: (el) => ({
          id: el.getAttribute("data-id") || "",
          title: el.getAttribute("data-title") || el.textContent || "",
        }),
      });
      (draggableEl as any)._draggableInitialized = true;
    }
  }, [tareasSinFecha]);

  // Al recibir una tarea
  const handleReceive = async (info: any) => {
    const id = info.event.id;
    const fecha = info.event.start
      ? new Date(info.event.start.getTime() + 2 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 19)
      : "";

    try {
      await updateDateTarea(id, fecha);
      setTareasSinFecha((prev) => prev.filter((t) => String(t.id) !== id));
      setTareasConFecha((prev) => [
        ...prev,
        { id, title: info.event.title, start: fecha },
      ]);
    } catch (error) {
      console.error(error);
      info.revert();
    }
  };

  // Al mover una tarea ya programada
  const handleEventDrop = async (info: any) => {
    const id = info.event.id;
    const nuevaFecha = info.event.start
      ? new Date(info.event.start.getTime() + 2 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 19)
      : "";

    try {
      await updateDateTarea(id, nuevaFecha);
      setTareasConFecha((prev) =>
        prev.map((t) => (t.id === id ? { ...t, start: nuevaFecha } : t))
      );
    } catch (error) {
      console.error(error);
      info.revert();
    }
  };

  return (
    <div id="root">
      <Header />
      <main className="flex-grow w-full px-6 md:px-12 py-12 flex flex-col"
        style={{
          background: 'linear-gradient(135deg, #cc95c0, #dbd4b4, #7aa1d2)',
        }}>
        <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">
          Administra tus Tareas
        </h1>

        <div className="flex gap-10 justify-center items-start">
          <aside
            id="external-tasks"
            className="w-[280px] bg-gray-700 rounded-lg shadow-md p-4 text-gray-300 overflow-y-auto max-h-[70vh]"
          >
            <h2 className="text-xl font-semibold mb-4">Tareas a administrar</h2>
            {tareasSinFecha.length === 0 ? (
              <p className="text-gray-400">
                No hay tareas asociadas al usuario
              </p>
            ) : (
              tareasSinFecha.map((task) => (
                <div
                  key={task.id}
                  className="fc-task mb-3 p-3 bg-gray-600 rounded border border-gray-500 cursor-grab select-none text-white"
                  data-id={String(task.id)}
                  data-title={task.titulo}
                >
                  {task.titulo}
                </div>
              ))
            )}
          </aside>

          {/* Calendario */}
          <div className="flex-grow max-w-[75%] bg-white rounded-lg shadow-md p-6">
            <FullCalendar
              timeZone="local"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              editable={true}
              droppable={true}
              events={tareasConFecha}
              eventReceive={handleReceive}
              eventDrop={handleEventDrop}
              selectable={true}
              height="70vh"
              slotMinTime="07:00:00"
              slotMaxTime="22:00:00"
              eventBackgroundColor="#2563eb"
              eventTextColor="#fff"
            />
            <div className="h-1 bg-black rounded mt-4" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdministrarTareas;
