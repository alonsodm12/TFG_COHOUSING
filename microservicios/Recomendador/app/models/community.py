from sqlalchemy import Table, Column, ForeignKey, BigInteger, String, Integer
from sqlalchemy.orm import relationship
from app.database import BaseCommunities  # ESTA LÍNEA ES LA CLAVE

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
    admin = Column(BigInteger, nullable=False, unique=True)

    integrantes = relationship("CommunityIntegrante", back_populates="community")


class CommunityIntegrante(BaseCommunities):
    __tablename__ = 'community_integrantes'

    community_id = Column(BigInteger, ForeignKey('communities.id'), primary_key=True)
    integrante_id = Column(BigInteger, primary_key=True)

    community = relationship("Community", back_populates="integrantes")
