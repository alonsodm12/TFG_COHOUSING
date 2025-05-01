// features/user/pages/UserProfilePage.tsx
import { useUser } from "../hook/useUser";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner"; // asegúrate de tenerlo
import styles from "./UserProfilePage.module.css";
import { deleteUser } from "../api/operations";
import { getUsernameFromToken } from "@/features/authUtils";
import { useState } from "react";



const username: string | null = getUsernameFromToken();


//Esto abria que meterlo en un hook
const handleRemove = async (e: React.FormEvent) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  e.preventDefault();

  setError("");
  setMessage("");

  if (!username) {
    setError("No se pudo obtener el nombre de usuario");
    return;
  }

  try {
    const response = await deleteUser(username);

    if (!response.ok) {
      throw new Error("Error al eliminar el perfil");
    }

    const result = await response.json();
    setMessage("Perfil eliminado con éxito");
    console.log("✅ Respuesta:", result);
  } catch (err) {
    setError((err as Error).message);
  }
};

export const UserProfilePage = () => {
  const { user, loading } = useUser(username); // ← aquí podrías meter el ID logueado
  const navigate = useNavigate();

  if (loading) return <Spinner />;

  if (!user) return <p>No se pudo cargar el perfil.</p>;

  return (
    <div className={styles.container}>
      <h2>Perfil de Usuario</h2>
      <p>
        <strong>Nombre:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Rol:</strong> {user.role}
      </p>

      <h3>Estilo de vida</h3>
      <ul>
        <li>Tranquilo: {user.lifestyleDTO.tranquilo}</li>
        <li>Actividad: {user.lifestyleDTO.actividad}</li>
        <li>Limpieza: {user.lifestyleDTO.limpieza}</li>
        <li>Compartir espacios: {user.lifestyleDTO.compartirEspacios}</li>
        <li>Sociabilidad: {user.lifestyleDTO.sociabilidad}</li>
      </ul>

      <button
        onClick={() => navigate("/TFG_COHOUSING/editar", { state: { user } })}
      >
        Editar perfil
      </button>
      <button onClick={handleRemove}>Eliminar usuario</button>
    </div>
  );
};
