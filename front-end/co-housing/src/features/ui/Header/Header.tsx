import React, { useState } from "react";
import styles from "./HeaderLanding.module.css";
import { Link } from "react-router-dom";
import { useUserContext } from "../../ui/Context/UserContext";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userProfile, isLoading } = useUserContext();
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.headerTitle}>SHARE-HOUSE</div>

      {/* Navegación */}
      <nav className={styles.nav}>
      <Link to="/TFG_COHOUSING/home" className="hover:text-blue-600 transition-colors">Home</Link>
      <Link to={"/busqueda"} className="hover:text-blue-600 transition-colors">Búsqueda</Link>
      <Link to={`/TFG_COHOUSING/CommunityUserPage/${userProfile?.id}`} className="hover:text-blue-600 transition-colors">Comunidad</Link>
      <Link to="/notificaciones" className="hover:text-blue-600 transition-colors">Notificaciones</Link>
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
