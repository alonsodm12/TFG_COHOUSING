// features/user/api/types.ts

export interface LifestyleDTO {
    tranquilidad: number;
    actividad: number;
    limpieza: number;
    compartirEspacios: number;
    sociabilidad: number;
}

export interface UserProfile {
    id?: number | null;
    username: string;
    email: string;
    password: string;
    role: 'buscador' | 'ofertante';
    direccion: string;
    latitud: number;
    longitud: number;
    fotoUrl?: File | null; // <-- Añade esta propiedad?: string; // Se podría usar para mostrar la imagen después del registro
    lifestyleDTO: LifestyleDTO;
    idComunidad: number | null;
}

export interface UserLogin {
    username: string;
    password: string;
}

//Ambas interfaces destinadas a método patch
export type UpdateUserProfile = Partial<UserProfile>;
export type UpdateLifestyleDTO = Partial<LifestyleDTO>;