import { useState, useEffect } from "react";
import { CommunityProfile, LifestyleDTO } from "../api/type";
import { useUserContext } from "../../ui/Context/UserContext";
import { useNavigate } from "react-router-dom";

type CommunityFormProps = {
  onSubmit: (data: CommunityProfile) => void;
};

function buildInitialFormData(userId: number | null): CommunityProfile {
  return {
    name: "",
    descripcion: "",
    idAdmin: userId ?? 0,
    lifestyleDTO: {
      tranquilo: 1,
      actividad: 1,
      limpieza: 1,
      compartirEspacios: 1,
      sociabilidad: 1,
    },
  };
}

export const CommunityForm = ({ onSubmit }: CommunityFormProps) => {
  const navigate = useNavigate();
  const { userProfile } = useUserContext();
  const [formData, setFormData] = useState<CommunityProfile>(
    buildInitialFormData(userProfile?.id ?? null)
  );

  useEffect(() => {
    if (userProfile?.id) {
      setFormData(buildInitialFormData(userProfile.id));
    }
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/TFG_COHOUSING/home');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Crear comunidad
      </h2>

      <div>
        <label className="block text-gray-700 mb-1">Nombre de la comunidad</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Descripción</label>
        <input
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {[
        { label: "Tranquilidad", name: "tranquilo" },
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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Guardar comunidad
      </button>
    </form>
  );
};
