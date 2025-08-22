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
  onComplete: () => void;
  onProgress: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, tarea, onComplete, onProgress }) => {
  return (
    <Modal
      isOpen={isOpen}
      title={tarea.titulo}
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onProgress}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Marcar como en progreso
          </button>
          <button
            onClick={onComplete}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Marcar como completada
          </button>
        </>
      }
    >
      <div className="text-gray-800">
        <p><strong>Descripción:</strong> {tarea.descripcion}</p>
        <p><strong>Duración:</strong> {tarea.duracion} horas</p>
        <p><strong>Fecha Límite:</strong> {new Date(tarea.fechaTope).toLocaleString()}</p>
        <p><strong>Estado:</strong> {tarea.estado}</p>

      </div>
    </Modal>
  );
};

export default TaskModal;
