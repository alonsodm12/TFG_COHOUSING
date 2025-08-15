import { DatosPerfilDTO } from "./type";


export const sendProfileData = async (datos: DatosPerfilDTO) => {
  const res = await fetch('https://localhost:8084/user/completar-perfil', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos),
    credentials: "include"
  });

  if (!res.ok) throw new Error('Error al completar perfil');
};