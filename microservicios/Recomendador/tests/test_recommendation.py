import numpy as np
from unittest.mock import patch
from app.recommendation.recommendation import recommend_communities_by_user

def mock_preprocess_data(user, communities):
    return user, communities  # Asume que ya están escalados

@patch("app.recommendation.recommendation.preprocess_data", side_effect=mock_preprocess_data)
def test_recommend_communities_by_user_basic(mock_preprocess):
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
