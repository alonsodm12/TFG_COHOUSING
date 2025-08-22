import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEvent, obtenerUsuariosDeComunidad } from "../api/operations"; // Ajusta la ruta

// Tipos
type Usuario = {
  id: number;
  username: string;
};

type Evento = {
  id: number,
  titulo: string;
  descripcion: string;
  usuariosParticipantes: number[];
  fechaTope: string;
  lugar: string;
  horaInicio: string; // "HH:mm"
  horaFinal: string;  // "HH:mm"
  idComunidad: number;
  numParticipantes: number;
};


const EventoForm: React.FC = () => {
  const { idComunidad } = useParams<{ idComunidad: string }>();
  const comunidadId = Number(idComunidad);
  const navigate = useNavigate();

  const [evento, setEvento] = useState<Evento>({
    id: 0,
    titulo: "",
    descripcion: "",
    usuariosParticipantes: [],
    fechaTope: "",
    lugar: "",
    horaInicio: "",
    horaFinal: "",
    idComunidad: comunidadId || 0,
    numParticipantes: 0,
  });

  const [usuariosComunidad, setUsuariosComunidad] = useState<Usuario[]>([]);
  const [usuariosLoading, setUsuariosLoading] = useState(false);
  const [usuariosError, setUsuariosError] = useState<string | null>(null);

  useEffect(() => {
    if (comunidadId) {
      setEvento((prev) => ({ ...prev, idComunidad: comunidadId }));
      setUsuariosLoading(true);
      obtenerUsuariosDeComunidad(comunidadId)
        .then((data) => {
          setUsuariosComunidad(data);
          setUsuariosError(null);
        })
        .catch(() => {
          setUsuariosError("No se pudieron cargar los usuarios");
          setUsuariosComunidad([]);
        })
        .finally(() => setUsuariosLoading(false));
    }
  }, [comunidadId]);

  useEffect(() => {
    if (!evento.fechaTope) {
      const hoy = new Date();
      const formato = hoy.toISOString().split("T")[0];
      setEvento((prev) => ({ ...prev, fechaTope: formato }));
    }
  }, [evento.fechaTope]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "numParticipantes") {
      // Ya se calcula automáticamente, no permitimos editar manualmente
      return;
    } else if (name === "usuariosParticipantes") {
      // Este caso ya no se usa porque cambiamos select por checkbox
      return;
    } else {
      setEvento((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleUsuarioParticipante = (idUsuario: number, checked: boolean) => {
    setEvento((prev) => {
      let nuevosParticipantes = [...prev.usuariosParticipantes];
      if (checked) {
        if (!nuevosParticipantes.includes(idUsuario)) {
          nuevosParticipantes.push(idUsuario);
        }
      } else {
        nuevosParticipantes = nuevosParticipantes.filter((id) => id !== idUsuario);
      }
      return {
        ...prev,
        usuariosParticipantes: nuevosParticipantes,
        numParticipantes: nuevosParticipantes.length,
      };
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Evento enviado:", evento);
    createEvent(evento);
    alert("Evento creado con exito");
    navigate(`/TFG_COHOUSING/CommunityUserPage/${idComunidad}`);

  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Crear nuevo evento</h2>

      <div>
        <label className="block font-medium mb-1">Título</label>
        <input
          type="text"
          name="titulo"
          value={evento.titulo}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Descripción</label>
        <textarea
          name="descripcion"
          value={evento.descripcion}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Fecha límite</label>
        <input
          type="date"
          name="fechaTope"
          value={evento.fechaTope}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Lugar</label>
        <input
          type="text"
          name="lugar"
          value={evento.lugar}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Hora de inicio</label>
        <input
          type="time"
          name="horaInicio"
          value={evento.horaInicio}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Hora de finalización</label>
        <input
          type="time"
          name="horaFinal"
          value={evento.horaFinal}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Seleccionar Participantes</label>
        {usuariosLoading && <p>Cargando usuarios...</p>}
        {usuariosError && <p className="text-red-500">{usuariosError}</p>}
        {!usuariosLoading && usuariosComunidad.length > 0 && (
          <div
            className="border rounded-md p-2 max-h-40 overflow-y-auto bg-white text-black"
            role="group"
            aria-label="Usuarios participantes"
          >
            {usuariosComunidad.map((u) => (
              <label
                key={u.id}
                className="flex items-center space-x-2 py-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={u.id}
                  checked={evento.usuariosParticipantes.includes(u.id)}
                  onChange={(e) => toggleUsuarioParticipante(u.id, e.target.checked)}
                  className="cursor-pointer"
                />
                <span>{u.username}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Número de Participantes</label>
        <input
          type="number"
          name="numParticipantes"
          value={evento.numParticipantes}
          readOnly
          className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
          min={0}
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
