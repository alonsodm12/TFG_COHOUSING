import { DatosPerfilDTO } from "./type";


export const sendProfileData = async (datos: DatosPerfilDTO) => {
  const token = localStorage.getItem('jwt');
  const res = await fetch('http://localhost:8084/user/completar-perfil', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });

  if (!res.ok) throw new Error('Error al completar perfil');
};