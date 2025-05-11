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
    email: string;
    password: string;
    role: string;
    lifestyleDTO: LifestyleDTO;
}

export interface UserLogin {
    username: string;
    password: string;
}

//Ambas interfaces destinadas a método patch
export type UpdateUserProfile = Partial<UserProfile>;
export type UpdateLifestyleDTO = Partial<LifestyleDTO>;