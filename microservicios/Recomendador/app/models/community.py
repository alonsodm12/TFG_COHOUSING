from typing import List
from sqlalchemy import Column, Integer, String, BigInteger, Float
from app.database import BaseCommunities
from pydantic import BaseModel


# Modelo ORM (SQLAlchemy)
class CommunityBase(BaseCommunities):
    __tablename__ = 'communities'
    id = Column(BigInteger,primary_key=True)
    name = Column(String, nullable=False)
    descripcion = Column(String, nullable=False)
    sociabilidad = Column(Integer, nullable=False)
    tranquilidad = Column(Integer, nullable=False)
    compartir_espacios = Column(Integer, nullable=False)
    limpieza = Column(Integer, nullable=False)
    actividad = Column(Integer, nullable=False)
    admin = Column(BigInteger, nullable=False)
    foto_url = Column(String)
    latitud = Column(Float)
    longitud = Column(Float)
    direccion = Column(String)
    precio = Column(Integer)


# Modelos Pydantic para validación / request / response

class CommunityCreate(BaseModel):
    name: str
    descripcion: str
    sociabilidad: int
    tranquilidad: int
    compartir_espacios: int
    limpieza: int
    actividad: int
    admin: int
    foto_url: str | None = None
    latitud: float | None = None
    longitud: float | None = None
    direccion: str | None = None
    precio: int | None = None


class CommunityOut(CommunityCreate):
    id: int

    class Config:
        orm_mode = True


class CommunityIntegranteBase(BaseModel):
    community_id: int
    integrante_id: int


class CommunityIntegranteOut(CommunityIntegranteBase):
    class Config:
        orm_mode = True
