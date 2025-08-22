# tests/test_user_crud.py
import pytest
import numpy as np
from unittest.mock import patch
from app.crud.user import get_all_communities, get_user_by_id
from app.recommendation.recommendation import recommend_communities_by_user

from tests.conftest import test_user, test_communities
from tests.conftest import db_communities,db_users

# Test unitario para get_all_communities
def test_obtener_todas_comunidades(db_communities,test_communities):
    db_communities.query.return_value.all.return_value = test_communities

    comunidades = get_all_communities(db_communities)
    
    assert isinstance(comunidades, list), "Debe devolver una lista"
    for c in comunidades:
        assert hasattr(c, "id"), "Falta id en alguna comunidad"
        assert hasattr(c, "name"), "Falta name en alguna comunidad"
    assert len(comunidades) > 0

# Test unitario para get_user_by_id usando fixture
def test_get_usuario_perfil(db_users,test_user):

    db_users.query.return_value.filter.return_value.first.return_value = test_user

    # Llamada a la función que queremos testear
    usuario = get_user_by_id(db_users, test_user.id)

    assert usuario.id == test_user.id, "El id debe coincidir"
    assert usuario.sociabilidad > 0, "Debe tener evaluado sociabilidad"


# Test 3: Recomendaciones de comunidades


def mock_preprocess_data(user, communities):
    # Vector del usuario (mismo tamaño que los vectores de comunidades)
    user_vector = np.array([10.0, 20.0, 500.0, 8.0])
    
    # Vectores de las comunidades, distintos para evitar warnings
    communities_vectors = np.array([
        [11.0, 21.0, 501.0, 9.0],
        [12.0, 22.0, 502.0, 10.0]
    ])
    
    return user_vector.reshape(1, -1), communities_vectors


# Mock para transformar comunidad a dict (incluyendo vector para KMeans)
def mock_community_to_dict(community):
    # Devuelve un diccionario con vector numérico para KMeans
    return {
        "vector": [10.0, 20.0, 500.0, 8.0],
        "id": getattr(community, "id", 1),
        "name": getattr(community, "name", "Comunidad Test")
    }

@patch("app.recommendation.recommendation.preprocess_data", side_effect=mock_preprocess_data)
@patch("app.recommendation.recommendation.community_to_dict", side_effect=mock_community_to_dict)
def test_recommend_communities_by_user_basic(mock_dict, mock_preprocess,test_user,test_communities):

    # Ejecutar la recomendación
    result = recommend_communities_by_user(test_user, test_communities, n_recommendations=2)

    # --- Assertions ---
    assert isinstance(result, list), "El resultado debe ser una lista"
    assert len(result) == 1, "Debe devolver recomendaciones"
    
    for rec in result:
        assert "vector" in rec, "Cada recomendación debe incluir los datos de la comunidad"
        assert "affinity" in rec, "Cada recomendación debe incluir afinidad"
        assert isinstance(rec["affinity"], (int, float)), "La afinidad debe ser numérica"
        assert 0 <= rec["affinity"] <= 100, "La afinidad debe estar en el rango 0-100"

