import React from "react";
import { Tarea, EstadoTarea } from "../api/type";

type Props = {
  task: Tarea;
  setTask: React.Dispatch<React.SetStateAction<Tarea>>;
  onSubmit: (e: React.FormEvent) => void;
};

const TaskForm: React.FC<Props> = ({ task, setTask, onSubmit }) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "id" || name === "idComunidad" || name === "duracion") {
      setTask((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "usuariosParticipantes") {
      const ids = value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v !== "")
        .map(Number);
      setTask((prev) => ({ ...prev, usuariosParticipantes: ids }));
    } else {
      setTask((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Crear nueva tarea</h2>

      <div>
        <label htmlFor="titulo" className="block font-medium mb-1">
          Título
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={task.titulo}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label htmlFor="descripcion" className="block font-medium mb-1">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={task.descripcion}
          placeholder="Describe la tarea con detalle, incluyendo objetivos, responsables, etc."
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label htmlFor="numParticipantes" className="block font-medium mb-1">
          Número de Participantes
        </label>
        <input
          name="numParticipantes"
          type="number"
          id="numParticipantes"
          value={task.numParticipantes}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label htmlFor="duracion" className="block font-medium mb-1">
          Duración (horas)
        </label>
        <input
          type="number"
          id="duracion"
          name="duracion"
          value={task.duracion}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label htmlFor="asignacion" className="block font-medium mb-1">
          ¿Cuándo quieres asignar la tarea?
        </label>
        <select
          id="asignacion"
          name="asignacion"
          value={task.asignacion}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="ahora">Asignar ahora</option>
          <option value="proxima">Asignar la próxima semana</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Crear tarea
      </button>
    </form>
  );
};

export default TaskForm;
