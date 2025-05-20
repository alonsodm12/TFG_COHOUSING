# app/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db_users, get_db_communities
from app.crud.user import get_user_by_id
from app.crud.user import get_all_communities
from app.recommendation.recommendation import recommend_communities_by_user
from typing import List
from app.schemas.community_schema import CommunitySchema
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:5173",  # frontend local
    "http://127.0.0.1:3000",  # otro posible origen
    # "https://tu-frontend-en-produccion.com",  <-- si lo usas en producción
]
# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/recommendations/{user_id}", response_model=List[CommunitySchema])
def get_recommendations(user_id: int, db_users: Session = Depends(get_db_users), db_communities: Session = Depends(get_db_communities)):
    user = get_user_by_id(db_users, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    communities = get_all_communities(db_communities)
    recommended_communities = recommend_communities_by_user(user, communities)
    
    return recommended_communities
