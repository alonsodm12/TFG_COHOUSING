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

export const aceptarSolicitud = async (id: number) => {
    const res = await fetch(`${API_BASE}/${id}/aceptar`, { method: "POST" });
    if (!res.ok) throw new Error("Error al aceptar la solicitud");
};

export const rechazarSolicitud = async (id: number) => {
    const res = await fetch(`${API_BASE}/${id}/rechazar`, { method: "POST" });
    if (!res.ok) throw new Error("Error al rechazar la solicitud");
};

export const eliminarSolicitud = async (id: number) => {
    const res = await fetch(`${API_BASE}/${id}/eliminar`, { method: "POST" });
    if (!res.ok) throw new Error("Error al eliminar la solicitud")
}