import React from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative transition-all duration-300">
        {/* Botón de cerrar */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition duration-200"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Título */}
        {title && (
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            {title}
          </h2>
        )}

        {/* Contenido */}
        <div className="mb-6 text-gray-700 text-center">{children}</div>

        {/* Footer personalizado */}
        {footer && (
          <div className="flex justify-end gap-4 border-t pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
