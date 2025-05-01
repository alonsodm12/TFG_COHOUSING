import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const RegisterCard = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    lifestyleDTO: {
      tranquilo: 3,
      actividad: 3,
      limpieza: 3,
      compartirEspacios: 3,
      sociabilidad: 3,
    },
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectRole = (role: string) => {
    setFormData({ ...formData, role });
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      fetch('http://localhost:8081/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Error al registrar");
          }
          return res.json();
        })
        .then(() => {
          setSuccess('Registro completado correctamente');
          setTimeout(() => {
            navigate('/TFG_COHOUSING/home');
          }, 2000);
        })
        .catch(err => {
          setError(err.message);
        });
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="flex justify-center rounded-lg  bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Crear cuenta</h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {success && <div className="text-green-600 text-center mb-4">{success}</div>}

        <div className="flex justify-center space-x-2 mb-6">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${step === index ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Nombre de usuario</h3>
            <p className="text-sm text-gray-600">Algo identificable y reconocible.</p>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Usuario"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Correo electrónico</h3>
            <p className="text-sm text-gray-600">Mantente informado.</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Contraseña</h3>
            <p className="text-sm text-gray-600">Usa una segura.</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Rol</h3>
            <p className="text-sm text-gray-600">¿Qué buscas?</p>
            <div className="flex space-x-4">
              <div
                onClick={() => selectRole('buscador')}
                className={`cursor-pointer flex-1 p-4 text-center rounded-lg border transition ${
                  formData.role === 'buscador' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                }`}
              >
                Buscador
              </div>
              <div
                onClick={() => selectRole('ofertante')}
                className={`cursor-pointer flex-1 p-4 text-center rounded-lg border transition ${
                  formData.role === 'ofertante' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                }`}
              >
                Ofertante
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Estilo de vida</h3>
            {[
              { name: "tranquilo", label: "¿Qué tan importante es para ti la tranquilidad?" },
              { name: "actividad", label: "¿Prefieres una comunidad activa o más relajada?" },
              { name: "limpieza", label: "¿Cuánto valoras la limpieza y el orden?" },
              { name: "compartirEspacios", label: "¿Qué tanto te gusta compartir espacios?" },
              { name: "sociabilidad", label: "¿Qué tan sociable eres?" },
            ].map((q) => (
              <div key={q.name}>
                <label className="block mb-1 font-medium">{q.label}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.lifestyleDTO[q.name as keyof typeof formData.lifestyleDTO]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lifestyleDTO: {
                        ...formData.lifestyleDTO,
                        [q.name]: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              onClick={prevStep}
              className="py-2 px-4 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
            >
              Atrás
            </button>
          )}
          <button
            onClick={nextStep}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {step < 4 ? 'Siguiente' : 'Registrarse'}
          </button>
        </div>
      </div>
    </div>
  );
};
