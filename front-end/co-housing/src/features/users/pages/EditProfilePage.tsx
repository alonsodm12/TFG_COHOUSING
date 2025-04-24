import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { updateUser } from '../api/operations';
import { UserProfile } from '../api/types';

export const EditProfilePage = () => {
  const location = useLocation();
  const user = location.state?.user as UserProfile;

  const [formData, setFormData] = useState<UserProfile>(user);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await updateUser(formData);
      if (!response.ok) throw new Error('Error al actualizar el perfil');
      setMessage('Perfil actualizado con éxito');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      {/* Añade más campos según tu modelo */}
      <button type="submit">Guardar cambios</button>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};
