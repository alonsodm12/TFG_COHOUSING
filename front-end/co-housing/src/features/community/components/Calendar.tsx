// src/components/Calendar.tsx
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay, addHours } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import { getUserTask } from "../api/operations";

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
type CalendarProps = {
  userId: number;
};
export const Calendar = ({ userId }: CalendarProps) => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tareas = await getUserTask(userId);

        const formattedEvents = tareas.map((tarea: any) => {
          const start = new Date(tarea.fechaTope);
          const end = addHours(start, tarea.duracion || 1); // Añade duración o 1h por defecto

          return {
            title: tarea.titulo,
            start,
            end,
          };
        });

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error cargando tareas", error);
      }
    };

    fetchTasks();
  }, [userId]);



  return (
    <div style={{ height: "600px", margin: "2rem" }}>
      <BigCalendar
        localizer={localizer}
        events={events} // Calendario vacío de momento
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["month", "week", "day"]}
        messages={{
          next: "Sig.",
          previous: "Ant.",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
        onSelectEvent={(event: any) => {
          alert(`Tarea: ${event.title}`);
        }}
      />
    </div>
  );
};
