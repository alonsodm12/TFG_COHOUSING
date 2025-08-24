import { DatosPerfilDTO } from "./type";

const API: String = import.meta.env.VITE_API_BASE;

export const sendProfileData = async (datos: DatosPerfilDTO) => {
  const res = await fetch(`${API}user/completar-perfil`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos),
    credentials: "include"
  });

  if (!res.ok) throw new Error('Error al completar perfil');
};