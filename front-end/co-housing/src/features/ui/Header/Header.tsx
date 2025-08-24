import React, { useState } from "react";
import styles from "./HeaderLanding.module.css";
import { Link } from "react-router-dom";
import { useUserContext } from "../../ui/Context/UserContext";

const API_BASE: String = import.meta.env.VITE_API_BASE + "user";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userProfile } = useUserContext();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include", // para enviar cookies
      });
      if (response.ok) {
        // Redirigir a landing page usando JS puro
        window.location.href = "/";
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.headerTitle}>SHARE-SPACE</div>

      {/* Navegación */}
      <nav className={styles.nav}>
        <Link
          to="/TFG_COHOUSING/home"
          className="hover:text-blue-600 transition-colors"
        >
          Home
        </Link>
        {userProfile?.role === "buscador" && (
          <Link
            to={`/TFG_COHOUSING/recommendations/${userProfile?.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            Búsqueda
          </Link>
        )}

        <Link
          to={`/TFG_COHOUSING/CommunityUserPage/${userProfile?.id}`}
          className="hover:text-blue-600 transition-colors"
        >
          Comunidad
        </Link>
        <Link
          to={`/TFG_COHOUSING/solicitudes/${userProfile?.id}`}
          className="hover:text-blue-600 transition-colors"
        >
          Notificaciones
        </Link>
      </nav>

      {/* Perfil */}
      <div className={styles.profile}>
        <button onClick={toggleMenu} className="focus:outline-none text-3xl">
          <span role="img" aria-label="Usuario">
            👤
          </span>
        </button>

        {menuOpen && (
          <div className={styles.menu}>
            <a
              href="/TFG_COHOUSING/user/profile"
              className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
            >
              Perfil
            </a>
            {/* Cambio aquí a button */}
            <button
              onClick={handleLogout}
              className={`${styles.logout} block px-4 py-2 hover:bg-gray-100 text-sm text-red-600 w-full text-left`}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
