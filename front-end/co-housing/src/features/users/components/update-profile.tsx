import { useState } from 'react';

export const UpdateProfileCard = () => {
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

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateProfile = (field: string, value: any) => {
    if (field.startsWith('lifestyleDTO.')) {
      const subField = field.split('.')[1];
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
    try {
      const response = await fetch('http://localhost:8081/user/update', {
        method: 'POST', // o PUT según tu API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al actualizar el perfil');
      const result = await response.json();
      setMessage('Perfil actualizado con éxito');
      console.log('✅ Respuesta:', result);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={formData.username}
        onChange={(e) => updateProfile('username', e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={(e) => updateProfile('email', e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={(e) => updateProfile('password', e.target.value)}
      />

      <select
        value={formData.role}
        onChange={(e) => updateProfile('role', e.target.value)}
      >
        <option value="">Selecciona un rol</option>
        <option value="USER">Usuario</option>
        <option value="ADMIN">Administrador</option>
      </select>

      <h3>Estilo de vida</h3>
      {Object.entries(formData.lifestyleDTO).map(([key, val]) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="range"
            min={1}
            max={5}
            value={val}
            onChange={(e) =>
              updateProfile(`lifestyleDTO.${key}`, parseInt(e.target.value))
            }
          />
        </div>
      ))}

      <button type="submit">Actualizar perfil</button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};
