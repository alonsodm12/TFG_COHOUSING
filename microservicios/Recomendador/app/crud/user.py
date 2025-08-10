# app/crud/user.py
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.community import CommunityBase

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_all_communities(db: Session):
    return db.query(CommunityBase).all()

def get_incomplete_communities(db: Session):
    all_communities = db.query(CommunityBase).all()
    incomplete = [c for c in all_communities if c.numero_integrantes > len(c.integrantes)]
    return incomplete