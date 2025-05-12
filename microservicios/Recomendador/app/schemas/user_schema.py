# app/schemas/user_schema.py
from pydantic import BaseModel

class UserBase(BaseModel):
    preference_1: float
    preference_2: float
    preference_3: float
    preference_4: float
    preference_5: float

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
