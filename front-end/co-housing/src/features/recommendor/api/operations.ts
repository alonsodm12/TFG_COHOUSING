//Inclusion de toda la lógica de llamadas a la API de Recomendador

const API_BASE: String = "http://localhost:8000/recommendations";
const API_COMMUNITY: String = "http://localhost:8084/comunidades";
const token = localStorage.getItem("token");

//Get recomendaciones para un usuario especifico
export const getRecommendations = async (userId: number | null) => {
  const response = await fetch(`${API_BASE}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Asegúrate de que `token` esté accesible
    },
    body: JSON.stringify(data), // ← Aquí se envía el cuerpo con los datos
  });

  if (!response.ok) {
    throw new Error("Error al enviar la unión a la Comunidad");
  }

  return response.json();
};