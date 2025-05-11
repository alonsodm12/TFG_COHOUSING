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
    lifestyleDTO: LifestyleDTO
}

//Ambas interfaces destinadas a método patch
export type UpdateCommunityProfile = Partial<CommunityProfile>;
export type UpdateLifestyleDTO = Partial<LifestyleDTO>;