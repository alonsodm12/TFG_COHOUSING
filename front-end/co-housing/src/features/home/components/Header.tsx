import React, { useState } from "react";
import styles from "../pages/HomePage.module.css";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className={styles.header}>
      {/* Nombre de la app */}
      <div className={styles.logo}>SHARE-SPACE</div>

      {/* Navegación centrada */}
      <nav className={styles.nav}>
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Servicios</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
      </nav>

      {/* Foto del usuario */}
      <div className={styles.profile}>
        <button onClick={toggleMenu} className={styles.profileBtn}>
          <img
            src="/ruta-a-la-foto-del-user.jpg"
            alt="Foto de perfil"
            className={styles.profileImg}
          />
        </button>

        {menuOpen && (
          <div className={styles.dropdown}>
            <a href="/perfil">Perfil</a>
            <a href="/configuracion">Configuración</a>
            <a href="/logout">Cerrar sesión</a>
          </div>
        )}
      </div>
    </header>
  );
};
