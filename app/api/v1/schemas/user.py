from pydantic import BaseModel, Field
from typing import Optional

class UserBase(BaseModel):
    email: str = Field(..., example="user@example.com")

class UserCreate(UserBase):
    password: str = Field(..., example="securepassword")

class UserInDB(UserBase):
    id: int = Field(..., example=1)
    is_active: bool = Field(True, example=True)

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None