//Inclusion de toda la lógica de llamadas a la API de Usuarios

import { UpdateCommunityProfile, CommunityProfile } from "./type";

const API_BASE: String = "http://localhost:8084/comunidades";
const token = localStorage.getItem('token');
//Patch comunidad
export const updateCommunity = async (data: UpdateCommunityProfile) => {
  const response = await fetch(`${API_BASE}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la comundad");
  }

  return response.json();
};

//Get comunidad especifica
export const fetchCommunityByName = async (communityname: string | null) => {
  const response = await fetch(`${API_BASE}/${communityname}`);
  if (!response.ok) {
    throw new Error("Error al obtener los datos de la comunidad");
  }

  return response.json();
};

//Get comunidad por su id
export const fetchCommunityById = async (communityId: string | null) => {
  const response = await fetch(`${API_BASE}/id/${communityId}`);
  if (!response.ok) {
    throw new Error("Error al obtener los datos de la comunidad");
  }

  return response.json();
};


//Post crear comunidad

export const createCommunity = async (data: FormData) => {
  const response = await fetch(`${API_BASE}/create`, {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    throw new Error("Error al crear la comunidad");
  }

  return response.json();
};


//Post delete comunidad

export const deleteCommunity = async (communityname: string) => {
  const response = await fetch(`${API_BASE}/delete/${communityname}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al borrar la comunidad");
  }

  return response.json();
};
