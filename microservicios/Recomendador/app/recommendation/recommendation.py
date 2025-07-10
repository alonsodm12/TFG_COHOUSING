from app.recommendation.clustering import preprocess_data
from sklearn.cluster import KMeans
import numpy as np
import math

def community_to_dict(community):
    return {
        "id": community.id,
        "name": community.name,
        "descripcion": community.descripcion,
        "sociabilidad": community.sociabilidad,
        "tranquilidad": community.tranquilidad,
        "compartir_espacios": community.compartir_espacios,
        "limpieza": community.limpieza,
        "actividad": community.actividad,
        "admin": community.admin,
        "fotoUrl": community.foto_url,
        "direccion": community.direccion,
        "precio": community.precio,
        "latitud": community.latitud,
        "longitud": community.longitud
    }

def recommend_communities_by_user(user, communities, n_recommendations=5):
    if not communities:
        return []

    # Preprocesar datos
    user_scaled, communities_scaled = preprocess_data(user, communities)

    if user_scaled is None or communities_scaled is None:
        raise ValueError("Los datos no se pudieron escalar correctamente.")

    # Ajustar número de clusters según el número de comunidades
    n_clusters = min(3, len(communities_scaled))
    if n_clusters == 0:
        return []

    # Entrenar modelo KMeans
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    kmeans.fit(communities_scaled)

    # Predecir el cluster del usuario
    user_cluster = kmeans.predict(user_scaled)[0]
    communities_clusters = kmeans.predict(communities_scaled)

    # Centroide del cluster del usuario
    user_center = kmeans.cluster_centers_[user_cluster]

    # Calcular distancias al centroide dentro del cluster
    distances = []
    for i, community_scaled in enumerate(communities_scaled):
        if communities_clusters[i] == user_cluster:
            dist = np.linalg.norm(community_scaled - user_scaled[0])
            distances.append((i, dist))

    if not distances:
        return []

    max_distance = max((d[1] for d in distances), default=1)
    if max_distance == 0:
        max_distance = 1  # evitar división por cero

    # Calcular afinidad normalizada y limitarla a 0-100
    affinities = []
    for i, dist in distances:
        affinity = 100 * (1 - (dist / max_distance)) if math.isfinite(dist) else 0.0
        affinities.append((i, round(max(min(affinity, 100), 0), 2)))

    # Ordenar por mayor afinidad
    affinities.sort(key=lambda x: x[1], reverse=True)

    # Construir lista de recomendaciones
    recommended = [
        {**community_to_dict(communities[i]), "affinity": affinity}
        for i, affinity in affinities[:n_recommendations]
    ]

    return recommended
