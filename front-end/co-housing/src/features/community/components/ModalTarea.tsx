import React from "react";
import Modal from "./Modal"; // Tu componente modal base
import { Link } from "react-router-dom";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  role: string;
  email?: string;
  fotoUrl?: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  tarea: {
    titulo: string;
    descripcion: string;
    duracion: number;
    fechaTope: string;
    usuariosParticipantes: number[];
    estado: string;
  };
  usuarios: Usuario[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  tarea,
  usuarios,
}) => {
  return (
    <Modal isOpen={isOpen} title={tarea.titulo} onClose={onClose}>
      <div className="text-gray-800">
        <p>
          <strong>Descripción:</strong> {tarea.descripcion}
        </p>
        <p>
          <strong>Duración:</strong> {tarea.duracion} horas
        </p>
        <p>
          {" "}
          <strong>Fecha Límite:</strong>{" "}
          {new Date(tarea.fechaTope).getTime() === 0
            ? "Aún no se ha establecido"
            : new Date(tarea.fechaTope).toLocaleString()}
        </p>
        <p>
          <strong>Estado:</strong> {tarea.estado}
        </p>
        <p><strong>Participantes</strong></p>
        <div className="mt-2 p-3 rounded-xl bg-indigo-50 border border-indigo-200 shadow-sm">
          {tarea.usuariosParticipantes.length === 0 ? (
            <p className="text-gray-500 italic">
              No hay participantes asignados.
            </p>
          ) : (
            <ul className="overflow-y-auto space-y-2 max-h-60">
              {usuarios
                .filter((u) => tarea.usuariosParticipantes.includes(u.id))
                .map((u) => (
                  <li key={u.id}>
                    <Link
                      to={`/usuarios/${u.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg"
                    >
                      <img
                        src={
                          u.fotoUrl
                            ? `https://localhost:8084/user${u.fotoUrl}`
                            : "/default-avatar.png"
                        }
                        alt={`Avatar de ${u.username}`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400 shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-indigo-900">
                          {u.username}
                        </p>
                        <p className="text-sm">
                          <span
                            className={`px-2 py-0.5 rounded-full text-white text-xs ${
                              u.role === "ofertante"
                                ? "bg-indigo-600"
                                : "bg-green-600"
                            }`}
                          >
                            {u.role === "ofertante"
                              ? "Administrador"
                              : "Miembro"}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
