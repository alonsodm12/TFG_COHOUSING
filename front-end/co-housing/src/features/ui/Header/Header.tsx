import React, { useState } from "react";
import styles from "./HeaderLanding.module.css";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.headerTitle}>SHARE-HOUSE</div>

      {/* Navegación */}
      <nav className={styles.nav}>
        <a href="#contacto" className="hover:text-blue-600 transition-colors">Home</a>
        <a href="#inicio" className="hover:text-blue-600 transition-colors">Búsqueda</a>
        <a href="#servicios" className="hover:text-blue-600 transition-colors">Comunidad</a>
        <a href="#nosotros" className="hover:text-blue-600 transition-colors">Notificaciones</a>
      </nav>

      {/* Perfil */}
      <div className={styles.profile}>
        <button onClick={toggleMenu} className="focus:outline-none">
          <img
            src="/ruta-a-la-foto-del-user.jpg"
            alt="Foto de perfil"
            className={styles.profileImage}
          />
        </button>

        {menuOpen && (
          <div className={styles.menu}>
            <a
              href="/TFG_COHOUSING/perfil"
              className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
            >
              Perfil
            </a>
            <a
              href="/configuracion"
              className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
            >
              Configuración
            </a>
            <a
              href="/logout"
              className={`${styles.logout} block px-4 py-2 hover:bg-gray-100 text-sm text-red-600`}
            >
              Cerrar sesión
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
