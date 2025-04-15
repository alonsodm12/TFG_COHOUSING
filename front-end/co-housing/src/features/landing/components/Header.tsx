import React from "react";
import styles from "../pages/LandingPage.module.css"

export const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>SHARE-SPACE</h1>
        <button className={styles.loginButton}>Iniciar sesión</button>
      </header>
      <div className={styles.headerLine}></div> {/* Línea debajo del header */}
    </>

  );
};
