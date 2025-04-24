//Inclusion de toda la lógica de llamadas a la API de Usuarios

import { UpdateUserProfile, UserProfile } from "./types";

const API_BASE: String = "http://localhost:8081/user";

//Patch usuario
export const updateUser = async (data: UpdateUserProfile) => {
  const response = await fetch(`${API_BASE}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar al usuario");
  }

  return response.json();
};

//Get usuario
export const fetchUserById = async (id: number) => {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener los datos del usuario");
  }

  return response.json();
};

//Post crear usuario

export const createUser = async (data: UserProfile) => {
  const response = await fetch(`${API_BASE}/create`, {
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

//Post delete usuario

export const deleteUser = async (username: String) => {
  const response = await fetch(`${API_BASE}/delete/${username}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al borrar al usuario");
  }

  return response.json();
};
