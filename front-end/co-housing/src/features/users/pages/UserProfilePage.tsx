import { useUserContext } from "../../ui/Context/UserContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import styles from "./UserProfilePage.module.css";
import { deleteUser } from "../api/operations";

import { useState } from "react";
import { Header } from "../../ui/Header/Header";
import Button from "../../ui/Button/Button";
import ButtonFunction from "../../ui/Button/ButtonFunction";
import { Footer } from "../../ui/Footer/Footer";

export const UserProfilePage = () => {
  const { username, userProfile, isLoading } = useUserContext(); // Usar el contexto directamente
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Llamada para eliminar usuario
  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      navigate("/"); // redirige al inicio o login
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (isLoading) return <Spinner />; // Mostrar el spinner si aún estamos cargando

  if (!userProfile) return <p>No se pudo cargar el perfil.</p>; // En caso de que no haya datos del usuario

  return (
    <div id="root">
      <Header />
      <main className="page">
        <div className="max-w-2xl mx-auto mt-10">
          <div className="backdrop-blur-md bg-white/70 shadow-xl rounded-2xl p-6 border border-white/30">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Perfil de Usuario
            </h2>

            <p className="text-base text-gray-700 mb-2">
              <strong>Nombre:</strong> {userProfile.username}
            </p>
            <p className="text-base text-gray-700 mb-2">
              <strong>Email:</strong> {userProfile.email}
            </p>
            <p className="text-base text-gray-700 mb-4">
              <strong>Rol:</strong> {userProfile.role}
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Estilo de vida
            </h3>
            <ul className="list-disc pl-6 mb-6 text-gray-600 text-sm space-y-1">
              <li>Tranquilo: {userProfile.lifestyleDTO.tranquilo}</li>
              <li>Actividad: {userProfile.lifestyleDTO.actividad}</li>
              <li>Limpieza: {userProfile.lifestyleDTO.limpieza}</li>
              <li>Compartir espacios: {userProfile.lifestyleDTO.compartirEspacios}</li>
              <li>Sociabilidad: {userProfile.lifestyleDTO.sociabilidad}</li>
            </ul>
          </div>
        </div>

        <Button
          label="Editar perfil"
          to="/TFG_COHOUSING/user/profile/edit"
          state={userProfile}
        />
        <ButtonFunction label="Eliminar usuario" onClick={handleRemove} />

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.success}>{message}</p>}
      </main>
      <Footer />
    </div>
  );
};
