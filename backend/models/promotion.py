from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date
import uuid

class PromotionBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=1000)
    valid_until: date
    promotion_type: str = Field(..., min_length=1, max_length=50)  # financing, trade-in, discount
    image: Optional[str] = None
    terms: Optional[str] = Field(None, max_length=2000)

class PromotionCreate(PromotionBase):
    pass

class PromotionUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1, max_length=1000)
    valid_until: Optional[date] = None
    promotion_type: Optional[str] = Field(None, min_length=1, max_length=50)
    image: Optional[str] = None
    terms: Optional[str] = Field(None, max_length=2000)
    is_active: Optional[bool] = None

class Promotion(PromotionBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = Field(default=True)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            date: lambda v: v.isoformat()
        }