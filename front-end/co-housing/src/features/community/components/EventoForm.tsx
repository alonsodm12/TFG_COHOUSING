import React from "react";

type Evento = {
  titulo: string;
  descripcion: string;
  usuariosParticipantes: number[];
  fechaTope: string;
  lugar: string;
  horaInicio: number;
  horaFinal: number;
  idComunidad: number;
  numParticipantes: number;
};

type Props = {
  evento: Evento;
  setEvento: React.Dispatch<React.SetStateAction<Evento>>;
  onSubmit: (e: React.FormEvent) => void;
};

const EventoForm: React.FC<Props> = ({ evento, setEvento, onSubmit }) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (
      name === "idComunidad" ||
      name === "numParticipantes" ||
      name === "horaInicio" ||
      name === "horaFinal"
    ) {
      setEvento((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "usuariosParticipantes") {
      const ids = value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v !== "")
        .map(Number);
      setEvento((prev) => ({ ...prev, usuariosParticipantes: ids }));
    } else {
      setEvento((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Crear nuevo evento</h2>

      <div>
        <label htmlFor="titulo" className="block font-medium mb-1">
          Título
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={evento.titulo}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="descripcion" className="block font-medium mb-1">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={evento.descripcion}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="fechaTope" className="block font-medium mb-1">
          Fecha límite
        </label>
        <input
          type="date"
          id="fechaTope"
          name="fechaTope"
          value={evento.fechaTope}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="lugar" className="block font-medium mb-1">
          Lugar
        </label>
        <input
          type="text"
          id="lugar"
          name="lugar"
          value={evento.lugar}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="horaInicio" className="block font-medium mb-1">
          Hora de inicio (hh.mm)
        </label>
        <input
          type="number"
          id="horaInicio"
          name="horaInicio"
          value={evento.horaInicio}
          step="0.01"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="horaFinal" className="block font-medium mb-1">
          Hora de finalización (hh.mm)
        </label>
        <input
          type="number"
          id="horaFinal"
          name="horaFinal"
          value={evento.horaFinal}
          step="0.01"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="idComunidad" className="block font-medium mb-1">
          ID Comunidad
        </label>
        <input
          type="number"
          id="idComunidad"
          name="idComunidad"
          value={evento.idComunidad}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="numParticipantes" className="block font-medium mb-1">
          Número de Participantes
        </label>
        <input
          type="number"
          id="numParticipantes"
          name="numParticipantes"
          value={evento.numParticipantes}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="usuariosParticipantes" className="block font-medium mb-1">
          IDs de Participantes (separados por coma)
        </label>
        <input
          type="text"
          id="usuariosParticipantes"
          name="usuariosParticipantes"
          value={evento.usuariosParticipantes.join(",")}
          onChange={handleChange}
          placeholder="Ej: 1, 2, 3"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Crear evento
      </button>
    </form>
  );
};

export default EventoForm;
