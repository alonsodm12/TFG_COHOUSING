// Instala primero:
// npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import { useParams } from "react-router-dom";
import { fetchTareasPorUsuario } from "../api/operations";
import { Tarea } from "../api/type";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";

export const AdministrarTareas = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [eventos, setEventos] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    fetchTareasPorUsuario(Number(id))
      .then((data) => setTareas(data || []))
      .catch((err) => console.error("Error al cargar tareas", err));
  }, [id]);

  useEffect(() => {
    const draggableEl = document.getElementById("external-tasks");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-task",
        eventData: function (taskEl) {
          const id = taskEl.getAttribute("data-id");
          const title = taskEl.innerText;
          return {
            id,
            title,
          };
        },
      });
    }
  }, [tareas]);

  const handleReceive = (info: any) => {
    const id = info.event.id;
    setTareas((prev) => prev.filter((t) => String(t.id) !== id));
    setEventos((prev) => [...prev, info.event]);
  };

  return (
    <div id="root" className="min-h-screen flex flex-col" >
      <Header />
      <main className="page">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-black mb-2">
        Administra tus Tareas
      </h1>
      <div style={{ display: "flex", height: "90vh", padding: 20 }}>
        <div
          id="external-tasks"
          style={{
            width: 250,
            border: "1px solid black",
            marginRight: 20,
            padding: 10,
            backgroundColor: "#f0f0f0",
            overflowY: "auto",
          }}
        >
          <h3>Tareas sin fecha</h3>
          {tareas.length === 0 && <p>No hay tareas sin fecha</p>}
          {tareas.map((task) => (
            <div
              key={task.id}
              className="fc-task"
              data-id={task.id}
              style={{
                margin: "4px 0",
                padding: 8,
                background: "white",
                border: "1px solid #999",
                cursor: "grab",
              }}
            >
              {task.titulo}
            </div>
          ))}
        </div>

        <div style={{ flexGrow: 1 }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            editable={true}
            droppable={true}
            events={eventos}
            eventReceive={handleReceive}
            selectable={true}
            height="100%"
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
          />
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
