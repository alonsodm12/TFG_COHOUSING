//Inclusion de toda la lógica de llamadas a la API de Usuarios

import { UpdateCommunityProfile, Tarea, Evento } from "./type";

const API_BASE: String = "https://localhost:8084/comunidades";
//Patch comunidad
export const updateCommunity = async (data: UpdateCommunityProfile) => {
  const response = await fetch(`${API_BASE}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la comundad");
  }

  return response.json();
};

//Get comunidad especifica
export const fetchCommunityByName = async (communityname: string | null) => {
  const response = await fetch(`${API_BASE}/${communityname}` ,{
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al obtener los datos de la comunidad");
  }

  return response.json();
};

//Get comunidad por su id
export const fetchCommunityById = async (communityId: string | null) => {
  const response = await fetch(`${API_BASE}/id/${communityId}`,{
    credentials: "include"
  });
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
    credentials: "include"
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
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Error al borrar la comunidad");
  }

  return response.json();
};


export const fetchTareasPorUsuario = async (userId: number): Promise<Tarea[]> => {
  const response = await fetch(`https://localhost:8084/comunidades/tareas/${userId}`,{
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("No se pudieron cargar las tareas del usuario");
  }
  return response.json();
};

export const fetchEventosPorUsuario = async (userId:number): Promise<Evento[]> => {
  const response = await fetch(`https://localhost:8084/comunidades/eventos/${userId}`,{
    credentials: "include"
  });
  if(!response.ok)
    throw new Error("No se pudieron cargar los eventos del usuario");
  return response.json();
}

export const createTask = async (datosTarea: Tarea) => {
  const response = await fetch(`${API_BASE}/tarea`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(datosTarea),
  });

  if (!response.ok) {
    throw new Error("Error al crear la tarea");
  }

  return response.json();
}

export async function createEvent(evento: Evento) {
  const eventoDTO = {
    ...evento,
    fechaTope: evento.fechaTope + "T00:00:00",
    horaInicio: evento.horaInicio, // "HH:mm"
    horaFinal: evento.horaFinal,   // "HH:mm"
  };

  const res = await fetch("https://localhost:8084/comunidades/evento", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(eventoDTO),
  });

  if (!res.ok) {
    throw new Error("Error al crear el evento");
  }

  return await res.json();
}

export const getUserTask = async (idUsuario: number) => {
  const response = await fetch(`${API_BASE}/tareas/${idUsuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
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
      "Content-Type": "application/json"
    },
    credentials: "include"
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
      "Content-Type": "application/json"
    },
    credentials: "include"
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
      "Content-Type": "application/json"
    },
    credentials: "include"
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
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al marcar la tarea como Completada");
  }

  return;
}

export const completarEvento = async ( idEvento: number ) => {
  const response = await fetch(`${API_BASE}/completarEvento/${idEvento}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al marcar el evento como Completado");
  }

  return;
}

export const updateDateTarea = async ( idTarea: number, fecha: string ) => {
  const response = await fetch(`${API_BASE}/tarea/modificarFecha/${idTarea}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
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
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al obtener el porcentaje de tareas del usuario");
  }
  return await response.json();
};

export const getPorcentajeTareasComunidad = async (idComunidad: number ) => {
  const response = await fetch(`${API_BASE}/porcentajeTareasComunidad/${idComunidad}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al obtener el porcentaje de tareas del usuario");
  }
  return await response.json();
};

export const deleteEliminarUsuario = async (idUsuario: number, idComunidad: number ) => {
  const response = await fetch(`${API_BASE}/eliminarUsuario/${idUsuario}/${idComunidad}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al salir de la comunidad");
  }
  return await response.json();
}

export const deleteEliminarComunidad = async (idComunidad: number ) => {
  const response = await fetch(`${API_BASE}/delete/${idComunidad}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al eliminar la comunidad");
  }
}


export const obtenerUsuariosDeComunidad = async (idComunidad: number ) => {
  const response = await fetch(`https://localhost:8084/user/obtenerUsuariosPorComunidad/${idComunidad}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al obtener los usuarios de una comunidad");
  }

  return await response.json();
}