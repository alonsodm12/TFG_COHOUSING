from typing import List
from sqlalchemy import Column, Integer, String, BigInteger, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.associationproxy import association_proxy
from app.database import BaseCommunities

class CommunityIntegrantes(BaseCommunities):  # convención: Clases con mayúscula inicial
    __tablename__ = 'community_integrantes'

    community_id = Column(BigInteger, ForeignKey('communities.id'), primary_key=True)
    integrante_id = Column(BigInteger, primary_key=True)


class CommunityBase(BaseCommunities):
    __tablename__ = 'communities'

    id = Column(Integer, primary_key=True,autoincrement=True)
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
    numero_integrantes = Column(Integer)

    _integrantes = relationship(
        "CommunityIntegrantes",  # Nombre exacto de la clase
        cascade="all, delete-orphan",
        lazy="joined"
    )

    integrantes = association_proxy("_integrantes", "integrante_id")
