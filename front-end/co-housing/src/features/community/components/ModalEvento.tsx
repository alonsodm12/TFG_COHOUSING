import React from "react";
import Modal from "./Modal"; // Tu componente modal base

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  evento: {
    titulo: string;
    descripcion: string;
    usuariosParticipantes: number[];
    fechaTope: string;
    lugar: string;
    horaInicio: string;
    horaFinal: string;
    idComunidad: number;
    numParticipantes: number;
  };
  onComplete: () => void;
  onProgress: () => void;
}

const EventoModal: React.FC<EventModalProps> = ({ isOpen, onClose, evento, onComplete }) => {
  return (
    <Modal
      isOpen={isOpen}
      title={evento.titulo}
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onComplete}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Completada
          </button>
        </>
      }
    >
      <div className="text-gray-800">
        <p><strong>Descripción:</strong> {evento.descripcion}</p>
        <p><strong>Hora inicio:</strong> {evento.horaInicio}</p>
        <p><strong>Hora final:</strong> {evento.horaFinal}</p>
        <p><strong>Fecha:</strong> {new Date(evento.fechaTope).toLocaleDateString()}</p>
        <p><strong>Lugar:</strong> {evento.lugar}</p>
        <p><strong>Numero de participantes:</strong> {evento.numParticipantes}</p>

      </div>
    </Modal>
  );
};

export default EventoModal;
