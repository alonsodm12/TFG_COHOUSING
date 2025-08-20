import { useState, useEffect } from "react";
import { CommunityProfile, LifestyleDTO } from "../api/type";
import { useUserContext } from "../../ui/Context/UserContext";
import { useNavigate } from "react-router-dom";

export type CommunityFormProps = {
  onSubmit: (data: CommunityProfile) => void;
  initialData?: Partial<CommunityProfile>;
};

function buildInitialFormData(
  userId: number | null,
  overrides?: Partial<CommunityProfile>
): CommunityProfile {
  return {
    name: overrides?.name ?? "",
    descripcion: overrides?.descripcion ?? "",
    idAdmin: overrides?.idAdmin ?? userId ?? 0,
    lifestyleDTO: {
      tranquilidad: overrides?.lifestyleDTO?.tranquilidad ?? 1,
      actividad: overrides?.lifestyleDTO?.actividad ?? 1,
      limpieza: overrides?.lifestyleDTO?.limpieza ?? 1,
      compartirEspacios: overrides?.lifestyleDTO?.compartirEspacios ?? 1,
      sociabilidad: overrides?.lifestyleDTO?.sociabilidad ?? 1,
    },
    integrantes: overrides?.integrantes ?? [],
    fotoUrl: overrides?.fotoUrl ?? null,
    latitud: overrides?.latitud ?? 0,
    longitud: overrides?.longitud ?? 0,
    direccion: overrides?.direccion ?? "",
    precio: overrides?.precio ?? 0,
    num_integrantes: overrides?.num_integrantes ?? 0
  };
}

export const CommunityForm = ({
  onSubmit,
  initialData,
}: CommunityFormProps) => {
  const navigate = useNavigate();
  const { userProfile } = useUserContext();

  const [formData, setFormData] = useState<CommunityProfile>(
    buildInitialFormData(userProfile?.id ?? null, initialData)
  );

  useEffect(() => {
    if (userProfile?.id && !initialData) {
      setFormData(buildInitialFormData(userProfile.id));
    }
  }, [userProfile, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) : value,
    }));
  };

  const handleDireccionChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const direccion = e.target.value;
    setFormData((prev) => ({
      ...prev,
      direccion: direccion,
    }));

    // Usamos la API de geocodificación para obtener lat/lon
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setFormData((prev) => ({
          ...prev,
          latitud: parseFloat(lat),
          longitud: parseFloat(lon),
        }));
      }
    } catch (error) {
      console.error("Error obteniendo coordenadas:", error);
    }
  };

  const handleSliderChange = (name: keyof LifestyleDTO, value: number) => {
    setFormData((prev) => ({
      ...prev,
      lifestyleDTO: {
        ...prev.lifestyleDTO,
        [name]: value,
      },
    }));
  };

  const formatDescripcion = (desc: string) => {
    const trimmed = desc.trim();
    return trimmed ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1) : "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      descripcion: formatDescripcion(formData.descripcion),
    };
    onSubmit(formattedData);
    navigate("/TFG_COHOUSING/home");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        {initialData ? "Editar comunidad" : "Crear comunidad"}
      </h2>

      <div>
        <label className="block text-gray-700 mb-1">
          Nombre de la comunidad
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Descripción</label>
        <input
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Ej: Somos un grupo tranquilo..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        <small className="text-gray-500">
          Describe brevemente el estilo de convivencia.
        </small>
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Número de integrantes</label>
        <input
          type="number"
          name="num_integrantes"
          value={formData.num_integrantes}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          min="1" // opcional
        />
        <small className="text-gray-500">
          Indica cuántas personas pueden vivir en la comunidad.
        </small>
      </div>

      {[
        { label: "Tranquilidad", name: "tranquilidad" },
        { label: "Nivel de actividad", name: "actividad" },
        { label: "Importancia de limpieza", name: "limpieza" },
        { label: "Compartir espacios", name: "compartirEspacios" },
        { label: "Sociabilidad", name: "sociabilidad" },
      ].map((item) => (
        <div key={item.name}>
          <label className="block text-gray-700 mb-1">
            {item.label} (1 - 5)
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={formData.lifestyleDTO[item.name as keyof LifestyleDTO]}
            onChange={(e) =>
              handleSliderChange(
                item.name as keyof LifestyleDTO,
                parseInt(e.target.value)
              )
            }
            className="w-full accent-blue-600"
          />
        </div>
      ))}

      <div>
        <label className="block text-gray-700 mb-1">Dirección</label>
        <input
          name="direccion"
          value={formData.direccion}
          onChange={handleDireccionChange}
          placeholder="Ej: Calle Mayor 3, Granada"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">
          Precio por persona (€)
        </label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Foto de la comunidad</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFormData((prev) => ({
                ...prev,
                fotoFile: file, // archivo real para enviar
                fotoUrl: URL.createObjectURL(file), // URL para vista previa
              }));
            }
          }}
          className="w-full"
        />
        {formData.fotoUrl && (
          <img
            src={formData.fotoUrl}
            alt="Vista previa"
            className="mt-2 rounded-xl max-h-40 object-cover"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {initialData ? "Guardar cambios" : "Crear comunidad"}
      </button>
    </form>
  );
};
