# app/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db_users, get_db_communities
from app.crud.user import get_user_by_id
from app.crud.user import get_all_communities
from app.recommendation.recommendation import recommend_communities_by_user

app = FastAPI()

@app.get("/recommendations/{user_id}")
def get_recommendations(user_id: int, db_users: Session = Depends(get_db_users), db_communities: Session = Depends(get_db_communities)):
    # Recuperar el usuario desde la base de datos de usuarios
    user = get_user_by_id(db_users, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Recuperar las comunidades desde la base de datos de comunidades
    communities = get_all_communities(db_communities)
    
    # Realizar la recomendación (por ejemplo, utilizando clustering)
    recommended_communities = recommend_communities_by_user(user, communities)
    
    # Devolver las comunidades recomendadas
    return {"recommended_communities": [c.name for c in recommended_communities]}
