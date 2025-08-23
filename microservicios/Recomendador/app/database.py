from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Crear motores para ambas bases de datos
engine_users = create_engine(settings.SQLALCHEMY_DATABASE_URL_USERS, echo=True)
engine_communities = create_engine(settings.SQLALCHEMY_DATABASE_URL_COMMUNITIES, echo=True)


# Crear las clases base para ambas bases de datos
BaseUsers = declarative_base()
BaseCommunities = declarative_base()

# Crear las sesiones para ambas bases de datos
SessionLocalUsers = sessionmaker(autocommit=False, autoflush=False, bind=engine_users)
SessionLocalCommunities = sessionmaker(autocommit=False, autoflush=False, bind=engine_communities)

# Función para obtener la sesión de la base de datos de usuarios
def get_db_users():
    db = SessionLocalUsers()
    try:
        yield db
    finally:
        db.close()

# Función para obtener la sesión de la base de datos de comunidades
def get_db_communities():
    db = SessionLocalCommunities()
    try:
        yield db
    finally:
        db.close()
