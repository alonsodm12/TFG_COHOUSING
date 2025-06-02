//Archivo que define la estructura de la Community

export interface LifestyleDTO {
    tranquilo: number;
    actividad: number;
    limpieza: number;
    compartirEspacios: number;
    sociabilidad: number;
}

export interface CommunityProfile {

    name: string;
    descripcion: string;
    idAdmin: number;
    lifestyleDTO: LifestyleDTO;
    integrantes: number[];
    fotoUrl?: File | null;
    latitud: number;
    longitud: number;
    direccion: string;
    precio: number
}

export interface CommunityRecommended {
    id: number;
    name: string;
    descripcion: string;
    admin: number;
    sociabilidad: number;
    tranquilidad: number;
    compartir_espacios: number;
    limpieza: number;
    actividad: number;
    fotoUrl?: File | null;
    direccion: string;
    precio: number;
    affinity: number;
}

//Ambas interfaces destinadas a método patch
export type UpdateCommunityProfile = Partial<CommunityProfile>;
export type UpdateLifestyleDTO = Partial<LifestyleDTO>;