from pydantic import BaseModel

class CommunityIntegranteSchema(BaseModel):
    integrante_id: int

    class Config:
        orm_mode = True
