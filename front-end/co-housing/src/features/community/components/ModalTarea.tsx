import React from "react";
import Modal from "./Modal"; // Tu componente modal base

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

}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  tarea
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
      </div>
    </Modal>
  );
};

export default TaskModal;
