import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { fetchUserByUsername } from "../api/operations";
import { UserProfile } from "../../users/api/types";

const UserExternoPage = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        const profile = await fetchUserByUsername(username);
        setUser(profile);
      } catch (err) {
        setError("No se pudo cargar el usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Usuario no encontrado</p>;

  return (
    <div id="root">
      <Header />
      <main className="page">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
          Perfil de Usuario
        </h2>

        <div className="bg-white/25 backdrop-blur-3xl w-fit mx-auto px-32 rounded-xl shadow-2xl p-8 mb-6 text-black">
          <img
            src={user.fotoUrl || "/default-avatar.png"}
            alt="Foto de perfil"
            className="mx-auto w-32 h-32 rounded-full object-cover mb-6 border-4 border-indigo-400 shadow-lg"
          />
          <h1 className="text-3xl font-bold text-indigo-900 text-center">
            {user.username}
          </h1>
          <p className="text-indigo-700 text-sm mb-4 text-center">
            {user.role === "ofertante" ? "Administrador" : "Miembro"}
          </p>

          {user.lifestyleDTO && (
            <>
              <h3 className="text-xl font-semibold mb-3 text-center">
                Estilo de vida
              </h3>
              <ul className="list-disc list-inside text-black text-center mb-8 space-y-1 text-sm">
                <li>Tranquilo: {user.lifestyleDTO.tranquilidad}</li>
                <li>Actividad: {user.lifestyleDTO.actividad}</li>
                <li>Limpieza: {user.lifestyleDTO.limpieza}</li>
                <li>Compartir espacios: {user.lifestyleDTO.compartirEspacios}</li>
                <li>Sociabilidad: {user.lifestyleDTO.sociabilidad}</li>
              </ul>
            </>
          )}

          <button
            onClick={() => window.history.back()}
            className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition mx-auto block"
          >
            Volver
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserExternoPage;
