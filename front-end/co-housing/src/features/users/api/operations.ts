import { UpdateUserProfile, UserLogin, UserProfile } from "./types";
const API_BASE: String = "http://localhost:8084/user";

// Patch usuario
export const updateUser = async (username: string, data: UpdateUserProfile) => {
  const token = localStorage.getItem("token"); // Obtener el token dentro de la función

  if (!token) {
    throw new Error("Token no disponible. El usuario no está autenticado.");
  }

  const response = await fetch(`${API_BASE}/usuario/${username}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar al usuario");
  }

  return response.json();
};

//Mete idComunidad a user-admin

export const updateAdmin = async (username: string, idAdmin: number) => {
  const token = localStorage.getItem("token"); // Obtener el token dentro de la función

  if (!token) {
    throw new Error("Token no disponible. El usuario no está autenticado.");
  }

  const response = await fetch(
    `${API_BASE}/update-admin/${username}/${idAdmin}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al actualizar al usuario");
  }

  return response.json();
};

// Get usuario
export const fetchUserByUsername = async (username: string | null) => {
  const token = localStorage.getItem("token"); // Obtener el token dentro de la función

  if (!token) {
    throw new Error("Token no disponible. El usuario no está autenticado.");
  }
  console.log("token: ", token);

  const response = await fetch(`${API_BASE}/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los datos del usuario");
  }

  const data = await response.json();
  return data;
};

export const createUser = async (data: FormData) => {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    throw new Error("Error al crear el usuario");
  }

  return response.json();
};

// Login usuario
export const loginUser = async (data: UserLogin) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Comprueba de nuevo el usuario y la contraseña.");
  }

  return response.json();
};

// Delete usuario
export const deleteUser = async (username: string | null) => {
  const token = localStorage.getItem("token"); // Obtener el token dentro de la función

  if (!token) {
    throw new Error("Token no disponible. El usuario no está autenticado.");
  }

  const response = await fetch(`${API_BASE}/delete/${username}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al borrar al usuario");
  }

  return response.json();
};

export const modificarDireccion = async (
  direccion: string,
  latitud: number,
  longitud: number,
  idUser: number
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no disponible. El usuario no está autenticado.");
  }

  const response = await fetch(`${API_BASE}/modificarDireccion/${idUser}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      direccion,
      latitud,
      longitud,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al modificar la dirección del usuario");
  }

};

export const obtenerComunidadesGuardadas = async (comunidadesIds: number[]) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no disponible. El usuario no está autenticado.");
  }

  const response = await fetch("http://localhost:8084/comunidades/filterPorId", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comunidadesIds),
  });

  if (!response.ok) {
    throw new Error("Error al obtener comunidades");
  }

  return response.json();
};