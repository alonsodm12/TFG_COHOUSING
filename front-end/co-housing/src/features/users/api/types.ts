// features/user/api/types.ts

export interface LifestyleDTO {
    tranquilo: number;
    actividad: number;
    limpieza: number;
    compartirEspacios: number;
    sociabilidad: number;
}

export interface UserProfile {
    username: string;
    id: number;
    password: string;
    role: string;
    email: string;
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