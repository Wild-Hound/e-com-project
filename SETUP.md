# E-Commerce Full-Stack Setup Guide

This application is now a full-stack e-commerce platform with:

- **Frontend**: Next.js 16 with React 19
- **Backend**: Express.js REST API
- **Database**: MongoDB with Mongoose ODM

## Prerequisites

- Node.js (v18 or higher)
- MongoDB installed and running locally, or a MongoDB Atlas account

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**

- Install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service:

  ```bash
  # macOS
  brew services start mongodb-community

  # Or run manually
  mongod --config /usr/local/etc/mongod.conf
  ```

**Option B: MongoDB Atlas (Cloud)**

- Create a free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Update `.env` file with your connection string:
  ```
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce
  ```

### 3. Environment Variables

The project includes two environment files:

**.env** (for backend):

```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
```

**.env.local** (for frontend):

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Seed the Database

Populate MongoDB with sample products:

```bash
npm run seed
```

You should see:

```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Successfully seeded 18 products
```

### 5. Run the Application

Start both frontend and backend servers:

```bash
npm run dev
```

This will start:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

Or run them separately:

```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend
npm run dev:backend
```

## API Endpoints

### Products

- **GET** `/api/products` - Get all products
  - Query params: `?category=Electronics`, `?featured=true`, `?search=wireless`
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create new product
- **PUT** `/api/products/:id` - Update product
- **DELETE** `/api/products/:id` - Delete product

### Health Check

- **GET** `/api/health` - Server health status

## Example API Calls

```bash
# Get all products
curl http://localhost:5000/api/products

# Get products by category
curl http://localhost:5000/api/products?category=Electronics

# Get featured products only
curl http://localhost:5000/api/products?featured=true

# Search products
curl http://localhost:5000/api/products?search=wireless

# Get single product
curl http://localhost:5000/api/products/1

# Create new product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "id": "19",
    "name": "Test Product",
    "description": "A test product",
    "price": 99.99,
    "image": "https://via.placeholder.com/800",
    "category": "Electronics",
    "rating": 4.5,
    "reviews": 100,
    "inStock": true
  }'
```

## Project Structure

```
e-com/
├── app/                    # Next.js frontend
│   ├── components/         # React components
│   ├── context/           # React context (Cart, etc.)
│   ├── data/              # Static data (categories)
│   ├── lib/               # API client utilities
│   ├── types/             # TypeScript interfaces
│   └── [pages]/           # Next.js pages
├── server/                 # Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Request handlers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── scripts/           # Database scripts (seed)
│   └── server.ts          # Express app entry
├── .env                    # Backend environment variables
├── .env.local             # Frontend environment variables
└── package.json
```

## Troubleshooting

### MongoDB Connection Issues

1. **"MongooseError: Operation buffering timed out"**

   - Make sure MongoDB is running: `brew services list`
   - Check connection string in `.env`

2. **"ECONNREFUSED"**
   - MongoDB service not started
   - Run: `brew services start mongodb-community` (macOS)

### API Connection Issues

1. **"Failed to fetch products"**

   - Ensure backend is running on port 5000
   - Check `.env.local` has correct API URL
   - Verify CORS is enabled in `server/server.ts`

2. **Port Already in Use**
   - Change port in `.env`: `PORT=5001`
   - Update `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:5001/api`

## Development Tips

- Backend auto-restarts on file changes (using tsx watch)
- Frontend has hot-reload enabled
- Use `npm run seed` to reset database with sample data
- Check browser console and terminal for errors

## Next Steps

- Add user authentication
- Implement order management
- Add payment integration
- Deploy to production (Vercel + MongoDB Atlas)
