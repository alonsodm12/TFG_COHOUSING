import { useUserContext } from "../../ui/Context/UserContext";
import Button from "../../ui/Button/Button";

const BodyHero: React.FC = () => {
  const { userProfile, isLoading } = useUserContext();

  if (isLoading) return <p>Cargando perfil...</p>;
  if (!userProfile) return <p>No se pudo cargar el perfil</p>;

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Bienvenida */}
      <div className="text-center mb-10">
        <h1 className="text-4xl text-black font-bold">
          ¡Bienvenido a Cohousing! {userProfile.username}
        </h1>
        <p className="text-lg text-black mt-2">
          Tu espacio para conectar con comunidades y viviendas colaborativas.
        </p>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 text-center">
        {/* Tarjeta 1 */}
        {userProfile.role === "buscador" && (
          <div className="bg-green-100 text-green-900 rounded-xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300">
            <h2 className="text-xl font-semibold mb-2">Explorar Comunidades</h2>
            <p className="text-sm text-green-800 mb-4">
              Busca espacios disponibles que se ajusten a tus necesidades.
            </p>
            <Button to="/TFG_COHOUSING/recommendations" label="Buscar" />
          </div>
        )}

        {/* Tarjeta 2 */}
        <div className="bg-yellow-100 text-yellow-900 rounded-xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">Mensajes</h2>
          <p className="text-sm text-yellow-800 mb-4">
            Revisa conversaciones con ofertantes o miembros.
          </p>
          <Button to="TFG_COHOUSING" label="Ir a mensajes" />
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-blue-100 text-blue-900 rounded-xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">Mi Perfil</h2>
          <p className="text-sm text-blue-800 mb-4">
            Edita tus datos personales y preferencias de comunidad.
          </p>
          <Button to="/TFG_COHOUSING/user/profile" label="Editar perfil" />
        </div>

        {/* Tarjeta 4 */}
        {userProfile.role === "ofertante" && (
          <div className="bg-pink-100 text-pink-900 rounded-xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300">
            <h2 className="text-xl font-semibold mb-2">Crear Comunidad</h2>
            <p className="text-sm text-pink-800 mb-4">
              ¿Tienes un espacio para ofrecer? Súbelo a la plataforma.
            </p>
            <Button to="/TFG_COHOUSING/community/create" label="Publicar" />
          </div>
        )}

        {/* Tarjeta 5 */}
        <div className="bg-purple-100 text-purple-900 rounded-xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">Solicitudes</h2>
          <p className="text-sm text-purple-800 mb-4">
            Gestiona las solicitudes enviadas y recibidas.
          </p>
          <Button to="TFG_COHOUSING" label="Ver solicitudes" />
        </div>

        {/* Tarjeta 6 */}
        <div className="bg-red-100 text-red-900 rounded-xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">Ajustes</h2>
          <p className="text-sm text-red-800 mb-4">
            Configura tus opciones de cuenta y notificaciones.
          </p>
          <Button to="TFG_COHOUSING" label="Ajustes" />
        </div>
      </div>

      {/* Sección informativa */}
      <div className="bg-white text-blue-900 rounded-2xl shadow-lg p-6 text-center mt-10 border border-blue-200 transition-all duration-300">
        <h2 className="text-3xl font-extrabold mb-2">¿Nuevo en Cohousing?</h2>
        <p className="mb-4 text-lg">Accede a la sección de dudas</p>
        <div className="flex justify-center">
          <Button to="/TFG_COHOUSING/Dudas" label="DUDAS" />
        </div>
      </div>
    </div>
  );
};

export default BodyHero;
