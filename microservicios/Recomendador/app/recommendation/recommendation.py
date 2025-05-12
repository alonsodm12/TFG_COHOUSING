from app.recommendation.clustering import preprocess_data
from sklearn.cluster import KMeans
import numpy as np

def recommend_communities_by_user(user, communities, n_recommendations=5):
    # Preprocesar datos
    user_scaled, communities_scaled = preprocess_data(user, communities)

    # Entrenar modelo KMeans con solo las comunidades (escaladas)
    kmeans = KMeans(n_clusters=3, random_state=42)
    kmeans.fit(communities_scaled)

    # Predecir el cluster del usuario
    user_cluster = kmeans.predict(user_scaled)[0]

    # Obtener las comunidades en ese mismo cluster
    communities_clusters = kmeans.predict(communities_scaled)

    # Obtener centroide del cluster del usuario
    user_center = kmeans.cluster_centers_[user_cluster]

    # Filtrar comunidades en ese cluster
    communities_in_cluster = [
        (i, communities[i]) for i in range(len(communities))
        if communities_clusters[i] == user_cluster
    ]

    # Calcular distancias al centroide
    distances = [
        (i, np.linalg.norm(communities_scaled[i] - user_center))
        for i, _ in communities_in_cluster
    ]

    # Ordenar por distancia
    distances.sort(key=lambda x: x[1])

    # Devolver las comunidades más cercanas
    recommended_communities = [communities[i] for i, _ in distances[:n_recommendations]]
    
    return recommended_communities
