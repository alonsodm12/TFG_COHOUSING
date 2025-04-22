import React, { useState } from "react";
import styles from "../pages/HomePage.module.css";
import { getRoleFromToken } from "../../authUtils";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const username = getRoleFromToken();
  return (
    <header className={styles.header}>
      {/* Nombre de la app */}
      <div className={styles.logo}>{username}</div>

      {/* Navegación centrada */}
      <nav className={styles.nav}>
        <a href="#contacto">Home</a>
        <a href="#inicio">Búsqueda</a>
        <a href="#servicios">Comunidad</a>
        <a href="#nosotros">Notificaciones</a>
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
            <a href="/TFG_COHOUSING/perfil">Perfil</a>
            <a href="/configuracion">Configuración</a>
            <a href="/logout">Cerrar sesión</a>
          </div>
        )}
      </div>
    </header>
  );
};
