from pydantic import BaseModel
from typing import List, Optional

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
    integrantes: Optional[List[CommunityIntegranteSchema]]
    admin: int

    class Config:
        orm_mode = True

