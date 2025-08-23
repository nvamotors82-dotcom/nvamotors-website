from fastapi import APIRouter, HTTPException, Depends
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models.promotion import Promotion, PromotionCreate, PromotionUpdate
from datetime import date, datetime
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/promotions", tags=["promotions"])

# Database dependency
def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.get("/", response_model=dict)
async def get_promotions(
    active_only: bool = True,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get promotions"""
    query = {}
    
    if active_only:
        query["is_active"] = True
        query["valid_until"] = {"$gte": date.today()}
    
    promotions = []
    cursor = db.promotions.find(query).sort("created_at", -1)
    
    async for promotion in cursor:
        promotion["_id"] = str(promotion["_id"])
        promotions.append(promotion)
    
    return {"promotions": promotions}

@router.post("/", response_model=Promotion)
async def create_promotion(
    promotion: PromotionCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create new promotion (admin only)"""
    promotion_obj = Promotion(**promotion.dict())
    result = await db.promotions.insert_one(promotion_obj.dict())
    
    if result.inserted_id:
        created_promotion = await db.promotions.find_one({"_id": result.inserted_id})
        created_promotion["_id"] = str(created_promotion["_id"])
        return Promotion(**created_promotion)
    
    raise HTTPException(status_code=400, detail="Failed to create promotion")

@router.put("/{promotion_id}", response_model=Promotion)
async def update_promotion(
    promotion_id: str,
    promotion_update: PromotionUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update promotion (admin only)"""
    # Check if promotion exists
    existing_promotion = await db.promotions.find_one({"id": promotion_id})
    if not existing_promotion:
        raise HTTPException(status_code=404, detail="Promotion not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in promotion_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.promotions.update_one(
        {"id": promotion_id}, 
        {"$set": update_data}
    )
    
    if result.modified_count:
        updated_promotion = await db.promotions.find_one({"id": promotion_id})
        updated_promotion["_id"] = str(updated_promotion["_id"])
        return Promotion(**updated_promotion)
    
    raise HTTPException(status_code=400, detail="Failed to update promotion")

@router.delete("/{promotion_id}")
async def delete_promotion(
    promotion_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete promotion (admin only)"""
    result = await db.promotions.delete_one({"id": promotion_id})
    
    if result.deleted_count:
        return {"message": "Promotion deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Promotion not found")