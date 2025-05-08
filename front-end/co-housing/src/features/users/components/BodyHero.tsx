import Button from "../../ui/Button/Button";
import React from "react";
import { getRoleFromToken, getUsernameFromToken } from "../../authUtils";
const BodyHero: React.FC = () => {

    const rol: string | null = getRoleFromToken();
    const username: string | null = getUsernameFromToken();
  return (

      <div className="max-w-6xl mx-auto w-full">
        {/* Bienvenida */}
        <div className="text-center mb-10">
          <h1 className="text-4xl text-black font-bold">¡Bienvenido a Cohousing! {username}</h1>
          <p className="text-lg text-black mt-2">Tu espacio para conectar con comunidades y viviendas colaborativas.</p>
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 text-center">
        {/* Tarjeta 1 */}
        {rol == "ROLE_buscador" && (
          
          <div className="bg-white text-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Explorar Comunidades</h2>
            <p className="text-sm text-gray-600 mb-4">Busca espacios disponibles que se ajusten a tus necesidades.</p>
            <Button to ="TFG_COHOUSING" label = "Buscar"/>
          </div>
        )}
          {/* Tarjeta 2 */}
          <div className="bg-white text-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Mensajes</h2>
            <p className="text-sm text-gray-600 mb-4">Revisa conversaciones con ofertantes o miembros.</p>
            <Button to ="TFG_COHOUSING" label = "Ir a mensajes"/>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white text-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Mi Perfil</h2>
            <p className="text-sm text-gray-600 mb-4">Edita tus datos personales y preferencias de comunidad.</p>
            <Button to ="/TFG_COHOUSING/user/profile" label = "Editar perfil"/>
          </div>

          {/* Tarjeta 4 */}
          {rol == "ROLE_ofertante" && (
          <div className="bg-white text-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Crear Comunidad</h2>
            <p className="text-sm text-gray-600 mb-4">¿Tienes un espacio para ofrecer? Súbelo a la plataforma.</p>
            <Button to ="TFG_COHOUSING" label = "Publicar"/>
          </div>
          )}

          {/* Tarjeta 5 */}
          <div className="bg-white text-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Solicitudes</h2>
            <p className="text-sm text-gray-600 mb-4">Gestiona las solicitudes enviadas y recibidas.</p>
            <Button to ="TFG_COHOUSING" label = "Ver solicitudes"/>
          </div>

          {/* Tarjeta 6 */}
          <div className="bg-white text-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Ajustes</h2>
            <p className="text-sm text-gray-600 mb-4">Configura tus opciones de cuenta y notificaciones.</p>
            <Button to ="TFG_COHOUSING" label = "Ajustes"/>
          </div>
        </div>
        {rol == "ROLE_ofertante" && (
          <Button label = "Crear comunidad" to="/TFG_COHOUSING/community/create" />
        )}
        <Button label = "Consultar comunidad" to ="/TFG_COHOUSING/community/perfil" />
        {rol == "ROLE_buscador" && (
          <Button label = "Buscar comunidad" to="/TFG_COHOUSING/community/buscar" />
        )}

        {/* Sección informativa */}
        <div className="bg-white/90 text-gray-900 rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-3">¿Nuevo en Cohousing?</h2>
          <p className="mb-4">Accede a la sección de dudas</p>
          <Button to="TFG_COHOUSING/" label="DUDAS" />
        </div>
      </div>
  );
};

export default BodyHero;
