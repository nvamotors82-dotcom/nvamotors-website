#!/usr/bin/env python3
"""
NVAMOTORS Backend API Test Suite
Tests all backend endpoints for the NVAMOTORS dealership application
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get the backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        return "http://localhost:8001"
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_URL = f"{BASE_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.ENDC}")

def test_health_endpoints():
    """Test basic health and root endpoints"""
    print_test_header("Health and Basic Endpoints")
    
    # Test root endpoint
    try:
        response = requests.get(f"{API_URL}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "timestamp" in data:
                print_success(f"Root endpoint working - Status: {response.status_code}")
                print_info(f"Response: {data['message']}")
            else:
                print_error("Root endpoint missing required fields")
        else:
            print_error(f"Root endpoint failed - Status: {response.status_code}")
    except Exception as e:
        print_error(f"Root endpoint error: {str(e)}")
    
    # Test health endpoint
    try:
        response = requests.get(f"{API_URL}/health", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "healthy" and data.get("database") == "connected":
                print_success(f"Health endpoint working - Status: {response.status_code}")
                print_info(f"Database status: {data.get('database')}")
            else:
                print_warning(f"Health endpoint returned: {data}")
        else:
            print_error(f"Health endpoint failed - Status: {response.status_code}")
    except Exception as e:
        print_error(f"Health endpoint error: {str(e)}")

def test_vehicles_endpoints():
    """Test vehicles API endpoints"""
    print_test_header("Vehicles API Endpoints")
    
    # Test get all vehicles
    try:
        response = requests.get(f"{API_URL}/vehicles/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "vehicles" in data and "total" in data and "hasMore" in data:
                print_success(f"Get vehicles working - Found {data['total']} vehicles")
                vehicles = data["vehicles"]
                if vehicles:
                    print_info(f"Sample vehicle: {vehicles[0]['make']} {vehicles[0]['model']} ({vehicles[0]['year']})")
                    
                    # Test get single vehicle
                    vehicle_id = vehicles[0].get('id')
                    if vehicle_id:
                        try:
                            single_response = requests.get(f"{API_URL}/vehicles/{vehicle_id}", timeout=10)
                            if single_response.status_code == 200:
                                vehicle_data = single_response.json()
                                print_success(f"Get single vehicle working - {vehicle_data['make']} {vehicle_data['model']}")
                            else:
                                print_error(f"Get single vehicle failed - Status: {single_response.status_code}")
                        except Exception as e:
                            print_error(f"Get single vehicle error: {str(e)}")
                else:
                    print_warning("No vehicles found in database")
            else:
                print_error("Vehicles endpoint missing required fields")
        else:
            print_error(f"Get vehicles failed - Status: {response.status_code}")
    except Exception as e:
        print_error(f"Get vehicles error: {str(e)}")
    
    # Test vehicle filtering
    try:
        # Test search filter
        response = requests.get(f"{API_URL}/vehicles/?search=Toyota", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print_success(f"Vehicle search filter working - Found {data['total']} Toyota vehicles")
        
        # Test make filter
        response = requests.get(f"{API_URL}/vehicles/?make=Honda", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print_success(f"Vehicle make filter working - Found {data['total']} Honda vehicles")
        
        # Test condition filter
        response = requests.get(f"{API_URL}/vehicles/?condition=Usado", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print_success(f"Vehicle condition filter working - Found {data['total']} used vehicles")
        
        # Test price range filter
        response = requests.get(f"{API_URL}/vehicles/?min_price=15000&max_price=25000", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print_success(f"Vehicle price filter working - Found {data['total']} vehicles in range")
            
    except Exception as e:
        print_error(f"Vehicle filtering error: {str(e)}")

def test_contact_endpoints():
    """Test contact API endpoints"""
    print_test_header("Contact API Endpoints")
    
    # Test contact form submission
    contact_data = {
        "name": "Carlos Rodriguez",
        "email": "carlos.rodriguez@email.com",
        "phone": "+1-555-0123",
        "subject": "Consulta sobre Toyota Camry 2022",
        "message": "Hola, estoy interesado en el Toyota Camry 2022. ¿Podrían proporcionarme más información sobre el historial del vehículo y las opciones de financiamiento disponibles?"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact/", json=contact_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("message") and data.get("id"):
                print_success("Contact form submission working")
                print_info(f"Contact ID: {data['id']}")
            else:
                print_error("Contact form response missing required fields")
        else:
            print_error(f"Contact form submission failed - Status: {response.status_code}")
            if response.text:
                print_error(f"Error details: {response.text}")
    except Exception as e:
        print_error(f"Contact form submission error: {str(e)}")
    
    # Test custom search submission
    custom_search_data = {
        "name": "Maria Gonzalez",
        "email": "maria.gonzalez@email.com",
        "phone": "+1-555-0456",
        "preferred_brand": "Honda",
        "budget_range": "$20,000 - $30,000",
        "vehicle_type": "SUV",
        "year_range": "2020-2023",
        "specific_requirements": "Necesito un vehículo familiar con buena economía de combustible y características de seguridad avanzadas.",
        "suggestions": "Prefiero colores neutros como blanco, gris o negro."
    }
    
    try:
        response = requests.post(f"{API_URL}/contact/custom-search", json=custom_search_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("message") and data.get("id"):
                print_success("Custom search submission working")
                print_info(f"Search request ID: {data['id']}")
            else:
                print_error("Custom search response missing required fields")
        else:
            print_error(f"Custom search submission failed - Status: {response.status_code}")
            if response.text:
                print_error(f"Error details: {response.text}")
    except Exception as e:
        print_error(f"Custom search submission error: {str(e)}")

def test_faqs_endpoints():
    """Test FAQs API endpoints"""
    print_test_header("FAQs API Endpoints")
    
    # Test get FAQs
    try:
        response = requests.get(f"{API_URL}/faqs/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "faqs" in data:
                faqs = data["faqs"]
                print_success(f"Get FAQs working - Found {len(faqs)} FAQs")
                if faqs:
                    print_info(f"Sample FAQ: {faqs[0]['question'][:50]}...")
                else:
                    print_warning("No FAQs found in database")
            else:
                print_error("FAQs endpoint missing required fields")
        else:
            print_error(f"Get FAQs failed - Status: {response.status_code}")
    except Exception as e:
        print_error(f"Get FAQs error: {str(e)}")
    
    # Test FAQ question submission
    question_data = {
        "name": "Ana Martinez",
        "email": "ana.martinez@email.com",
        "question": "¿Ofrecen garantía extendida para vehículos usados? ¿Cuáles son los términos y condiciones?"
    }
    
    try:
        response = requests.post(f"{API_URL}/faqs/questions", json=question_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("message") and data.get("id"):
                print_success("FAQ question submission working")
                print_info(f"Question ID: {data['id']}")
            else:
                print_error("FAQ question response missing required fields")
        else:
            print_error(f"FAQ question submission failed - Status: {response.status_code}")
            if response.text:
                print_error(f"Error details: {response.text}")
    except Exception as e:
        print_error(f"FAQ question submission error: {str(e)}")

def test_promotions_endpoints():
    """Test promotions API endpoints"""
    print_test_header("Promotions API Endpoints")
    
    try:
        response = requests.get(f"{API_URL}/promotions/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "promotions" in data:
                promotions = data["promotions"]
                print_success(f"Get promotions working - Found {len(promotions)} active promotions")
                if promotions:
                    print_info(f"Sample promotion: {promotions[0]['title']}")
                else:
                    print_warning("No active promotions found")
            else:
                print_error("Promotions endpoint missing required fields")
        else:
            print_error(f"Get promotions failed - Status: {response.status_code}")
    except Exception as e:
        print_error(f"Get promotions error: {str(e)}")

def test_testimonials_endpoints():
    """Test testimonials API endpoints"""
    print_test_header("Testimonials API Endpoints")
    
    try:
        response = requests.get(f"{API_URL}/testimonials/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "testimonials" in data:
                testimonials = data["testimonials"]
                print_success(f"Get testimonials working - Found {len(testimonials)} approved testimonials")
                if testimonials:
                    print_info(f"Sample testimonial from: {testimonials[0]['name']}")
                else:
                    print_warning("No approved testimonials found")
            else:
                print_error("Testimonials endpoint missing required fields")
        else:
            print_error(f"Get testimonials failed - Status: {response.status_code}")
    except Exception as e:
        print_error(f"Get testimonials error: {str(e)}")

def test_error_handling():
    """Test error handling for invalid requests"""
    print_test_header("Error Handling Tests")
    
    # Test invalid vehicle ID
    try:
        response = requests.get(f"{API_URL}/vehicles/invalid-id", timeout=10)
        if response.status_code == 404:
            print_success("Invalid vehicle ID properly returns 404")
        else:
            print_warning(f"Invalid vehicle ID returned status: {response.status_code}")
    except Exception as e:
        print_error(f"Invalid vehicle ID test error: {str(e)}")
    
    # Test invalid contact form data
    try:
        invalid_contact = {"name": "", "email": "invalid-email"}
        response = requests.post(f"{API_URL}/contact/", json=invalid_contact, timeout=10)
        if response.status_code in [400, 422]:
            print_success("Invalid contact form data properly rejected")
        else:
            print_warning(f"Invalid contact form returned status: {response.status_code}")
    except Exception as e:
        print_error(f"Invalid contact form test error: {str(e)}")

def main():
    """Run all backend tests"""
    print(f"{Colors.BOLD}{Colors.BLUE}")
    print("=" * 80)
    print("NVAMOTORS BACKEND API TEST SUITE")
    print("=" * 80)
    print(f"{Colors.ENDC}")
    print(f"Testing backend at: {API_URL}")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Run all test suites
    test_health_endpoints()
    test_vehicles_endpoints()
    test_contact_endpoints()
    test_faqs_endpoints()
    test_promotions_endpoints()
    test_testimonials_endpoints()
    test_error_handling()
    
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("=" * 80)
    print("BACKEND TESTING COMPLETED")
    print("=" * 80)
    print(f"{Colors.ENDC}")

if __name__ == "__main__":
    main()