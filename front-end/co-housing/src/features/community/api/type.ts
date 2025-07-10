//Archivo que define la estructura de la Community

export interface LifestyleDTO {
  tranquilidad: number;
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
  fotoUrl?: string | null;
  fotoFile?: File | null;
  latitud: number;
  longitud: number;
  direccion: string;
  precio: number;
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
  integrantes: number[];
  latitud: number;
  longitud: number;

}
export type EstadoTarea = "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA";

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  usuariosParticipantes: number[];
  fechaTope: string;
  idComunidad: number;
  numParticipantes: number;
  estado: EstadoTarea;
  duracion: number;
  asignacion: string;
}

export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  usuariosParticipantes: number[];
  fechaTope: string;
  lugar: string;
  horaInicio: number;
  horaFinal: number;
  idComunidad: number;
  numParticipantes: number;

}

//Ambas interfaces destinadas a método patch
export type UpdateCommunityProfile = Partial<CommunityProfile>;
export type UpdateLifestyleDTO = Partial<LifestyleDTO>;
