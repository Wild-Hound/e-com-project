# Quick Start Guide 🚀

## Step 1: Install MongoDB (Choose One Option)

### Option A: Install MongoDB Locally (Recommended for Development)

```bash
# Install MongoDB using Homebrew
brew tap mongodb/brew
brew install mongodb-community@8.0

# Start MongoDB service
brew services start mongodb-community@8.0

# Verify MongoDB is running
brew services list | grep mongodb
```

### Option B: Use MongoDB Atlas (Cloud - No Installation)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a FREE account
3. Create a cluster (free tier M0)
4. Get your connection string
5. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   ```

## Step 2: Seed the Database

```bash
npm run seed
```

Expected output:

```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Successfully seeded 18 products
```

## Step 3: Start the Application

```bash
npm run dev
```

This starts:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Verify Everything Works

1. Open http://localhost:3000 in your browser
2. Visit the Shop page - you should see all products
3. Test the API: http://localhost:5000/api/products

## Common Issues

### "ECONNREFUSED" - MongoDB Not Running

```bash
# Start MongoDB
brew services start mongodb-community@8.0

# Or if not installed
brew tap mongodb/brew
brew install mongodb-community@8.0
```

### Backend Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
echo "PORT=5001" >> .env
```

## Next Steps

- ✅ Browse products at http://localhost:3000/shop
- ✅ View product details
- ✅ Add items to cart
- ✅ Test API endpoints at http://localhost:5000/api

For detailed documentation, see [SETUP.md](./SETUP.md)
