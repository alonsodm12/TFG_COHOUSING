//Inclusion de toda la lógica de llamadas a la API de Usuarios

import { UpdateUserProfile, UserLogin, UserProfile } from "./types";

const API_BASE: String = "http://localhost:8084/user";
const token = localStorage.getItem('token');
//Patch usuario
export const updateUser = async (data: UpdateUserProfile) => {
  const response = await fetch(`${API_BASE}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar al usuario");
  }

  return response.json();
};

//Get usuario
export const fetchUserByUsername = async (username: string | null) => {
  const response = await fetch(`${API_BASE}/${username}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (response==null) {
    throw new Error("Error al obtener los datos del usuario");
  }

  return response.json();
};

//Post crear usuario

export const createUser = async (data: UserProfile) => {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear el usuario");
  }

  return response.json();
};

export const loginUser = async (data:UserLogin) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),

  });
  if (!response.ok){
    throw new Error("Error al logear el usuario");
  }

  return response.json();
}

//Post delete usuario

export const deleteUser = async (username: string | null) => {
  const response = await fetch(`${API_BASE}/delete/${username}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al borrar al usuario");
  }

  return response.json();
};
