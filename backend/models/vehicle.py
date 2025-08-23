from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class VehicleBase(BaseModel):
    make: str = Field(..., min_length=1, max_length=50)
    model: str = Field(..., min_length=1, max_length=50)
    year: int = Field(..., ge=1900, le=2030)
    price: float = Field(..., ge=0)
    mileage: int = Field(..., ge=0)
    transmission: str = Field(..., min_length=1)
    fuel_type: str = Field(..., min_length=1)
    condition: str = Field(..., min_length=1)
    image: str = Field(..., min_length=1)
    gallery: List[str] = Field(default=[])
    features: List[str] = Field(default=[])
    description: str = Field(default="")

class VehicleCreate(VehicleBase):
    pass

class VehicleUpdate(BaseModel):
    make: Optional[str] = Field(None, min_length=1, max_length=50)
    model: Optional[str] = Field(None, min_length=1, max_length=50)
    year: Optional[int] = Field(None, ge=1900, le=2030)
    price: Optional[float] = Field(None, ge=0)
    mileage: Optional[int] = Field(None, ge=0)
    transmission: Optional[str] = Field(None, min_length=1)
    fuel_type: Optional[str] = Field(None, min_length=1)
    condition: Optional[str] = Field(None, min_length=1)
    image: Optional[str] = Field(None, min_length=1)
    gallery: Optional[List[str]] = None
    features: Optional[List[str]] = None
    description: Optional[str] = None

class Vehicle(VehicleBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }