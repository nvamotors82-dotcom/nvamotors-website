from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date
import uuid

class TestimonialBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    rating: int = Field(..., ge=1, le=5)
    comment: str = Field(..., min_length=1, max_length=1000)
    vehicle: Optional[str] = Field(None, max_length=100)
    date: date = Field(default_factory=lambda: datetime.now().date())

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    rating: Optional[int] = Field(None, ge=1, le=5)
    comment: Optional[str] = Field(None, min_length=1, max_length=1000)
    vehicle: Optional[str] = Field(None, max_length=100)
    date: Optional[date] = None
    is_approved: Optional[bool] = None

class Testimonial(TestimonialBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_approved: bool = Field(default=False)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            date: lambda v: v.isoformat()
        }