//Inclusion de toda la lógica de llamadas a la API de Recomendador

const API_BASE: String = "http://localhost:8000/recommendations";
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
