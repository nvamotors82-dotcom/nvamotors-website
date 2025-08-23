from fastapi import APIRouter, HTTPException, Depends
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models.contact import ContactSubmission, ContactSubmissionCreate, CustomSearchRequest, CustomSearchRequestCreate
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/contact", tags=["contact"])

# Database dependency
def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.post("/", response_model=dict)
async def submit_contact_form(
    contact: ContactSubmissionCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Submit contact form"""
    contact_obj = ContactSubmission(**contact.dict())
    result = await db.contact_submissions.insert_one(contact_obj.dict())
    
    if result.inserted_id:
        return {
            "success": True,
            "message": "Contact form submitted successfully",
            "id": contact_obj.id
        }
    
    raise HTTPException(status_code=400, detail="Failed to submit contact form")

@router.get("/", response_model=List[ContactSubmission])
async def get_contact_submissions(
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all contact submissions (admin only)"""
    submissions = []
    cursor = db.contact_submissions.find().sort("created_at", -1)
    
    async for submission in cursor:
        submission["_id"] = str(submission["_id"])
        submissions.append(ContactSubmission(**submission))
    
    return submissions

@router.post("/custom-search", response_model=dict)
async def submit_custom_search(
    search_request: CustomSearchRequestCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Submit custom vehicle search request"""
    search_obj = CustomSearchRequest(**search_request.dict())
    result = await db.custom_search_requests.insert_one(search_obj.dict())
    
    if result.inserted_id:
        return {
            "success": True,
            "message": "Custom search request submitted successfully",
            "id": search_obj.id
        }
    
    raise HTTPException(status_code=400, detail="Failed to submit custom search request")

@router.get("/custom-search", response_model=List[CustomSearchRequest])
async def get_custom_search_requests(
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all custom search requests (admin only)"""
    requests = []
    cursor = db.custom_search_requests.find().sort("created_at", -1)
    
    async for request in cursor:
        request["_id"] = str(request["_id"])
        requests.append(CustomSearchRequest(**request))
    
    return requests