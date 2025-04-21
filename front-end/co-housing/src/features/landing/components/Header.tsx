import React from "react";
import styles from "../pages/LandingPage.module.css"
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {

  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/TFG_COHOUSING/login");
  };
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>SHARE-SPACE</h1>
        <button className={styles.loginButton} onClick={handleStartClick} >Iniciar sesión</button>
      </header>
      <div className={styles.headerLine}></div> {/* Línea debajo del header */}
    </>

  );
};
