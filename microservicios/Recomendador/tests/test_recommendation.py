import numpy as np
from app.recommendation.recommendation import recommend_communities_by_user

# Mock de preprocess_data para evitar dependencias
from app.recommendation import clustering
def mock_preprocess_data(user, communities):
    return user, communities  # Asume que ya están escalados
clustering.preprocess_data = mock_preprocess_data

def test_recommend_communities_by_user_basic():
    user = np.array([[0.5, 0.2]])
    communities = np.array([
        [0.4, 0.1],
        [0.6, 0.2],
        [0.9, 0.9],
        [0.1, 0.3],
        [0.45, 0.15]
    ])

    result = recommend_communities_by_user(user, communities, n_recommendations=2)
    assert len(result) == 2
    for r in result:
        assert isinstance(r, np.ndarray)
