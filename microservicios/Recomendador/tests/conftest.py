
# Para crear estos datos se usa fixture
# Fixture para TestClient
# test/conftest.py
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.models.community import CommunityBase
from app.models.user import User

from app.database import get_db_communities,get_db_users
from unittest.mock import MagicMock
# El scope determina cuanto dura la fixture antes de destruirse y volver a 
# crearse
# -> Function se crea y se destruye para cada test que se use (por defecto)


@pytest.fixture
def db_users():
    db = MagicMock()
    db.users = []
    return db

@pytest.fixture
def db_communities():
    db = MagicMock()
    db.communities = []
    return db
@pytest.fixture()
def client(db_users, db_communities):
    def override_get_db_users():
        try:
            yield db_users
        finally:
            pass

    def override_get_db_communities():
        try:
            yield db_communities
        finally:
            pass

    app.dependency_overrides[get_db_users] = override_get_db_users
    app.dependency_overrides[get_db_communities] = override_get_db_communities

    client = TestClient(app)
    yield client

    app.dependency_overrides.clear()

@pytest.fixture
def test_user(db_users):
    user = User(
        id = 1,
        username="testuser",
        email="prueba@example.com",
        password="secret",
        enabled=True,
        latitud=37.3875,
        longitud=-5.9953,
        sociabilidad=3,
        tranquilidad=4,
        compartir_espacios=2,
        limpieza=5,
        actividad=3,
        id_comunidad = None
    )
    db_users.add(user)
    db_users.commit()
    db_users.refresh(user)
    return user

@pytest.fixture
def test_communities(db_communities):
    communities = [
        CommunityBase(
            id = 1,
            name="Comunidad Cerca",
            descripcion="Cerca del usuario",
            latitud=37.388,
            longitud=-5.996,
            precio=300,
            sociabilidad=3,
            tranquilidad=4,
            compartir_espacios=2,
            limpieza=5,
            actividad=3,
            admin=1
        ),
        CommunityBase(
            id = 2,
            name="Comunidad Lejana",
            descripcion="Lejos del usuario",
            latitud=40.4168,
            longitud=-3.7038,
            precio=500,
            sociabilidad=5,
            tranquilidad=2,
            compartir_espacios=4,
            limpieza=3,
            actividad=5,
            admin=1
        )
    ]
    db_communities.add_all(communities)
    db_communities.commit()
    return communities