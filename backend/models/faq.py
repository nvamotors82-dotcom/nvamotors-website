from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class FAQBase(BaseModel):
    question: str = Field(..., min_length=1, max_length=500)
    answer: str = Field(..., min_length=1, max_length=2000)
    category: Optional[str] = Field(None, max_length=100)
    order: int = Field(default=0)

class FAQCreate(FAQBase):
    pass

class FAQUpdate(BaseModel):
    question: Optional[str] = Field(None, min_length=1, max_length=500)
    answer: Optional[str] = Field(None, min_length=1, max_length=2000)
    category: Optional[str] = Field(None, max_length=100)
    order: Optional[int] = None

class FAQ(FAQBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = Field(default=True)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class FAQQuestionBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    question: str = Field(..., min_length=1, max_length=1000)

class FAQQuestionCreate(FAQQuestionBase):
    pass

class FAQQuestion(FAQQuestionBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")  # pending, answered, archived
    answer: Optional[str] = None
    answered_at: Optional[datetime] = None

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }