import { useUserContext } from "../../ui/Context/UserContext";
import Button from "../../ui/Button/Button";

const BodyHero: React.FC = () => {
  const { userProfile, isLoading } = useUserContext();

  if (isLoading) return <p>Cargando perfil...</p>;
  if (!userProfile) return <p>No se pudo cargar el perfil</p>;

  const items = [
    {
      role: null,
      label: "💬",
      text: "Mensajes",
      to: "TFG_COHOUSING",
      angle: 0,
    },
    {
      role: null,
      label: "👤",
      text: "Mi Perfil",
      to: "/TFG_COHOUSING/user/profile",
      angle: 60,
    },
    {
      role: "ofertante",
      label: "🏡",
      text: "Crear Comunidad",
      to: "/TFG_COHOUSING/community/create",
      angle: 120,
    },
    {
      role: null,
      label: "📩",
      text: "Solicitudes",
      to: `/TFG_COHOUSING/solicitudes/${userProfile.id}`,
      angle: 180,
    },
    {
      role: "buscador",
      label: "🔍",
      text: "Explorar",
      to: `/TFG_COHOUSING/recommendations/${userProfile.id}`,
      angle: 240,
    },
    {
      role: null,
      label: "⚙️",
      text: "Ajustes",
      to: "TFG_COHOUSING",
      angle: 300,
    },
  ];

  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        ¡Hola {userProfile.username}! 👋
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        ¿Listo para conectar con tu comunidad?
      </p>

      <div className="relative w-[400px] h-[400px] mx-auto">
        {/* Centro agrandado con imagen de fondo */}
        <div
          className="absolute top-1/2 left-1/2 w-52 h-52 -translate-x-1/2 -translate-y-1/2 rounded-full text-white flex items-center justify-center text-xl font-semibold shadow-lg z-10 bg-cover bg-center"
          style={{
            background: "url('/TFG_COHOUSING/images/prueba-logo.png') center / cover no-repeat",

          }}
        >
        </div>

        {/* Ítems en círculo */}
        {items.map((item, index) => {
          if (item.role && item.role !== userProfile.role) return null;

          const radius = 180; // aumentado para que no se superponga
          const angleRad = (item.angle * Math.PI) / 180;
          const x = radius * Math.cos(angleRad);
          const y = radius * Math.sin(angleRad);

          // Colores claritos alternativos
          const colors = [
            "bg-blue-100",
            "bg-green-100",
            "bg-yellow-100",
            "bg-pink-100",
            "bg-purple-100",
            "bg-orange-100",
          ];
          const bgColor = colors[index % colors.length];

          return (
            <div
              key={index}
              className={`absolute w-28 h-28 rounded-full ${bgColor} shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center text-sm text-gray-700 cursor-pointer`}
              style={{
                top: `calc(50% + ${y}px - 56px)`,
                left: `calc(50% + ${x}px - 56px)`,
              }}
              onClick={() => (window.location.href = item.to)}
            >
              <span className="text-2xl">{item.label}</span>
              <span className="mt-1">{item.text}</span>
            </div>
          );
        })}
      </div>

      {/* Ayuda */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          ¿Tienes dudas?
        </h2>
        <p className="text-gray-500 mb-4">Explora nuestra sección de ayuda</p>
        <Button to="/TFG_COHOUSING/Dudas" label="Ver Ayuda" />
      </div>
    </div>
  );
};

export default BodyHero;
