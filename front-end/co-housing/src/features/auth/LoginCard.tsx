import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../users/api/operations';
import { getRoleFromToken, getUsernameFromToken } from '../authUtils';
import { useUserContext } from '../ui/Context/UserContext';

export const LoginCard: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { setUsername, setRole } = useUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await loginUser(formData);
      if (!response || !response["Login correcto: "]?.token) {
        throw new Error('Credenciales inválidas');
      }

      // 1. Guardamos el token
      const token = response["Login correcto: "].token;
      localStorage.setItem('token', token);

      // 2. Confirmamos que el token existe realmente
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        throw new Error('Error al guardar el token');
      }

      // 3. Obtenemos username y role del token
      const username = getUsernameFromToken();
      const role = getRoleFromToken();

      if (!username || !role) {
        throw new Error('Token inválido');
      }

      // 4. Actualizamos el contexto
      setUsername(username);
      setRole(role);

      // 5. Éxito y redirección
      setSuccess('Inicio de sesión correcto');
      navigate('/TFG_COHOUSING/home');
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Bienvenido de nuevo
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {success && <div className="text-green-600 text-center mb-4">{success}</div>}

        <form onSubmit={enviar} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Usuario"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <a href="/TFG_COHOUSING/registro" className="text-blue-500 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
