import { useState, useEffect } from "react";
import { updateUser } from "../api/operations";
import { UserProfile } from "../api/types";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../ui/Context/UserContext";


type Props = {
  user: UserProfile;
};

export const UpdateUserForm = ({ user }: Props) => {
  const navigate = useNavigate();
  const {fetchUserProfile } = useUserContext();

  const [formData, setFormData] = useState<{
    role?: "buscador" | "ofertante";
    lifestyleDTO: {
      tranquilidad: number;
      actividad: number;
      limpieza: number;
      compartirEspacios: number;
      sociabilidad: number;
    };
  }>({
    role: undefined,
    lifestyleDTO: {
      tranquilidad: 3,
      actividad: 3,
      limpieza: 3,
      compartirEspacios: 3,
      sociabilidad: 3,
    },
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        role: user.role ?? undefined,
        lifestyleDTO: {
          tranquilidad: user.lifestyleDTO?.tranquilidad ?? 3,
          actividad: user.lifestyleDTO?.actividad ?? 3,
          limpieza: user.lifestyleDTO?.limpieza ?? 3,
          compartirEspacios: user.lifestyleDTO?.compartirEspacios ?? 3,
          sociabilidad: user.lifestyleDTO?.sociabilidad ?? 3,
        },
      });
    }
  }, [user]);

  const updateProfile = (field: string, value: any) => {
    if (field.startsWith("lifestyleDTO.")) {
      const subField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        lifestyleDTO: {
          ...prev.lifestyleDTO,
          [subField]: value,
        },
      }));
    } else if (field === "role") {
      setFormData((prev) => ({
        ...prev,
        role: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await updateUser(user.username, formData);

      const keys = Object.keys(response);
      if (keys.length === 0) throw new Error("Respuesta vacía del servidor");
      await fetchUserProfile();
      setMessage(keys[0]);
      setTimeout(() => {
        navigate("/TFG_COHOUSING/user/profile");
      }, 500);
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el perfil");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full p-6 bg-white rounded-xl shadow-md border border-gray-200 space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Editar perfil del usuario
      </h2>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Estilo de vida</h3>
        {Object.entries(formData.lifestyleDTO).map(([key, val]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key}
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={val}
              onChange={(e) =>
                updateProfile(`lifestyleDTO.${key}`, parseInt(e.target.value))
              }
              className="w-full"
            />
            <p className="text-sm text-gray-500">Valor: {val}</p>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Actualizar perfil
      </button>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
    </form>
  );
};
