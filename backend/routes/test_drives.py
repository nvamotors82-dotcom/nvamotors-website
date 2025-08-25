"""
Test Drive Routes for NVAMOTORS
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from models.test_drive import TestDriveRequest, TestDriveRequestCreate, TestDriveRequestUpdate
import os
from motor.motor_asyncio import AsyncIOMotorClient
from services.notification_service import notification_service

router = APIRouter(prefix="/test-drives", tags=["test-drives"])

# Database dependency
def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.post("/", response_model=dict)
async def schedule_test_drive(
    test_drive: TestDriveRequestCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Schedule a test drive"""
    test_drive_obj = TestDriveRequest(**test_drive.dict())
    result = await db.test_drive_requests.insert_one(test_drive_obj.dict())
    
    if result.inserted_id:
        # Send notifications
        try:
            await notification_service.send_test_drive_notification(test_drive.dict())
        except Exception as e:
            print(f"Notification error: {e}")  # Log but don't fail the request
        
        return {
            "success": True,
            "message": "Test drive scheduled successfully",
            "id": test_drive_obj.id
        }
    
    raise HTTPException(status_code=400, detail="Failed to schedule test drive")

@router.get("/", response_model=List[TestDriveRequest])
async def get_test_drive_requests(
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all test drive requests (admin only)"""
    requests = []
    cursor = db.test_drive_requests.find().sort("created_at", -1)
    
    async for request in cursor:
        request["_id"] = str(request["_id"])
        requests.append(TestDriveRequest(**request))
    
    return requests

@router.put("/{request_id}", response_model=TestDriveRequest)
async def update_test_drive_request(
    request_id: str,
    update_data: TestDriveRequestUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update test drive request status (admin only)"""
    # Check if request exists
    existing_request = await db.test_drive_requests.find_one({"id": request_id})
    if not existing_request:
        raise HTTPException(status_code=404, detail="Test drive request not found")
    
    # Update only provided fields
    update_fields = {k: v for k, v in update_data.dict().items() if v is not None}
    
    if update_fields:
        result = await db.test_drive_requests.update_one(
            {"id": request_id}, 
            {"$set": update_fields}
        )
        
        if result.modified_count:
            updated_request = await db.test_drive_requests.find_one({"id": request_id})
            updated_request["_id"] = str(updated_request["_id"])
            return TestDriveRequest(**updated_request)
    
    raise HTTPException(status_code=400, detail="Failed to update test drive request")

@router.get("/{request_id}", response_model=TestDriveRequest)
async def get_test_drive_request(
    request_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get specific test drive request"""
    request = await db.test_drive_requests.find_one({"id": request_id})
    
    if not request:
        raise HTTPException(status_code=404, detail="Test drive request not found")
    
    request["_id"] = str(request["_id"])
    return TestDriveRequest(**request)