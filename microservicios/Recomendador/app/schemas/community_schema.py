from pydantic import BaseModel,ConfigDict
from typing import List, Optional, Union

from app.schemas.communityIntegrantes_schema import CommunityIntegranteSchema

class CommunitySchema(BaseModel):
    id: int
    name: str
    descripcion: str
    sociabilidad: Optional[int]
    tranquilidad: Optional[int]
    compartir_espacios: Optional[int]
    limpieza: Optional[int]
    actividad: Optional[int]
    admin: int
    fotoUrl: Optional[str] = None
    direccion: Optional[str] = None
    precio: Optional[float] = None
    affinity: Optional[float] = None  # np.float64 también es compatible como float
    latitud : Optional[float]
    longitud : Optional[float]

    model_config = ConfigDict(from_attributes=True)
