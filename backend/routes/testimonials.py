from fastapi import APIRouter, HTTPException, Depends
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models.testimonial import Testimonial, TestimonialCreate, TestimonialUpdate
from datetime import datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/testimonials", tags=["testimonials"])

# Database dependency
def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.get("/", response_model=dict)
async def get_testimonials(
    approved_only: bool = True,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get testimonials"""
    query = {}
    
    if approved_only:
        query["is_approved"] = True
    
    testimonials = []
    cursor = db.testimonials.find(query).sort("created_at", -1)
    
    async for testimonial in cursor:
        testimonial["_id"] = str(testimonial["_id"])
        testimonials.append(testimonial)
    
    return {"testimonials": testimonials}

@router.post("/", response_model=Testimonial)
async def create_testimonial(
    testimonial: TestimonialCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create new testimonial"""
    testimonial_obj = Testimonial(**testimonial.dict())
    result = await db.testimonials.insert_one(testimonial_obj.dict())
    
    if result.inserted_id:
        created_testimonial = await db.testimonials.find_one({"_id": result.inserted_id})
        created_testimonial["_id"] = str(created_testimonial["_id"])
        return Testimonial(**created_testimonial)
    
    raise HTTPException(status_code=400, detail="Failed to create testimonial")

@router.put("/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(
    testimonial_id: str,
    testimonial_update: TestimonialUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update testimonial (admin only)"""
    # Check if testimonial exists
    existing_testimonial = await db.testimonials.find_one({"id": testimonial_id})
    if not existing_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in testimonial_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.testimonials.update_one(
        {"id": testimonial_id}, 
        {"$set": update_data}
    )
    
    if result.modified_count:
        updated_testimonial = await db.testimonials.find_one({"id": testimonial_id})
        updated_testimonial["_id"] = str(updated_testimonial["_id"])
        return Testimonial(**updated_testimonial)
    
    raise HTTPException(status_code=400, detail="Failed to update testimonial")

@router.delete("/{testimonial_id}")
async def delete_testimonial(
    testimonial_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete testimonial (admin only)"""
    result = await db.testimonials.delete_one({"id": testimonial_id})
    
    if result.deleted_count:
        return {"message": "Testimonial deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Testimonial not found")