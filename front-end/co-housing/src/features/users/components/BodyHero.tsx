import { useUserContext } from "../../ui/Context/UserContext";
import Button from "../../ui/Button/Button";

const BodyHero: React.FC = () => {
  const { userProfile, isLoading } = useUserContext();

  if (isLoading) return <p className="text-center text-gray-600">Cargando perfil...</p>;
  if (!userProfile) return <p className="text-center text-red-500">No se pudo cargar el perfil</p>;

  const items = [
    {
      role: null,
      label: "🏡",
      text: "Comunidad",
      to: `/TFG_COHOUSING/CommunityUserPage/${userProfile.id}`,
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
      to: `/TFG_COHOUSING/community/create/${userProfile.username}`,
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
    <div className="pt-24 pb-12 text-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 min-h-screen flex flex-col items-center justify-start px-4">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
        ¡Hola {userProfile.username}! 👋
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-500 mb-12 max-w-xl mx-auto">
        ¿Listo para conectar con tu comunidad?
      </p>

      <div className="relative w-[600px] h-[500px] mx-auto">
        {/* Centro con imagen */}
        <div
          className="absolute top-1/2 left-1/2 w-52 h-52 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-2xl bg-white/30 dark:bg-white/10 backdrop-blur-md flex items-center justify-center z-10 cursor-default select-none"
          style={{
            backgroundImage: "url('/TFG_COHOUSING/images/prueba-logo.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          aria-label="Logo de la comunidad"
        ></div>

        {/* Ítems en círculo */}
        {items.map((item, index) => {
          if ((item.role && item.role !== userProfile.role) ||
          (item.text === "Crear Comunidad" && userProfile.idComunidad)) return null;

          const radius = 180; // radio del círculo
          const angleRad = (item.angle * Math.PI) / 180;
          const x = radius * Math.cos(angleRad);
          const y = radius * Math.sin(angleRad);

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
            <button
              key={index}
              onClick={() => (window.location.href = item.to)}
              className={`absolute w-28 h-28 rounded-full ${bgColor} shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center text-gray-700 dark:text-gray-900 font-semibold cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-indigo-400`}
              style={{
                top: `calc(50% + ${y}px - 56px)`,
                left: `calc(50% + ${x}px - 56px)`,
              }}
              aria-label={item.text}
              title={item.text}
              type="button"
            >
              <span className="text-3xl">{item.label}</span>
              <span className="mt-1 text-sm">{item.text}</span>
            </button>
          );
        })}
      </div>

      {/* Ayuda */}
      <div className="mt-16 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          ¿Tienes dudas?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Explora nuestra sección de ayuda
        </p>
        <Button to="/TFG_COHOUSING/Dudas" label="Ver Ayuda" />
      </div>
    </div>
  );
};

export default BodyHero;
