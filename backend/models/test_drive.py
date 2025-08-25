"""
Test Drive Models for NVAMOTORS
"""

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import uuid4

class TestDriveRequestCreate(BaseModel):
    customerName: str
    customerEmail: EmailStr
    customerPhone: str
    selectedVehicle: str
    preferredDate: str
    preferredTime: str
    additionalNotes: Optional[str] = ""

class TestDriveRequest(BaseModel):
    id: str = ""
    customerName: str
    customerEmail: EmailStr
    customerPhone: str
    selectedVehicle: str
    preferredDate: str
    preferredTime: str
    additionalNotes: str = ""
    status: str = "pending"  # pending, confirmed, completed, cancelled
    created_at: datetime = None
    
    def __init__(self, **data):
        if 'id' not in data or not data['id']:
            data['id'] = str(uuid4())
        if 'created_at' not in data or not data['created_at']:
            data['created_at'] = datetime.utcnow()
        super().__init__(**data)

class TestDriveRequestUpdate(BaseModel):
    status: Optional[str] = None
    additionalNotes: Optional[str] = None