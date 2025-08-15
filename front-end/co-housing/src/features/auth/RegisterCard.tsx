import React, { useState } from "react";
import ButtonFunction from "../ui/Button/ButtonFunction";
import { useNavigate } from 'react-router-dom';
import { createUser } from "../users/api/operations";
import { UserProfile } from "../users/api/types";
import { useUserContext } from "../ui/Context/UserContext";

export const RegisterCard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { setUsername, setRole } = useUserContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserProfile & { fotoFile?: File | null }>({
    username: "",
    email: "",
    password: "",
    role: "buscador",
    direccion: "",
    latitud: 0,
    longitud: 0,
    fotoUrl: null,
    lifestyleDTO: {
      tranquilidad: 5,
      actividad: 5,
      limpieza: 5,
      compartirEspacios: 5,
      sociabilidad: 5,
    },
    idComunidad: null,
    fotoFile: null, // nuevo campo para almacenar el archivo
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      const file = files ? files[0] : null;
      setFormData(prev => ({
        ...prev,
        fotoFile: file,
        fotoUrl: file ? URL.createObjectURL(file) : null,
      }));
    } else if (name in formData.lifestyleDTO) {
      setFormData(prev => ({
        ...prev,
        lifestyleDTO: { ...prev.lifestyleDTO, [name]: parseInt(value) },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const selectRole = (role: "buscador" | "ofertante") => {
    setFormData(prev => ({ ...prev, role }));
  };

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleGeocode = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.direccion)}&format=json`);
      const data = await response.json();
      if (data.length > 0) {
        setLatitud(data[0].lat);
        setLongitud(data[0].lon);
        setStep(step + 1); // Avanza al paso 5
      } else {
        alert("No se encontró la dirección.");
      }
    } catch (error) {
      console.error("Error al buscar coordenadas:", error);
      alert("Error al buscar coordenadas.");
    }
  };

  const handleSubmit = async () => {
    const dataToSend = new FormData();

    const userWithoutFile = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      direccion: formData.direccion,
      latitud: parseFloat(latitud),
      longitud: parseFloat(longitud),
      lifestyleDTO: formData.lifestyleDTO,
      idComunidad: formData.idComunidad
    };

    const userBlob = new Blob([JSON.stringify(userWithoutFile)], {
      type: "application/json"
    });

    dataToSend.append("user", userBlob);

    if (formData.fotoFile) {
      dataToSend.append("foto", formData.fotoFile);
    }

    try {
      const result = await createUser(dataToSend);
      console.log("Registro exitoso:", result);

      const username = result.username;
      const role = result.role;

      if (!username || !role) {
        throw new Error("Token inválido");
      }
      setUsername(username); // Al actualizar username, UserProvider carga el perfil
      setRole(role);
      setSuccess("Registro completado con éxito");
      navigate("/TFG_COHOUSING/home");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Ocurrió un error en el registro.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-4xl font-bold text-center mb-6">Crear cuenta</h2>

      <div className="flex justify-center space-x-2 mb-6">
        {[...Array(7)].map((_, index) => (
          <span key={index} className={`w-3 h-3 rounded-full ${step === index ? 'bg-blue-600' : 'bg-gray-300'}`} />
        ))}
      </div>

      {step === 0 && (
        <>
          <h3 className="text-lg font-semibold">Nombre de usuario</h3>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Usuario" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </>
      )}

      {step === 1 && (
        <>
          <h3 className="text-lg font-semibold">Correo electrónico</h3>
          <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="correo@ejemplo.com" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="text-lg font-semibold">Contraseña</h3>
          <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="********" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </>
      )}

      {step === 3 && (
        <>
          <h3 className="text-lg font-semibold">Rol</h3>
          <div className="flex space-x-4">
            {["buscador", "ofertante"].map((role) => (
              <div key={role}
                   onClick={() => selectRole(role as "buscador" | "ofertante")}
                   className={`cursor-pointer flex-1 p-4 text-center rounded-lg border ${formData.role === role ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </div>
            ))}
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h3 className="text-lg font-semibold">Ubicación</h3>
          <input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Introduce la ciudad donde quieras buscar" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <ButtonFunction label="Buscar Ciudad" onClick={handleGeocode} />
        </>
      )}

      {step === 5 && (
        <>
          <h3 className="text-lg font-semibold">Foto de perfil</h3>
          <input name="foto" type="file" accept="image/*" onChange={handleChange} className="mb-4" />
          {formData.fotoUrl && (
            <img src={formData.fotoUrl} alt="Vista previa" className="w-32 h-32 object-cover rounded-full border" />
          )}
        </>
      )}

      {step === 6 && (
        <>
          <h3 className="text-lg font-semibold">Estilo de vida</h3>
          {[
            { name: "tranquilidad", label: "¿Qué tan importante es para ti la tranquilidad?" },
            { name: "actividad", label: "¿Prefieres una comunidad activa o más relajada?" },
            { name: "limpieza", label: "¿Cuánto valoras la limpieza?" },
            { name: "compartirEspacios", label: "¿Qué importancia das a compartir espacios?" },
            { name: "sociabilidad", label: "¿Qué tan sociable eres?" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <input
                name={name}
                type="range"
                min="1"
                max="5"
                value={formData.lifestyleDTO[name as keyof typeof formData.lifestyleDTO]}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          ))}
        </>
      )}

      <div className="flex justify-between mt-6">
        {step > 0 && <ButtonFunction label="Atrás" onClick={prevStep} />}
        {step < 6 ? (
          step !== 4 && <ButtonFunction label="Siguiente" onClick={nextStep} />
        ) : (
          <ButtonFunction label="Registrarse" onClick={handleSubmit} />
        )}
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
};
