// AdministrarTareas.tsx
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import { useParams } from "react-router-dom";
import { fetchTareasPorUsuario, updateDateTarea } from "../api/operations";
import { Tarea } from "../api/type";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";

// Importa el CSS necesario
import '@fullcalendar/common/main.css';

export const AdministrarTareas = () => {
  type conFechaData = {
    id: string;
    title: string;
    start: string; // ISO 8601 string
  };

  const [tareasSinFecha, setTareasSinFecha] = useState<Tarea[]>([]);
  const [tareasConFecha, setTareasConFecha] = useState<conFechaData[]>([]);
  const { id } = useParams<{ id: string }>();

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
            start: new Date(t.fechaTope!).toISOString(),  // Importante: ISO 8601
          }));

        setTareasSinFecha(sinFecha);
        setTareasConFecha(conFecha);
      })
      .catch((err) => console.error("Error al cargar tareas", err));
  }, [id]);

  useEffect(() => {
    const draggableEl = document.getElementById("external-tasks");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-task",
        eventData: (taskEl) => ({
          id: taskEl.getAttribute("data-id") || "",
          title: taskEl.getAttribute("data-title") || taskEl.textContent || "",
        }),
      });
    }
  }, [tareasSinFecha]);

  const handleReceive = async (info: any) => {
    console.log("Evento recibido:", info.event);
    const id = info.event.id;
    const fecha = info.event.start ? info.event.start.toISOString() : "";
    console.log(fecha);
    try {
      await updateDateTarea(id, fecha);
      setTareasSinFecha((prev) => prev.filter((t) => String(t.id) !== id));
      setTareasConFecha((prev) => [...prev, { id, title: info.event.title, start: fecha }]);
    } catch (error) {
      console.error(error);
      info.revert();
    }
  };

  const handleEventDrop = async (info: any) => {
    console.log("Evento cambiado de fecha:", info.event);
    const id = info.event.id;
    const nuevaFecha = info.event.start
  ? new Date(info.event.start.getTime() + 2 * 60 * 60 * 1000).toISOString().slice(0, 19)
  : "";
    console.log("Mario " + nuevaFecha);

    try {
      await updateDateTarea(id, nuevaFecha);
      setTareasConFecha((prev) =>
        prev.map((evento) =>
          evento.id === id ? { ...evento, start: nuevaFecha } : evento
        )
      );
    } catch (error) {
      console.error(error);
      info.revert();
    }
  };
  return (
    <div id="root" className="min-h-screen flex flex-col bg-gradient-to-b from-pink-200 via-white to-blue-200">
      <Header />
  
      <main className="flex-grow container mx-auto px-6 md:px-12 py-12 flex flex-col">
        <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">
          Administra tus Tareas
        </h1>
  
        <div className="flex gap-10 justify-center items-start">
          {/* Tareas a la izquierda, ancho fijo */}
          <aside
            id="external-tasks"
            className="w-[280px] bg-gray-700 rounded-lg shadow-md p-4 text-gray-300 overflow-y-auto max-h-[70vh]"
          >
            <h2 className="text-xl font-semibold mb-4">Tareas a administrar</h2>
            {tareasSinFecha.length === 0 ? (
              <p className="text-gray-400">No hay tareas asociadas al usuario</p>
            ) : (
              tareasSinFecha.map((task) => (
                <div
                  key={task.id}
                  className="mb-3 p-3 bg-gray-600 rounded border border-gray-500 cursor-grab select-none text-gray-100"
                  data-id={String(task.id)}
                  data-title={task.titulo}
                >
                  {task.titulo}
                </div>
              ))
            )}
          </aside>
  
          {/* Calendario: ocupa más espacio */}
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
  
      <Footer/>
    </div>
  );
  
  
    
};

export default AdministrarTareas;
