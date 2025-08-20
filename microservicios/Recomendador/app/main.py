# app/main.py
from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db_users, get_db_communities
from app.crud.user import get_user_by_id
from app.crud.user import get_incomplete_communities
from app.recommendation.recommendation import recommend_communities_by_user
from typing import List
from app.schemas.community_schema import CommunitySchema
from fastapi.middleware.cors import CORSMiddleware
from math import radians, cos, sin, asin, sqrt

app = FastAPI()

@app.get("/recommendations/{user_id}", response_model=List[CommunitySchema])
def get_recommendations(user_id: int, db_users: Session = Depends(get_db_users), db_communities: Session = Depends(get_db_communities)):
    user = get_user_by_id(db_users, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    communities = get_incomplete_communities(db_communities)

    communities_without_user = []
    for community in communities:
        if(community.id != user.id_comunidad or user.id_comunidad==None):
            communities_without_user.append(community)

    recommended_communities = recommend_communities_by_user(user, communities_without_user)
    
    return recommended_communities

#Sacado de internet
def haversine(lat1, lon1, lat2, lon2):
    # Fórmula para calcular distancia entre dos puntos geográficos
    R = 6371  # Radio de la Tierra en km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2)**2
    c = 2 * asin(sqrt(a))
    return R * c

@app.get("/recommendations-filtered/{user_id}", response_model=List[CommunitySchema])
def get_recommendations_filtered(
    user_id: int,
    precio: float = Query(..., description="Precio dispuesto a pagar"),
    distancia: float = Query(..., description="Distancia máxima en km"),
    db_users: Session = Depends(get_db_users),
    db_communities: Session = Depends(get_db_communities)
):
    user = get_user_by_id(db_users, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    communities = get_incomplete_communities(db_communities)

    communities_without_user = []
    for community in communities:
        if(community.id != user.id_comunidad):
            communities_without_user.append(community)

    # Filtrar comunidades por distancia y precio
    filtered_communities = []
    for community in communities_without_user:
        if (
            community.latitud is not None and community.longitud is not None and
            user.latitud is not None and user.longitud is not None
        ):
            distance = haversine(user.latitud, user.longitud, community.latitud, community.longitud)
            if distance <= distancia and community.precio <= precio:
                filtered_communities.append(community)

    recommended = recommend_communities_by_user(user, filtered_communities)
    return recommended