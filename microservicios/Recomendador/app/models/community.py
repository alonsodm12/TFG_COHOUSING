from typing import List
from sqlalchemy import Column, Integer, String, BigInteger, Float
from app.database import BaseCommunities


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
