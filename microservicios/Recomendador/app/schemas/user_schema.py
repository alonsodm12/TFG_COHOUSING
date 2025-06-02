from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserBase(BaseModel):
    username: str
    email: EmailStr
    fotoUrl: str
    latitud: Optional[float]
    longitud: Optional[float]
    direccion: Optional[str]
    enabled: bool
    role: Optional[str]
    sociabilidad: Optional[int]
    tranquilidad: Optional[int]
    compartir_espacios: Optional[int]
    limpieza: Optional[int]
    actividad: Optional[int]


class UserCreate(UserBase):
    password: str


class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True
