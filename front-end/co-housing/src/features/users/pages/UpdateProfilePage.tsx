import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { updateUser } from '../api/operations';
import { UserProfile } from '../api/types';
import { UpdateUserForm } from '../components/UpdateUserForm';

export const UpdateProfilePage = () => {
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
    <div>
      <h1> Editar perfil del usuario </h1>
      <UpdateUserForm />
    </div>
  );
};
