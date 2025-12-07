# Port 5000 Issue on macOS - SOLVED ✅

## Problem

You were getting **403 Forbidden** errors when trying to access the backend API at `http://localhost:5000`.

## Root Cause

**Port 5000 is reserved by macOS AirPlay Receiver (Control Center)**

On macOS Monterey and later, Apple's AirPlay Receiver service runs on port 5000 by default, which conflicts with the Express backend server.

When you tried to access `http://localhost:5000/api/health`, you were actually hitting the AirPlay service instead of your Express server, which returned a 403 error.

Evidence from the curl response:

```
< HTTP/1.1 403 Forbidden
< Server: AirTunes/890.79.5
< X-Apple-ProcessingTime: 0
```

## Solution Applied ✅

Changed the backend port from **5000** to **5001**.

### Files Updated:

1. `.env` - Changed `PORT=5000` to `PORT=5001`
2. `.env.local` - Updated API URL to `http://localhost:5001/api`
3. `.env.example` - Updated example to show port 5001
4. `app/lib/api.ts` - Updated fallback URL to use port 5001

## How to Use

### Start the application:

```bash
npm run dev
```

### Access points:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Health Check**: http://localhost:5001/api/health
- **Products API**: http://localhost:5001/api/products

### Test the API:

```bash
# Health check
curl http://localhost:5001/api/health

# Get all products
curl http://localhost:5001/api/products

# Get single product
curl http://localhost:5001/api/products/1
```

## Alternative Solutions

If you still want to use port 5000, you need to disable AirPlay Receiver:

### Option 1: Disable AirPlay Receiver (Not Recommended)

1. Open **System Settings**
2. Go to **General** > **AirDrop & Handoff**
3. Turn off **AirPlay Receiver**

### Option 2: Use a Different Port (Recommended - Already Done ✅)

Keep using port 5001 as configured. This is the cleanest solution.

### Option 3: Use Any Other Port

You can use any available port by changing the `PORT` value in `.env`:

```
PORT=3001  # or 8000, 8080, etc.
```

Don't forget to update `.env.local` to match:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Verification

After starting the server with `npm run dev`, you should see:

```
🚀 Server is running on http://localhost:5001
📡 API endpoint: http://localhost:5001/api/products
✅ MongoDB connected successfully
```

The frontend should now successfully fetch products from the backend without any 403 errors.

## Common Ports Used by macOS Services

To avoid similar issues in the future, here are ports commonly used by macOS:

- **Port 5000**: AirPlay Receiver (Control Center)
- **Port 7000**: AirPlay (alternative)
- **Port 80**: System services
- **Port 443**: System services

**Safe ports for development**: 3001-3009, 5001-5009, 8000-8099, 9000-9099

---

✅ **Issue Resolved!** Your backend is now running on port 5001 and should work without any 403 errors.
