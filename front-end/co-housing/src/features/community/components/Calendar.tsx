// src/components/Calendario.tsx
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { addHours } from "date-fns";
import { getUserTask } from "../api/operations";

export const Calendario = ({ userId }: { userId: number }) => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tareas = await getUserTask(userId);

        const formattedEvents = tareas.map((tarea: any) => {
          const start = new Date(tarea.fechaTope);
          const end = addHours(start, tarea.duracion || 1);

          return {
            title: tarea.titulo,
            start,
            end,
          };
        });

        setEventos(formattedEvents);
      } catch (error) {
        console.error("Error cargando tareas", error);
      }
    };

    fetchTasks();
  }, [userId]);

  return (
    <div style={{ margin: "2rem" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale={esLocale}
        timeZone="local"
        events={eventos}
        height="600px"
        slotMinTime="07:00:00"
        slotMaxTime="22:00:00"
        eventClick={(info) => {
          alert(`Tarea: ${info.event.title}`);
        }}
      />
    </div>
  );
};
