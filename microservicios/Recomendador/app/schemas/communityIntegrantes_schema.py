from pydantic import BaseModel,ConfigDict

class CommunityIntegranteSchema(BaseModel):
    integrante_id: int

    model_config = ConfigDict(from_attributes=True)
