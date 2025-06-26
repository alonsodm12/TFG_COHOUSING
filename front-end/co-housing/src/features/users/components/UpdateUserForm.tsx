import { useState,useEffect } from "react";
import { updateUser } from "../api/operations";
import { UserProfile } from "../api/types";
import { useNavigate } from "react-router-dom";

type Props = {
  user: UserProfile;
};
export const UpdateUserForm = ({ user }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    lifestyleDTO: {
      tranquilo: 3,
      actividad: 3,
      limpieza: 3,
      compartirEspacios: 3,
      sociabilidad: 3,
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username ?? "",
        email: user.email ?? "",
        password: user.password ?? "",
        role: user.role ?? "",
        lifestyleDTO: {
          tranquilo: user.lifestyleDTO?.tranquilidad ?? 3,
          actividad: user.lifestyleDTO?.actividad ?? 3,
          limpieza: user.lifestyleDTO?.limpieza ?? 3,
          compartirEspacios: user.lifestyleDTO?.compartirEspacios ?? 3,
          sociabilidad: user.lifestyleDTO?.sociabilidad ?? 3,
        },
      });
    }
  }, [user]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
  
    try {
      const response = await updateUser(user.username, formData);
  
      // Extrae la primera clave del objeto de respuesta
      const keys = Object.keys(response);
      if (keys.length === 0) throw new Error("Respuesta vacía del servidor");
  
      const successMessage = keys[0];
      setMessage(successMessage);
      
      // Navegar después de un breve delay para mostrar el mensaje
      setTimeout(() => {
        navigate('/TFG_COHOUSING/user/profile');
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el perfil");
    }
  };
  
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white rounded-xl shadow-md border border-gray-200 space-y-6"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Nombre de usuario
        </label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => updateProfile("username", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Nombre de usuario"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateProfile("email", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Correo electrónico"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => updateProfile("password", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Contraseña"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Rol</label>
        <select
          value={formData.role}
          onChange={(e) => updateProfile("role", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Selecciona un rol</option>
          <option value="Buscador">Buscador</option>
          <option value="Ofertante">Ofertante</option>
        </select>
      </div>

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
