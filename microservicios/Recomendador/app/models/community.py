# app/models/community.py
from sqlalchemy import Column, Integer, String

from app.database import BaseCommunities
from sqlalchemy import BigInteger
from sqlalchemy.dialects.postgresql import ARRAY

class Community(BaseCommunities):
    __tablename__ = 'communities'
    id = Column(BigInteger, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    descripcion = Column(String, nullable=False, unique=True)
    sociabilidad = Column(Integer)
    tranquilidad = Column(Integer)
    compartir_espacios = Column(Integer)
    limpieza = Column(Integer)
    actividad = Column(Integer)
    integrantes = Column(ARRAY(BigInteger))
    admin = Column(BigInteger, nullable=False, unique=True)