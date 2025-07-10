from sqlalchemy import Column, Integer, String, Boolean, BigInteger, Double
from app.database import BaseUsers

class User(BaseUsers):
    __tablename__ = 'users'
    id = Column(BigInteger, primary_key=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    foto_url = Column(String)
    latitud = Column(Double)
    longitud = Column(Double)
    direccion = Column(String)
    enabled = Column(Boolean, nullable=False)
    role = Column(String)
    sociabilidad = Column(Integer)
    tranquilidad = Column(Integer)
    compartir_espacios = Column(Integer)
    limpieza = Column(Integer)
    actividad = Column(Integer)

