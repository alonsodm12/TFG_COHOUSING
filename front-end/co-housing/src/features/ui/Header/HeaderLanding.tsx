import React from "react";
import Button from "../Button/Button"; // Asegúrate de que tu Button funcione bien con react-router-dom
import style from "./HeaderLanding.module.css"; // Estilos

export const HeaderLanding: React.FC = () => {
  return (
    <header className={style.header}> {/* Cambié 'a' a 'header' para mayor claridad */}
      <h1 className={style.headerTitle}>SHARE-SPACE</h1>
      <Button to="/login" label="Iniciar Sesión" />
    
    </header>
  );
};
