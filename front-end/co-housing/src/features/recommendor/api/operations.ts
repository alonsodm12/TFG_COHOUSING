//Inclusion de toda la lógica de llamadas a la API de Recomendador

const API_BASE: String = "https://localhost:8084/recommendations";
const API_COMMUNITY: String = "https://localhost:8084/comunidades";

//Get recomendaciones para un usuario especifico
export const getRecommendations = async (userId: string | null) => {
  const response = await fetch(`${API_BASE}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al obtener las recomendaciones para el usuario");
  }

  return response.json();
};

interface UnionRequestDTO {
  userId: number;
  username: string;
  communityId: number;
  idAdmin: number;
}

export const UnirseComuniadad = async (data: UnionRequestDTO) => {
  const response = await fetch(`${API_COMMUNITY}/unirse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Error al enviar la unión a la Comunidad");
  }

  return response.json();
};

export const addComunidad = async (userId: number,idComunidad: number) => {
  const response = await fetch(`https://localhost:8084/user/addComunidadGuardada/${userId}/${idComunidad}`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al guardar la comunidad");
  }

  return;

}

export const removeComunidad = async (userId: number,idComunidad: number) => {
  const response = await fetch(`https://localhost:8084/user/removeComunidadGuardada/${userId}/${idComunidad}`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al eliminar la comunidad");
  }

  return;

}

export const getRecomendacionesFiltradas = async (userId: string, maxPrecio: number, maxDistancia: number) => {
  const response = await fetch(`https://localhost:8084/recommendations-filtered/${userId}?precio=${maxPrecio}&distancia=${maxDistancia}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Error al obtener las comunidades recomendadas");
  }
  return response.json();
};