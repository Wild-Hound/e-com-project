# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         BROWSER                              │
│                    http://localhost:3000                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    NEXT.JS FRONTEND                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages:                                               │  │
│  │  • Home (/)                                          │  │
│  │  • Shop (/shop)                                      │  │
│  │  • Product Detail (/product/[id])                   │  │
│  │  • Cart (/cart)                                      │  │
│  │  • Checkout (/checkout)                              │  │
│  │  • Profile (/profile)                                │  │
│  │  • About, Contact, Orders                           │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components:                                          │  │
│  │  • Navbar, Footer, ProductCard, Button               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Context/State:                                       │  │
│  │  • CartContext (Shopping Cart State)                 │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Client (lib/api.ts):                           │  │
│  │  • getProducts()                                     │  │
│  │  • getProductById()                                  │  │
│  │  • createProduct()                                   │  │
│  │  • updateProduct()                                   │  │
│  │  • deleteProduct()                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API Calls
                         │ (http://localhost:5000/api)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   EXPRESS.JS BACKEND                         │
│                   Port: 5000                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes (routes/productRoutes.ts):                   │  │
│  │  GET    /api/products                                │  │
│  │  GET    /api/products/:id                            │  │
│  │  POST   /api/products                                │  │
│  │  PUT    /api/products/:id                            │  │
│  │  DELETE /api/products/:id                            │  │
│  │  GET    /api/health                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers (controllers/productController.ts):      │  │
│  │  • getAllProducts()                                   │  │
│  │  • getProductById()                                   │  │
│  │  • createProduct()                                    │  │
│  │  • updateProduct()                                    │  │
│  │  • deleteProduct()                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Models (models/Product.ts):                         │  │
│  │  • Product Schema                                     │  │
│  │  • Mongoose Model                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Middleware:                                          │  │
│  │  • CORS                                               │  │
│  │  • JSON Parser                                        │  │
│  │  • Error Handling                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Mongoose ODM
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      MONGODB DATABASE                        │
│                  mongodb://localhost:27017                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Database: ecommerce                                  │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  Collection: products                           │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │  Documents (18 products):                │  │  │  │
│  │  │  │  • id, name, description                 │  │  │  │
│  │  │  │  • price, originalPrice                  │  │  │  │
│  │  │  │  • image, images[]                       │  │  │  │
│  │  │  │  • category, rating, reviews             │  │  │  │
│  │  │  │  • inStock, featured                     │  │  │  │
│  │  │  │  • tags[], specifications{}              │  │  │  │
│  │  │  │  • createdAt, updatedAt                  │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow Example

### User Visits Shop Page

```
1. Browser
   └─> GET http://localhost:3000/shop

2. Next.js (app/shop/page.tsx)
   └─> useEffect() calls getProducts()

3. API Client (app/lib/api.ts)
   └─> fetch('http://localhost:5000/api/products')

4. Express Server (server/server.ts)
   └─> Routes to productRoutes

5. Product Routes (server/routes/productRoutes.ts)
   └─> Calls getAllProducts() controller

6. Product Controller (server/controllers/productController.ts)
   └─> Product.find() via Mongoose

7. Mongoose
   └─> Queries MongoDB

8. MongoDB
   └─> Returns product documents

9. Response flows back through the stack:
   MongoDB → Mongoose → Controller → Route → Express → API Client → React → Browser
```

## Technology Stack

### Frontend Layer

```
┌─────────────────────────────────────┐
│  Next.js 16 (App Router)            │
│  React 19                            │
│  TypeScript                          │
│  Tailwind CSS                        │
│  Framer Motion                       │
└─────────────────────────────────────┘
```

### Backend Layer

```
┌─────────────────────────────────────┐
│  Express.js                          │
│  TypeScript                          │
│  Mongoose ODM                        │
│  CORS Middleware                     │
└─────────────────────────────────────┘
```

### Database Layer

```
┌─────────────────────────────────────┐
│  MongoDB                             │
│  Database: ecommerce                 │
│  Collection: products                │
└─────────────────────────────────────┘
```

## File Organization

```
e-com/
│
├── Frontend (Next.js)
│   ├── app/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/          # React Context (Cart)
│   │   ├── lib/              # Utilities (API client)
│   │   ├── types/            # TypeScript interfaces
│   │   └── [routes]/         # Pages (home, shop, etc.)
│   └── public/               # Static assets
│
├── Backend (Express)
│   └── server/
│       ├── config/           # DB connection
│       ├── controllers/      # Business logic
│       ├── models/           # Data models
│       ├── routes/           # API endpoints
│       ├── scripts/          # Utilities (seed)
│       └── server.ts         # App entry point
│
├── Configuration
│   ├── .env                  # Backend config
│   ├── .env.local           # Frontend config
│   ├── package.json         # Dependencies
│   ├── tsconfig.json        # TypeScript config
│   ├── next.config.ts       # Next.js config
│   └── tailwind.config.js   # Tailwind config
│
└── Documentation
    ├── README.md            # Main docs
    ├── QUICKSTART.md        # Quick setup
    ├── SETUP.md            # Detailed setup
    ├── ARCHITECTURE.md      # This file
    └── CHANGES.md          # What changed
```

## API Response Format

All API responses follow this structure:

```typescript
{
  success: boolean;
  data?: T;              // Response data
  count?: number;        // For list responses
  message?: string;      // Success message
  error?: string;        // Error message
}
```

### Example: Get All Products

**Request:**

```
GET http://localhost:5000/api/products
```

**Response:**

```json
{
  "success": true,
  "count": 18,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "id": "1",
      "name": "Wireless Noise-Cancelling Headphones",
      "description": "Premium wireless headphones...",
      "price": 299.99,
      "originalPrice": 399.99,
      "image": "https://images.unsplash.com/...",
      "category": "Electronics",
      "rating": 4.8,
      "reviews": 1243,
      "inStock": true,
      "featured": true,
      "tags": ["wireless", "audio", "premium"],
      "createdAt": "2024-12-07T...",
      "updatedAt": "2024-12-07T..."
    }
    // ... more products
  ]
}
```

## Security Considerations

### Current Implementation

- ✅ CORS enabled for cross-origin requests
- ✅ Environment variables for sensitive data
- ✅ MongoDB connection string in .env
- ✅ .env files in .gitignore

### Production Recommendations

- 🔒 Add authentication/authorization
- 🔒 Implement rate limiting
- 🔒 Add input validation
- 🔒 Use HTTPS
- 🔒 Sanitize user inputs
- 🔒 Add request logging
- 🔒 Implement API versioning

## Scalability

### Current Setup (Development)

- Single Node.js process
- Local MongoDB instance
- Direct API calls

### Production Considerations

- Load balancing (multiple Express instances)
- MongoDB Atlas (managed, scalable)
- CDN for static assets
- Redis for caching
- Message queues for async tasks
- Microservices architecture

## Development Workflow

```
1. Make changes to code
2. Files auto-reload (tsx watch / Next.js)
3. Test in browser
4. Commit changes
5. Deploy to production
```

### Running Multiple Processes

```bash
# All in one (recommended)
npm run dev

# Or separately for debugging
Terminal 1: npm run dev:frontend
Terminal 2: npm run dev:backend
```

## Monitoring & Debugging

### Backend

- Console logs in terminal
- MongoDB logs
- Health check: http://localhost:5000/api/health

### Frontend

- Browser DevTools console
- React DevTools
- Network tab for API calls

### Database

- MongoDB Compass (GUI)
- mongo shell (CLI)

---

This architecture provides a solid foundation for a modern e-commerce application with clear separation of concerns and room for growth.
