export interface SolicitudesDTO {
    id: number;
    userId: number;
    comunidadId: number;
    adminId: number | null;
    fecha: Date;
    estado: string;
    descripcion: string;
    tipo: string;
}