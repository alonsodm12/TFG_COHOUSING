import { useUserContext } from "../../ui/Context/UserContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { deleteUser } from "../api/operations";

import { useState } from "react";
import { Header } from "../../ui/Header/Header";
import Button from "../../ui/Button/Button";
import ButtonFunction from "../../ui/Button/ButtonFunction";
import { Footer } from "../../ui/Footer/Footer";

export const UserProfilePage = () => {
  const { username, userProfile, isLoading } = useUserContext();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
      navigate("/"); 
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (isLoading) return <Spinner />;

  if (!userProfile) return <p className="text-center text-red-600 mt-10">No se pudo cargar el perfil.</p>;

  return (
    <div id="root">
  <Header />
  <main className="page">
    <h2 className="text-3xl font-extrabold text-blue-900  mb-6">
      Perfil de Usuario
    </h2>
    <div className="bg-white/25 backdrop-blur-3xl text-black w-fit px-32 rounded-xl shadow-2xl p-8 mb-6">


      {userProfile.fotoUrl ? (
        <img
          src={`http://localhost:8081${userProfile.fotoUrl}`}
          alt="Foto de perfil"
          className="mx-auto w-32 h-32 rounded-full object-cover mb-6 border-4 border-indigo-400 dark:border-indigo-600 shadow-lg"
        />
      ) : (
        <div className="mx-auto w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 mb-6 flex items-center justify-center text-gray-500 dark:text-gray-400 font-semibold text-xl">
          Sin foto
        </div>
      )}

      <div className="text-gray-800 dark:text-black-300 text-center space-y-3 mb-8">
        <p>
          <strong>Nombre:</strong> {userProfile.username}
        </p>
        <p>
          <strong>Email:</strong> {userProfile.email}
        </p>
        <p>
          <strong>Rol:</strong> {userProfile.role}
        </p>
        <p>
          <strong>Dirección:</strong> {userProfile.direccion}
        </p>
      </div>

      {userProfile.lifestyleDTO && (
        <>
          <h3 className="text-xl font-semibold dark:text-black mb-3 text-center">
            Estilo de vida
          </h3>
          <ul className="list-disc list-inside text-black text-center mb-8 space-y-1 text-sm">
            <li>Tranquilo: {userProfile.lifestyleDTO.tranquilidad}</li>
            <li>Actividad: {userProfile.lifestyleDTO.actividad}</li>
            <li>Limpieza: {userProfile.lifestyleDTO.limpieza}</li>
            <li>Compartir espacios: {userProfile.lifestyleDTO.compartirEspacios}</li>
            <li>Sociabilidad: {userProfile.lifestyleDTO.sociabilidad}</li>
          </ul>
        </>
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <Button
          label="Editar perfil"
          to="/TFG_COHOUSING/user/profile/edit"
          state={userProfile}
        />
        <ButtonFunction
          label="Eliminar usuario"
          onClick={handleRemove}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
        />
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          label="Comunidades Guardadas"
          to="/TFG_COHOUSING/user/comunidadesGuardadas"
        />
      </div>

      {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
      {message && <p className="text-green-600 mt-6 text-center">{message}</p>}
    </div>
  </main>
  <Footer />
</div>

  );
};
