// src/components/Calendario.tsx
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { addHours } from "date-fns";
import { Evento, Tarea } from "../api/type";
import { AlertModal } from "../../ui/AlertModal/AlertModal";


interface CalendarioProps {
  userId: number;
  tareas: Tarea[];
  eventos: Evento[];
}

export const Calendario: React.FC<CalendarioProps> = ({tareas = [], eventos = [] }) => {
  const [actividades, setActividades] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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
  
      // Formatear eventos como tareas
      const eventosFormateados = eventos.map((evento) => {
        // Combinar fechaTope con horaInicio y horaFinal
        const [horaI, minI, segI] = evento.horaInicio.split(":").map(Number);
        const [horaF, minF, segF] = evento.horaFinal.split(":").map(Number);
  
        const fecha = new Date(evento.fechaTope);
        const start = new Date(fecha);
        start.setHours(horaI, minI, segI);
  
        const end = new Date(fecha);
        end.setHours(horaF, minF, segF);
  
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

  console.log(actividades);
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
          setMessage(`Actividad: ${info.event.title}`);
          setOpen(true);
        }}
      />
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        message={message}
      />
    </div>
  );
};
