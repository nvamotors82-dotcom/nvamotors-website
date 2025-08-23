# NVAMOTORS Backend Implementation Contracts

## API Contracts

### Base URL Structure
- All API endpoints will be prefixed with `/api`
- Example: `GET /api/vehicles`, `POST /api/contact`

## 1. Vehicles API

### GET /api/vehicles
**Description:** Get all vehicles with optional filtering
**Query Parameters:**
- `search` (string): Search term for make/model
- `make` (string): Filter by vehicle make
- `condition` (string): Filter by condition (Nuevo, Seminuevo, Usado)
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `limit` (number): Number of results to return
- `offset` (number): Pagination offset

**Response:**
```json
{
  "vehicles": [
    {
      "id": "string",
      "make": "string",
      "model": "string", 
      "year": "number",
      "price": "number",
      "mileage": "number",
      "transmission": "string",
      "fuelType": "string",
      "condition": "string",
      "image": "string",
      "gallery": ["string"],
      "features": ["string"],
      "description": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "total": "number",
  "hasMore": "boolean"
}
```

### GET /api/vehicles/:id
**Description:** Get single vehicle details
**Response:** Same as vehicle object above

### POST /api/vehicles
**Description:** Create new vehicle (admin only)
**Request Body:** Vehicle object without id, createdAt, updatedAt

### PUT /api/vehicles/:id
**Description:** Update vehicle (admin only)
**Request Body:** Partial vehicle object

### DELETE /api/vehicles/:id
**Description:** Delete vehicle (admin only)

## 2. Contact API

### POST /api/contact
**Description:** Submit contact form
**Request Body:**
```json
{
  "name": "string",
  "email": "string", 
  "phone": "string",
  "subject": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "string"
}
```

### GET /api/contact
**Description:** Get all contact submissions (admin only)

## 3. Custom Search API

### POST /api/custom-search
**Description:** Submit custom vehicle search request
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string", 
  "preferredBrand": "string",
  "budgetRange": "string",
  "vehicleType": "string",
  "yearRange": "string",
  "specificRequirements": "string",
  "suggestions": "string"
}
```

## 4. FAQ API

### GET /api/faqs
**Description:** Get all FAQs
**Response:**
```json
{
  "faqs": [
    {
      "id": "string",
      "question": "string",
      "answer": "string",
      "category": "string",
      "order": "number"
    }
  ]
}
```

### POST /api/faq-questions
**Description:** Submit new question
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "question": "string"
}
```

## 5. Promotions API

### GET /api/promotions
**Description:** Get active promotions
**Response:**
```json
{
  "promotions": [
    {
      "id": "string",
      "title": "string",
      "description": "string", 
      "validUntil": "date",
      "type": "string",
      "image": "string",
      "isActive": "boolean"
    }
  ]
}
```

## 6. Testimonials API

### GET /api/testimonials
**Description:** Get testimonials
**Response:**
```json
{
  "testimonials": [
    {
      "id": "string",
      "name": "string",
      "rating": "number",
      "comment": "string",
      "vehicle": "string",
      "date": "date",
      "isApproved": "boolean"
    }
  ]
}
```

## Mocked Data to Replace

### Current Mock Data in mockData.js:
1. **mockVehicles** - Will be replaced with database queries to vehicles collection
2. **mockTestimonials** - Will be replaced with database queries to testimonials collection  
3. **mockFAQs** - Will be replaced with database queries to faqs collection
4. **mockPromotions** - Will be replaced with database queries to promotions collection
5. **companyInfo** - Will remain as static data (no backend needed)

## Backend Implementation Plan

### 1. MongoDB Models
- **Vehicle** - Store vehicle inventory
- **ContactSubmission** - Store contact form submissions
- **CustomSearchRequest** - Store custom search requests
- **FAQ** - Store frequently asked questions
- **FaqQuestion** - Store user submitted questions
- **Promotion** - Store promotional offers
- **Testimonial** - Store customer testimonials

### 2. FastAPI Endpoints
- Implement all API contracts listed above
- Add proper error handling and validation
- Include CORS middleware for frontend integration
- Add basic authentication for admin endpoints

### 3. Data Seeding
- Migrate current mock data to MongoDB collections
- Create seed script to populate initial data

## Frontend-Backend Integration

### 1. API Service Layer
- Create `src/services/api.js` with all API calls
- Replace mock data imports with API calls
- Add loading states and error handling

### 2. State Management
- Add loading states for all data fetching
- Implement error handling with toast notifications
- Add optimistic updates where appropriate

### 3. Environment Variables
- Backend URL already configured in REACT_APP_BACKEND_URL
- No additional frontend env variables needed

## Implementation Priority

### Phase 1: Core Vehicle Management
1. Vehicle model and CRUD endpoints
2. Replace vehicle mock data with API calls
3. Update inventory and vehicle detail pages

### Phase 2: Communication Features  
1. Contact form submission endpoint
2. Custom search request endpoint
3. FAQ question submission endpoint

### Phase 3: Content Management
1. FAQ, Promotions, Testimonials endpoints
2. Replace remaining mock data
3. Add admin capabilities for content management

### Phase 4: Enhancement
1. Add search optimization
2. Image upload handling
3. Email notifications for form submissions
4. Analytics and reporting endpoints

## Testing Strategy
1. Test all endpoints with backend testing agent
2. Test frontend integration after each phase
3. Verify form submissions and data persistence
4. Test search and filtering functionality
5. Validate error handling and edge cases