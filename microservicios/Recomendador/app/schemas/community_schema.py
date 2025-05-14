from pydantic import BaseModel
from typing import List, Optional

class CommunitySchema(BaseModel):
    id: int
    name: str
    descripcion: str
    sociabilidad: Optional[int]
    tranquilidad: Optional[int]
    compartir_espacios: Optional[int]
    limpieza: Optional[int]
    actividad: Optional[int]
    integrantes: Optional[List[int]]
    admin: int

    class Config:
        orm_mode = True

