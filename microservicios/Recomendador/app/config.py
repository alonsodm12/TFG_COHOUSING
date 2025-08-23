import os

class Settings:
    # Usuarios DB
    DB_USERS_USER: str = os.getenv("DB_USERS_USER", "cohousing")
    DB_USERS_PASS: str = os.getenv("DB_USERS_PASS", "cohousing123")
    DB_USERS_HOST: str = os.getenv("DB_USERS_HOST", "postgres-usuarios")
    DB_USERS_PORT: str = os.getenv("DB_USERS_PORT", "5432")
    DB_USERS_NAME: str = os.getenv("DB_USERS_NAME", "cohousingdb")
    SQLALCHEMY_DATABASE_URL_USERS: str = (
        f"postgresql://{DB_USERS_USER}:{DB_USERS_PASS}@{DB_USERS_HOST}:{DB_USERS_PORT}/{DB_USERS_NAME}"
    )

    # Comunidades DB
    DB_COMM_USER: str = os.getenv("DB_COMM_USER", "cohousing")
    DB_COMM_PASS: str = os.getenv("DB_COMM_PASS", "cohousing123")
    DB_COMM_HOST: str = os.getenv("DB_COMM_HOST", "postgres-comunidades")
    DB_COMM_PORT: str = os.getenv("DB_COMM_PORT", "5432")
    DB_COMM_NAME: str = os.getenv("DB_COMM_NAME", "comunidadesdb")
    SQLALCHEMY_DATABASE_URL_COMMUNITIES: str = (
        f"postgresql://{DB_COMM_USER}:{DB_COMM_PASS}@{DB_COMM_HOST}:{DB_COMM_PORT}/{DB_COMM_NAME}"
    )

settings = Settings()
