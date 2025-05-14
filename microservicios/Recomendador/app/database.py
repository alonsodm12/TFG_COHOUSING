from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Cadena de conexión para la base de datos de usuarios
SQLALCHEMY_DATABASE_URL_USERS = "postgresql://cohousing:cohousing123@postgres-usuarios:5432/cohousingdb"


# Cadena de conexión para la base de datos de comunidades
SQLALCHEMY_DATABASE_URL_COMMUNITIES = "postgresql://cohousing:cohousing123@postgres-comunidades:5432/comunidadesdb"

# Crear motores para ambas bases de datos
engine_users = create_engine(SQLALCHEMY_DATABASE_URL_USERS, echo=True)
engine_communities = create_engine(SQLALCHEMY_DATABASE_URL_COMMUNITIES, echo=True)

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
