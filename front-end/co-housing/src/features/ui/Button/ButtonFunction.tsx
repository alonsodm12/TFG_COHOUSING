import React from 'react';
import styles from '../../../styles/globals.module.css';

// Definir las propiedades (props) del botón
interface ButtonProps {
  label: string;            // Nombre del botón (texto)
  onClick: () => void;      // Función que se ejecuta al hacer clic
  disabled?: boolean;       // Propiedad opcional para deshabilitar el botón
  className?: string;       // Clase opcional para aplicar estilos personalizados
}

// Componente reutilizable Button
const ButtonFunction: React.FC<ButtonProps> = ({ label, onClick, disabled = false, className = '' }) => {
  return (
    <button className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ButtonFunction;
