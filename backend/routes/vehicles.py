from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models.vehicle import Vehicle, VehicleCreate, VehicleUpdate
import os
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/vehicles", tags=["vehicles"])

# Database dependency
def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    return client[os.environ['DB_NAME']]

@router.get("/", response_model=dict)
async def get_vehicles(
    search: Optional[str] = Query(None, description="Search term for make/model"),
    make: Optional[str] = Query(None, description="Filter by vehicle make"),
    condition: Optional[str] = Query(None, description="Filter by condition"),
    min_price: Optional[float] = Query(None, description="Minimum price filter"),
    max_price: Optional[float] = Query(None, description="Maximum price filter"),
    limit: int = Query(20, ge=1, le=100, description="Number of results"),
    offset: int = Query(0, ge=0, description="Pagination offset"),
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get vehicles with optional filtering and pagination"""
    
    # Build query
    query = {}
    
    if search:
        query["$or"] = [
            {"make": {"$regex": search, "$options": "i"}},
            {"model": {"$regex": search, "$options": "i"}}
        ]
    
    if make and make != "all":
        query["make"] = make
        
    if condition and condition != "all":
        query["condition"] = condition
        
    if min_price is not None or max_price is not None:
        price_query = {}
        if min_price is not None:
            price_query["$gte"] = min_price
        if max_price is not None:
            price_query["$lte"] = max_price
        query["price"] = price_query
    
    # Get total count
    total = await db.vehicles.count_documents(query)
    
    # Get vehicles
    cursor = db.vehicles.find(query).skip(offset).limit(limit)
    vehicles = []
    
    async for vehicle in cursor:
        vehicle["_id"] = str(vehicle["_id"])
        vehicles.append(vehicle)
    
    has_more = offset + len(vehicles) < total
    
    return {
        "vehicles": vehicles,
        "total": total,
        "hasMore": has_more
    }

@router.get("/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(
    vehicle_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get single vehicle by ID"""
    vehicle = await db.vehicles.find_one({"id": vehicle_id})
    
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    vehicle["_id"] = str(vehicle["_id"])
    return Vehicle(**vehicle)

@router.post("/", response_model=Vehicle)
async def create_vehicle(
    vehicle: VehicleCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Create new vehicle"""
    vehicle_obj = Vehicle(**vehicle.dict())
    result = await db.vehicles.insert_one(vehicle_obj.dict())
    
    if result.inserted_id:
        created_vehicle = await db.vehicles.find_one({"_id": result.inserted_id})
        created_vehicle["_id"] = str(created_vehicle["_id"])
        return Vehicle(**created_vehicle)
    
    raise HTTPException(status_code=400, detail="Failed to create vehicle")

@router.put("/{vehicle_id}", response_model=Vehicle)
async def update_vehicle(
    vehicle_id: str,
    vehicle_update: VehicleUpdate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Update vehicle"""
    # Check if vehicle exists
    existing_vehicle = await db.vehicles.find_one({"id": vehicle_id})
    if not existing_vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in vehicle_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    result = await db.vehicles.update_one(
        {"id": vehicle_id}, 
        {"$set": update_data}
    )
    
    if result.modified_count:
        updated_vehicle = await db.vehicles.find_one({"id": vehicle_id})
        updated_vehicle["_id"] = str(updated_vehicle["_id"])
        return Vehicle(**updated_vehicle)
    
    raise HTTPException(status_code=400, detail="Failed to update vehicle")

@router.delete("/{vehicle_id}")
async def delete_vehicle(
    vehicle_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Delete vehicle"""
    result = await db.vehicles.delete_one({"id": vehicle_id})
    
    if result.deleted_count:
        return {"message": "Vehicle deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Vehicle not found")