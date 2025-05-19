const API_BASE: String = "http://localhost:8084/solicitudes";

const token = localStorage.getItem("token");

export const getSolicitudesUsuario = async (userId : string) => {
    const response = await fetch(`${API_BASE}/usuario/${userId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Error al obtener las solicitudes");
    }

    return response.json();
}

export const getSolicitudId = async (solicitudId : string) => {
    const response = await fetch(`${API_BASE}/${solicitudId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Error al obtener la solicitud");
    }

    return response.json();
}