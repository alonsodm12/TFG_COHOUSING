// src/components/Calendario.tsx
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { addHours, parseISO } from "date-fns";
import { Evento, Tarea } from "../api/type";

interface CalendarioProps {
  userId: string;
  tareas: Tarea[];
  eventos: Evento[];
}

export const Calendario: React.FC<CalendarioProps> = ({ userId, tareas = [], eventos = [] }) => {
  const [actividades, setActividades] = useState<any[]>([]);

  useEffect(() => {
    const organizarActividades = () => {
      // Formatear tareas
      const tareasFormateadas = tareas.map((tarea) => {
        const start = new Date(tarea.fechaTope);
        const end = addHours(start, tarea.duracion || 1);
        return {
          title: tarea.titulo,
          start,
          end,
          backgroundColor: "#3b82f6", // azul para tareas
        };
      });

      // Formatear eventos
      const eventosFormateados = eventos.map((evento) => {
        // Convertir fecha y horas a Date
        const start = new Date(evento.fechaTope);
        const duracion = 2;     // si es string ISO
        const end = addHours(start, duracion || 1);
        return {
          title: evento.titulo,
          start,
          end,
          backgroundColor: "#f59e0b", // naranja para eventos
        };
      });

      // Unir ambos
      setActividades([...tareasFormateadas, ...eventosFormateados]);
    };

    organizarActividades();
  }, [tareas, eventos]);

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
        events={actividades}
        height="600px"
        slotMinTime="07:00:00"
        slotMaxTime="22:00:00"
        eventClick={(info) => {
          alert(`Actividad: ${info.event.title}`);
        }}
      />
    </div>
  );
};
