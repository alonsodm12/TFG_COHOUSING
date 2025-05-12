# app/schemas/community_schema.py
from pydantic import BaseModel

class CommunityBase(BaseModel):
    attribute_1: float
    attribute_2: float
    attribute_3: float
    attribute_4: float
    attribute_5: float

class Community(CommunityBase):
    id: int

    class Config:
        orm_mode = True
