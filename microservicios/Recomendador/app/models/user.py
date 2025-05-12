# app/models/user.py
from sqlalchemy import Column, Integer, String, Boolean
from app.database import BaseUsers
from sqlalchemy import BigInteger


class User(BaseUsers):
    __tablename__ = 'users'
    id = Column(BigInteger, primary_key=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    enabled = Column(Boolean, nullable=False)
    role = Column(String)
    sociabilidad = Column(Integer)
    tranquilidad = Column(Integer)
    compartir_espacios = Column(Integer)
    limpieza = Column(Integer)
    actividad = Column(Integer)
