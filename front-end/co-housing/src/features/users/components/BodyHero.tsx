import { useUserContext } from "../../ui/Context/UserContext";

const BodyHero: React.FC = () => {
  const { userProfile, isLoading } = useUserContext();
  console.log(userProfile?.email);
  if (isLoading)
    return <p className="text-center text-gray-600">Cargando perfil...</p>;
  if (!userProfile)
    return (
      <p className="text-center text-red-500">No se pudo cargar el perfil</p>
    );
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
      label: "❓",
      text: "Dudas",
      to: "/TFG_COHOUSING/Dudas",
      angle: 300,
    },
  ];

  return (
    <div className="pt-10 text-center">
      <h1 className="text-5xl font-bold text-black mb-2">
        ¡Hola {userProfile.username}! 👋
      </h1>
      <p className="text-lg dark:text-black-400">
        ¿Listo para conectar con tu comunidad?
      </p>

      <div className="relative w-[600px] h-[500px] mx-auto">
        {/* Centro con imagen */}
        <div
          className="absolute top-1/2 left-1/2 w-52 h-52 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-2xl bg-white/30 dark:bg-white/10 backdrop-blur-md flex items-center justify-center z-10 cursor-default select-none"
          style={{
            backgroundImage: "url('/TFG_COHOUSING/images/final2.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          aria-label="Logo de la comunidad"
        ></div>

        {/* Ítems en círculo */}
        {items.map((item, index) => {
          if (
            (item.role && item.role !== userProfile.role) ||
            (item.text === "Crear Comunidad" && userProfile.idComunidad)
          )
            return null;

          console.log(userProfile.idComunidad);
          const radius = 180; // radio del círculo
          const angleRad = (item.angle * Math.PI) / 180;
          const x = radius * Math.cos(angleRad);
          const y = radius * Math.sin(angleRad);

          const colors = [
            "bg-blue-200",
            "bg-sky-200",
            "bg-cyan-200",
            "bg-indigo-200",
            "bg-violet-200",
            "bg-purple-200",
            "bg-fuchsia-200",
          ];
          const bgColor = colors[index % colors.length];

          return (
            <div
              key={index}
              className="absolute"
              style={{
                top: `calc(50% + ${y}px - 56px)`,
                left: `calc(50% + ${x}px - 56px)`,
              }}
            >
              <div className="animated-border rounded-full">
                <button
                  onClick={() => (window.location.href = item.to)}
                  className={`relative z-10 w-28 h-28 rounded-full ${bgColor} flex flex-col items-center justify-center text-black font-semibold shadow-md transition-all duration-300`}
                  aria-label={item.text}
                  title={item.text}
                  type="button"
                >
                  <span className="text-3xl">{item.label}</span>
                  <span className="mt-1 text-sm">{item.text}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BodyHero;
