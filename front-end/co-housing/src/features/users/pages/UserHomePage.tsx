// features/user/pages/UserProfilePage.tsx
import { useUser } from "../hook/useUser";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfilePage.module.css";
import { getRoleFromToken, getUsernameFromToken } from "@/features/authUtils";

const rol: string | null = getRoleFromToken();
const username: string | null = getUsernameFromToken();

export const UserHomePage = () => {
  const { user, loading } = useUser(username); // ← aquí podrías meter el ID logueado
  const navigate = useNavigate();

  if (rol === "ROL_Ofertante") return < />;

  if (!user) return <p>No se pudo cargar el perfil.</p>;

  return (
    <div className={styles.container}>
      <h2>Bienvenido</h2>
      <p>
        <strong>Nombre:</strong> {user.username}
      </p>
    </div>
  );
};
