from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ContactSubmissionBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)

class ContactSubmissionCreate(ContactSubmissionBase):
    pass

class ContactSubmission(ContactSubmissionBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_read: bool = Field(default=False)
    responded_at: Optional[datetime] = None

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class CustomSearchRequestBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    preferred_brand: Optional[str] = Field(None, max_length=50)
    budget_range: Optional[str] = Field(None, max_length=50)
    vehicle_type: Optional[str] = Field(None, max_length=50)
    year_range: Optional[str] = Field(None, max_length=50)
    specific_requirements: Optional[str] = Field(None, max_length=2000)
    suggestions: Optional[str] = Field(None, max_length=2000)

class CustomSearchRequestCreate(CustomSearchRequestBase):
    pass

class CustomSearchRequest(CustomSearchRequestBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")  # pending, in_progress, completed
    assigned_to: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }