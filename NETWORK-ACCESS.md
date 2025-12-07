# Network Access Configuration ✅

## Problem Solved
Products weren't showing when accessing the app from the network IP `http://192.168.0.133:3000/shop` because the frontend was trying to connect to `localhost:5001` API, which doesn't work from other devices.

## Solution Applied

Changed `.env.local` to use the network IP address:

```bash
# Before (only works on local machine)
NEXT_PUBLIC_API_URL=http://localhost:5001/api

# After (works from any device on your network)
NEXT_PUBLIC_API_URL=http://192.168.0.133:5001/api
```

## How It Works Now

### Local Access (Your Mac)
- Frontend: http://localhost:3000 or http://192.168.0.133:3000
- Backend: http://192.168.0.133:5001
- ✅ Both work!

### Network Access (Phone, Tablet, Other Devices)
- Frontend: http://192.168.0.133:3000
- Backend: http://192.168.0.133:5001
- ✅ Both work!

## To Use the App

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Access from your Mac:**
   - http://localhost:3000
   - http://192.168.0.133:3000

3. **Access from other devices (phone, tablet):**
   - http://192.168.0.133:3000
   - Make sure your device is on the same WiFi network

## Verification

After starting the app, you should see:
```
🚀 Server is running on http://localhost:5001
🌐 Network: http://192.168.0.133:5001
📡 API endpoint: http://localhost:5001/api/products
```

## Testing

### Test Backend API
```bash
# From your Mac
curl http://192.168.0.133:5001/api/products

# Should return JSON with products
```

### Test Frontend
1. Open browser: http://192.168.0.133:3000/shop
2. Products should now load correctly
3. Check browser console (F12) - no errors should appear

## Important Notes

### If Your IP Changes
If your Mac's IP address changes (e.g., after reconnecting to WiFi), update `.env.local`:

1. Find your current IP:
   ```bash
   ipconfig getifaddr en0  # WiFi
   # or
   ipconfig getifaddr en1  # Ethernet
   ```

2. Update `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://YOUR_NEW_IP:5001/api
   ```

3. Restart the app:
   ```bash
   npm run dev
   ```

### Firewall Settings
If you still can't access from other devices, check macOS firewall:

1. Go to **System Settings** > **Network** > **Firewall**
2. Make sure incoming connections are allowed for Node.js
3. Or temporarily disable firewall for testing

### For Production
In production, you would:
- Use environment variables that automatically detect the correct URL
- Use a proper domain name instead of IP address
- Set up HTTPS for security
- Configure CORS properly for your domain

## Environment Files

### Development (Current Setup)
```bash
# .env (Backend)
PORT=5001

# .env.local (Frontend)
NEXT_PUBLIC_API_URL=http://192.168.0.133:5001/api
```

### Local Development Only
If you only develop on your Mac (not testing on phone):
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Dynamic Setup (Advanced)
For automatic IP detection, you could use:
```javascript
// In your API client
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Use the current host's IP
    const host = window.location.hostname;
    return `http://${host}:5001/api`;
  }
  return 'http://localhost:5001/api';
};
```

## Troubleshooting

### "Error loading products"
1. Check backend is running: `curl http://192.168.0.133:5001/api/health`
2. Check `.env.local` has correct IP
3. Restart the app: `npm run dev`

### "Connection refused"
- Backend might not be running
- Port 5001 might be blocked by firewall
- IP address might be wrong

### "CORS error"
- Already configured in `server/server.ts`
- Should work by default

### Products load on localhost but not network IP
- You forgot to update `.env.local` with network IP
- Restart Next.js after changing `.env.local`

---

✅ **Setup Complete!** You can now access your e-commerce app from any device on your network!
