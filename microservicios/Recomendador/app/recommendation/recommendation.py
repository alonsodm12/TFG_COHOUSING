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
        "integrantes": community.integrantes,
    }

def recommend_communities_by_user(user, communities, n_recommendations=5):
    # Preprocesar datos
    user_scaled, communities_scaled = preprocess_data(user, communities)

    # Entrenar modelo KMeans con las comunidades
    kmeans = KMeans(n_clusters=3, random_state=42)
    kmeans.fit(communities_scaled)

    # Predecir el cluster del usuario
    user_cluster = kmeans.predict(user_scaled)[0]
    communities_clusters = kmeans.predict(communities_scaled)

    # Obtener centroide del cluster del usuario
    user_center = kmeans.cluster_centers_[user_cluster]

    # Filtrar comunidades en el mismo cluster
    communities_in_cluster = [
        (i, communities[i]) for i in range(len(communities))
        if communities_clusters[i] == user_cluster
    ]

    # Calcular distancias al centroide
    distances = [
        (i, np.linalg.norm(communities_scaled[i] - user_center))
        for i, _ in communities_in_cluster
    ]

    max_distance = max((d[1] for d in distances), default=1)
    if max_distance == 0:
        max_distance = 1  # evitar división por cero

    affinities = []
    for i, dist in distances:
        if math.isnan(dist) or math.isinf(dist):
            affinity = 0.0  # valor seguro si dist no es válido
        else:
            affinity = 100 * (1 - (dist / max_distance))
            affinity = max(min(affinity, 100), 0)  # limitar a rango 0-100
        affinities.append((i, affinity))

    # Ordenar por afinidad descendente
    affinities.sort(key=lambda x: x[1], reverse=True)

    # Construir lista de recomendaciones con afinidad
    recommended = [
        {**community_to_dict(communities[i]), "affinity": round(aff, 2)}
        for i, aff in affinities[:n_recommendations]
    ]

    return recommended
