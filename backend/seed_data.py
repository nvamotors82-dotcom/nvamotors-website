"""
Seed script to populate MongoDB with initial data for NVAMOTORS
"""
import asyncio
import os
from datetime import datetime, date
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Sample data
SAMPLE_VEHICLES = [
    {
        "id": "1",
        "make": "Toyota",
        "model": "Camry",
        "year": 2023,
        "price": 28500.00,
        "mileage": 15000,
        "transmission": "Automática",
        "fuel_type": "Gasolina",
        "condition": "Usado",
        "image": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        ],
        "features": ["Sistema de navegación", "Cámara trasera", "Bluetooth", "Control de crucero"],
        "description": "Toyota Camry 2023 en excelente condición. Mantenimiento al día y sin accidentes.",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "2",
        "make": "Honda",
        "model": "Civic",
        "year": 2022,
        "price": 24900.00,
        "mileage": 22000,
        "transmission": "Manual",
        "fuel_type": "Gasolina",
        "condition": "Usado",
        "image": "https://images.unsplash.com/photo-1619362280286-f2aadb0634ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1619362280286-f2aadb0634ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        ],
        "features": ["Sistema multimedia", "Sensores de estacionamiento", "Llanta de aleación"],
        "description": "Honda Civic deportivo y eficiente en combustible.",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "3",
        "make": "Ford",
        "model": "F-150",
        "year": 2024,
        "price": 45000.00,
        "mileage": 5000,
        "transmission": "Automática",
        "fuel_type": "Gasolina",
        "condition": "Seminuevo",
        "image": "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        ],
        "features": ["4x4", "Caja de carga", "Sistema de remolque", "Pantalla táctil"],
        "description": "Ford F-150 2024 prácticamente nueva, perfecta para trabajo y aventura.",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "4",
        "make": "BMW",
        "model": "Serie 3",
        "year": 2021,
        "price": 38900.00,
        "mileage": 35000,
        "transmission": "Automática",
        "fuel_type": "Gasolina",
        "condition": "Usado",
        "image": "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        ],
        "features": ["Cuero", "Techo corredizo", "Sistema premium de audio", "Asientos eléctricos"],
        "description": "BMW Serie 3 de lujo con todas las comodidades premium.",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

SAMPLE_FAQS = [
    {
        "id": "1",
        "question": "¿Qué documentos necesito para comprar un vehículo?",
        "answer": "Necesitas identificación válida, comprobante de ingresos, comprobante de domicilio y, si aplica, documentos del vehículo a intercambiar.",
        "category": "documentos",
        "order": 1,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "2",
        "question": "¿Ofrecen financiamiento para personas con mal crédito?",
        "answer": "Sí, trabajamos con múltiples instituciones financieras para ofrecer opciones de financiamiento para todo tipo de historial crediticio.",
        "category": "financiamiento",
        "order": 2,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "3",
        "question": "¿Puedo hacer una prueba de manejo?",
        "answer": "Por supuesto, todas las pruebas de manejo se realizan con cita previa y con identificación válida.",
        "category": "prueba",
        "order": 3,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "4",
        "question": "¿Qué garantía incluyen los vehículos usados?",
        "answer": "Todos nuestros vehículos usados incluyen garantía limitada y han pasado una inspección de 150 puntos.",
        "category": "garantia",
        "order": 4,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "5",
        "question": "¿Aceptan intercambios de vehículos?",
        "answer": "Sí, evaluamos tu vehículo actual y ofrecemos un valor justo como parte de pago por tu nuevo auto.",
        "category": "intercambio",
        "order": 5,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

SAMPLE_PROMOTIONS = [
    {
        "id": "1",
        "title": "Financiamiento 0% APR",
        "description": "Hasta 60 meses sin intereses en vehículos seleccionados",
        "valid_until": date(2025, 2, 28),
        "promotion_type": "financing",
        "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "terms": "Aplica para vehículos selectos. Sujeto a aprobación crediticia.",
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "2",
        "title": "Descuento por Intercambio",
        "description": "Hasta $5,000 adicionales por tu vehículo usado",
        "valid_until": date(2025, 1, 31),
        "promotion_type": "trade-in",
        "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "terms": "Válido para intercambios de vehículos 2015 o más nuevos.",
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "3",
        "title": "Especial de Fin de Año",
        "description": "Hasta $3,000 de descuento en vehículos 2023-2024",
        "valid_until": datetime(2025, 1, 15),
        "promotion_type": "discount",
        "image": "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "terms": "Aplica solo en vehículos del inventario 2023-2024.",
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

SAMPLE_TESTIMONIALS = [
    {
        "id": "1",
        "name": "Carlos Rodriguez",
        "rating": 5,
        "comment": "Excelente atención y los mejores precios. Encontré el auto perfecto para mi familia.",
        "vehicle": "Toyota Camry 2023",
        "date": datetime(2024, 12, 15),
        "is_approved": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "2",
        "name": "Maria González",
        "rating": 5,
        "comment": "Proceso muy transparente y rápido. El financiamiento fue aprobado sin complicaciones.",
        "vehicle": "Honda Civic 2022",
        "date": datetime(2024, 12, 10),
        "is_approved": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "id": "3",
        "name": "Roberto Silva",
        "rating": 4,
        "comment": "Gran variedad de vehículos y personal muy profesional. Recomendado 100%.",
        "vehicle": "Ford F-150 2024",
        "date": datetime(2024, 12, 8),
        "is_approved": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

async def seed_database():
    """Seed the database with sample data"""
    
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("Starting database seeding...")
    
    try:
        # Clear existing data (optional)
        print("Clearing existing data...")
        await db.vehicles.delete_many({})
        await db.faqs.delete_many({})
        await db.promotions.delete_many({})
        await db.testimonials.delete_many({})
        
        # Seed vehicles
        print("Seeding vehicles...")
        await db.vehicles.insert_many(SAMPLE_VEHICLES)
        print(f"Inserted {len(SAMPLE_VEHICLES)} vehicles")
        
        # Seed FAQs
        print("Seeding FAQs...")
        await db.faqs.insert_many(SAMPLE_FAQS)
        print(f"Inserted {len(SAMPLE_FAQS)} FAQs")
        
        # Seed promotions
        print("Seeding promotions...")
        await db.promotions.insert_many(SAMPLE_PROMOTIONS)
        print(f"Inserted {len(SAMPLE_PROMOTIONS)} promotions")
        
        # Seed testimonials
        print("Seeding testimonials...")
        await db.testimonials.insert_many(SAMPLE_TESTIMONIALS)
        print(f"Inserted {len(SAMPLE_TESTIMONIALS)} testimonials")
        
        print("Database seeding completed successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())