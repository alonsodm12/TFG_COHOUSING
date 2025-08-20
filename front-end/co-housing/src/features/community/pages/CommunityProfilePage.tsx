import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CommunityMap } from "../components/CommunityMap";
import { useCommunity } from "../hook/useCommunity";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { obtenerUsuariosDeComunidad } from "../api/operations";
import { useUserContext } from "../../ui/Context/UserContext";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  role: string;
  email?: string;
  fotoUrl?: string;
}

export const CommunityProfilePage = () => {
  const { username, role } = useUserContext();
  const { communityName } = useParams<{ communityName: string }>();
  const communityNameValid = communityName ?? null;

  const { community, loading, error } = useCommunity(communityNameValid);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuariosLoading, setUsuariosLoading] = useState(false);
  const [usuariosError, setUsuariosError] = useState<string | null>(null);

  useEffect(() => {
    if (community?.id) {
      setResponseMessage(null);
      setUsuariosLoading(true);
      obtenerUsuariosDeComunidad(community.id)
        .then((data) => {
          setUsuarios(data);
          setUsuariosError(null);
        })
        .catch(() => {
          setUsuariosError("No se pudieron cargar los usuarios");
        })
        .finally(() => {
          setUsuariosLoading(false);
        });
    }
  }, [community]);

  // Render condicional después de todos los hooks
  if (!username) {
    return <p>Error: No se pudo obtener el nombre de usuario</p>;
  }
  if (!communityNameValid) {
    return <p>Error: No se pudo obtener el nombre de la comunidad desde la URL</p>;
  }
  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="root" className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />
      <main className="page flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">
          Perfil de Comunidad
        </h1>

        <div className="max-w-4xl mx-auto px-4 mb-10">
          {community?.fotoUrl ? (
            <img
              src={`http://localhost:8082${community.fotoUrl}`}
              alt={`Foto de ${community.name}`}
              className="w-full h-72 object-cover rounded-lg shadow-md border border-gray-300"
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-400 rounded-lg border border-dashed border-gray-300">
              Sin imagen
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-10">
            <p className="text-xl font-semibold mb-2">
              <span className="text-indigo-600">Nombre:</span> {community?.name}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-indigo-600">Descripción:</span>{" "}
              {community?.descripcion}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-indigo-600">Admin:</span>{" "}
              {community?.idAdmin}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-indigo-600">Ubicación:</span>{" "}
              {community?.direccion}
            </p>

            {community?.latitud && community?.longitud ? (
              <CommunityMap
                latitude={community.latitud}
                longitude={community.longitud}
                address={community.direccion}
              />
            ) : (
              <div>No hay ubicación disponible</div>
            )}

            <h3 className="text-2xl font-semibold text-indigo-700 mt-8 mb-4 border-b border-indigo-300 pb-2">
              Estilo de vida
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
              <li>
                <span className="font-semibold">Tranquilidad:</span>{" "}
                {community?.lifestyleDTO.tranquilidad}
              </li>
              <li>
                <span className="font-semibold">Actividad:</span>{" "}
                {community?.lifestyleDTO.actividad}
              </li>
              <li>
                <span className="font-semibold">Limpieza:</span>{" "}
                {community?.lifestyleDTO.limpieza}
              </li>
              <li>
                <span className="font-semibold">Compartir espacios:</span>{" "}
                {community?.lifestyleDTO.compartirEspacios}
              </li>
              <li>
                <span className="font-semibold">Sociabilidad:</span>{" "}
                {community?.lifestyleDTO.sociabilidad}
              </li>
            </ul>

            {responseMessage && (
              <p className="mt-6 p-3 bg-indigo-100 text-indigo-800 rounded-md shadow-sm">
                {responseMessage}
              </p>
            )}

            <h3 className="text-xl mt-6 font-semibold text-indigo-700 mb-4 border-b border-indigo-300 pb-2">
              Usuarios ({usuarios.length})
            </h3>

            {usuariosLoading && <p>Cargando usuarios...</p>}
            {usuariosError && <p className="text-red-500">{usuariosError}</p>}
            {!usuariosLoading && !usuariosError && usuarios.length === 0 && (
              <p>No hay usuarios en esta comunidad</p>
            )}

            <ul className="overflow-y-auto space-y-2 max-h-96">
              {usuarios.map((u) => (
                <li key={u.id}>
                  <Link
                    to={`/usuarios/${u.id}`}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-indigo-100 cursor-pointer transition"
                  >
                    <img
                      src={
                        u.fotoUrl
                          ? `https://localhost:8084/user${u.fotoUrl}`
                          : "/default-avatar.png"
                      }
                      alt={`Avatar de ${u.username}`}
                      className="w-10 h-10 rounded-full object-cover border border-indigo-500"
                    />
                    <div>
                      <p className="font-semibold text-indigo-900">
                        {u.username}
                      </p>
                      <p className="text-indigo-700 text-sm">
                        {u.role === "ofertante" ? "Administrador" : "Miembro"}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
