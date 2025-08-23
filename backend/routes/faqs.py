from fastapi import APIRouter, HTTPException, Depends
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models.faq import FAQ, FAQCreate, FAQUpdate, FAQQuestion, FAQQuestionCreate
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/faqs", tags=["faqs"])

# Database dependency
def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.get("/", response_model=dict)
async def get_faqs(
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all active FAQs"""
    faqs = []
    cursor = db.faqs.find({"is_active": True}).sort("order", 1)
    
    async for faq in cursor:
        faq["_id"] = str(faq["_id"])
        faqs.append(faq)
    
    return {"faqs": faqs}

@router.post("/", response_model=FAQ)
async def create_faq(
    faq: FAQCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create new FAQ (admin only)"""
    faq_obj = FAQ(**faq.dict())
    result = await db.faqs.insert_one(faq_obj.dict())
    
    if result.inserted_id:
        created_faq = await db.faqs.find_one({"_id": result.inserted_id})
        created_faq["_id"] = str(created_faq["_id"])
        return FAQ(**created_faq)
    
    raise HTTPException(status_code=400, detail="Failed to create FAQ")

@router.put("/{faq_id}", response_model=FAQ)
async def update_faq(
    faq_id: str,
    faq_update: FAQUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update FAQ (admin only)"""
    # Check if FAQ exists
    existing_faq = await db.faqs.find_one({"id": faq_id})
    if not existing_faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in faq_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.faqs.update_one(
        {"id": faq_id}, 
        {"$set": update_data}
    )
    
    if result.modified_count:
        updated_faq = await db.faqs.find_one({"id": faq_id})
        updated_faq["_id"] = str(updated_faq["_id"])
        return FAQ(**updated_faq)
    
    raise HTTPException(status_code=400, detail="Failed to update FAQ")

@router.post("/questions", response_model=dict)
async def submit_faq_question(
    question: FAQQuestionCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Submit new FAQ question from user"""
    question_obj = FAQQuestion(**question.dict())
    result = await db.faq_questions.insert_one(question_obj.dict())
    
    if result.inserted_id:
        return {
            "success": True,
            "message": "Question submitted successfully",
            "id": question_obj.id
        }
    
    raise HTTPException(status_code=400, detail="Failed to submit question")

@router.get("/questions", response_model=List[FAQQuestion])
async def get_faq_questions(
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all FAQ questions (admin only)"""
    questions = []
    cursor = db.faq_questions.find().sort("created_at", -1)
    
    async for question in cursor:
        question["_id"] = str(question["_id"])
        questions.append(FAQQuestion(**question))
    
    return questions