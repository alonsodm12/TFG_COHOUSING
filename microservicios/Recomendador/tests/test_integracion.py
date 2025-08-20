from tests.conftest import client
from tests.conftest import test_user
from tests.conftest import test_communities
from tests.conftest import db_communities,db_users
from unittest.mock import patch
def test_get_recomendadas(client,test_user,db_communities,test_communities):

    headers = {"Authorization": "Bearer test-token"}

    user_id = test_user.id
    db_communities.query.return_value.all.return_value = db_communities
    with patch("app.main.get_user_by_id", return_value=test_user), \
         patch("app.main.get_incomplete_communities", return_value=test_communities):
         
        response = client.get(f"/recommendations/{user_id}", headers=headers)

        assert response.status_code == 200
        data = response.json()
        print(data)
        assert isinstance(data,list), "Debe devolver una lista de comunidades"
        assert len(data) > 0, "Compruebo que la longitud de la lista sea mayor que 0"
        for community in data:
            assert community["id"] != test_user.id_comunidad


# test/test_recommendations_filtered.py
def test_recommendations_filtered(client, test_user, test_communities,db_communities,db_users):
    user_id = test_user.id

    # Filtro que debería incluir solo la comunidad cercana
    params = {"precio": 400, "distancia": 5}  # 5 km de radio
    with patch("app.main.get_user_by_id", return_value=test_user), \
         patch("app.main.get_incomplete_communities", return_value=test_communities):
        response = client.get(f"/recommendations-filtered/{user_id}", params=params)
        
        assert response.status_code == 200
        data = response.json()
        
        # Comprobar que devuelve solo una comunidad (la cercana)
        assert len(data) == 1
        assert data[0]["name"] == "Comunidad Cerca"

def test_recommendations_filtered_no_match(client, test_user, test_communities,db_communities,db_users):
    user_id = test_user.id

    # Filtro que no incluye ninguna comunidad
    params = {"precio": 100, "distancia": 1}  # Muy restrictivo

    response = client.get(f"/recommendations-filtered/{user_id}", params=params)
    
    assert response.status_code == 200
    data = response.json()
    assert data == []