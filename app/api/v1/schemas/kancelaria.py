from pydantic import BaseModel, Field
from typing import Optional

class KancelariaBase(BaseModel):
    name: str = Field(..., example="Law Firm A")
    location: str = Field(..., example="Warsaw, Poland")
    specialization: str = Field(..., example="Criminal Law")

class KancelariaCreate(KancelariaBase):
    pass

class KancelariaUpdate(KancelariaBase):
    name: Optional[str] = None
    location: Optional[str] = None
    specialization: Optional[str] = None

class KancelariaInDB(KancelariaBase):
    id: int = Field(..., example=1)

    class Config:
        from_attributes = True