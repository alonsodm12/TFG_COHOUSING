//Inclusion de toda la lógica de llamadas a la API de Usuarios

import { UpdateCommunityProfile, CommunityProfile, Tarea, Evento } from "./type";

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


export const fetchTareasPorUsuario = async (userId: number): Promise<Tarea[]> => {
  const response = await fetch(`http://localhost:8084/comunidades/tareas/${userId}`);
  if (!response.ok) {
    throw new Error("No se pudieron cargar las tareas del usuario");
  }
  return response.json();
};

export const fetchEventosPorUsuario = async (userId:number): Promise<Evento[]> => {
  const response = await fetch(`http://localhost:8084/comunidades/eventos/${userId}`);
  if(!response.ok)
    throw new Error("No se pudieron cargar los eventos del usuario");
  return response.json();
}

export const createTask = async (datosTarea: Tarea) => {
  const response = await fetch(`${API_BASE}/tarea`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(datosTarea),
  });

  if (!response.ok) {
    throw new Error("Error al crear la tarea");
  }

  return response.json();
}

export const createEvent = async (datosEvento: Evento) => {
  const response = await fetch(`${API_BASE}/evento`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(datosEvento),
  });

  if(!response.ok) {
    throw new Error("Error al crear el evento");
  }

  return response.json();
}

export const getUserTask = async (idUsuario: number) => {
  const response = await fetch(`${API_BASE}/tareas/${idUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las tareas del usuario");
  }

  return response.json();
}

export const getTask = async ( idTarea:number ) => {
  const response = await fetch(`${API_BASE}/tarea/${idTarea}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener la tarea");
  }

  return response.json();
}

export const getEvent = async ( idEvento: number ) => {
  const response = await fetch(`${API_BASE}/evento/${idEvento}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener el evento");
  }

  return response.json();
}

export const enProgresoTarea = async ( idTarea: number ) => {
  const response = await fetch(`${API_BASE}/enProgresoTarea/${idTarea}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al marcar la tarea como En Progreso");
  }

  return;
}

export const completarTarea = async ( idTarea: number ) => {
  const response = await fetch(`${API_BASE}/completarTarea/${idTarea}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al marcar la tarea como Completada");
  }

  return;
}

export const updateDateTarea = async ( idTarea: number, fecha: string ) => {
  const response = await fetch(`${API_BASE}/tarea/modificarFecha/${idTarea}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({fecha}),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar la fecha de la tarea")
  }
}

export const formatLocalDateTime = (date: Date): string => {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const getPorcentajeTareasUsuario = async (idUsuario: number ) => {
  const response = await fetch(`${API_BASE}/porcentajeTareasUsuario/${idUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });
  if (!response.ok) {
    throw new Error("Error al obtener el porcentaje de tareas del usuario");
  }
  return await response.json();
};

export const getPorcentajeTareasComunidad = async (idComunidad: number ) => {
  const response = await fetch(`${API_BASE}/porcentajeTareasUsuario/${idComunidad}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });
  if (!response.ok) {
    throw new Error("Error al obtener el porcentaje de tareas del usuario");
  }
  return await response.json();
};