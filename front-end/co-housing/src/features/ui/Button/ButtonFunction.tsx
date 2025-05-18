import React from 'react';
import '../../../index.css';

// Definir las propiedades (props) del botón
interface ButtonProps {
  label: string;            // Nombre del botón (texto)
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;       // Propiedad opcional para deshabilitar el botón
  className?: string;       // Clase opcional para aplicar estilos personalizados
}

// Componente reutilizable Button
const ButtonFunction: React.FC<ButtonProps> = ({ label, onClick, disabled = false}) => {
  return (
    <button className="btn btn-primary"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ButtonFunction;
