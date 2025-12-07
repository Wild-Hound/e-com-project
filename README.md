# 🛍️ Modern E-Commerce Platform

A full-stack e-commerce application built with Next.js 16, React 19, Express.js, and MongoDB.

![Tech Stack](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![Express](https://img.shields.io/badge/Express-4.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## ✨ Features

- 🎨 Modern, responsive UI with dark mode support
- 🛒 Full shopping cart functionality
- 📦 Product catalog with categories and filtering
- ⭐ Product ratings and reviews
- 🔍 Search functionality
- 💳 Checkout process
- 📱 Mobile-first design
- 🎭 Smooth animations with Framer Motion
- 🌐 RESTful API backend
- 💾 MongoDB database integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and Install**

   ```bash
   npm install
   ```

2. **Check Setup**

   ```bash
   ./check-setup.sh
   ```

3. **Install MongoDB** (if not installed)

   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@8.0
   brew services start mongodb-community@8.0
   ```

4. **Seed Database**

   ```bash
   npm run seed
   ```

5. **Start Development**

   ```bash
   npm run dev
   ```

6. **Open Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

📖 **For detailed setup instructions, see [QUICKSTART.md](./QUICKSTART.md)**

## 🏗️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **TypeScript** - Type safety
- **CORS** - Cross-origin support

## 📁 Project Structure

```
e-com/
├── app/                    # Next.js frontend
│   ├── components/         # React components
│   ├── context/           # State management
│   ├── lib/               # API utilities
│   ├── types/             # TypeScript types
│   └── [routes]/          # Page routes
├── server/                 # Express backend
│   ├── config/            # Configuration
│   ├── controllers/       # Business logic
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── scripts/           # Utilities
└── public/                # Static assets
```

## 🔌 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products?category=Electronics` - Filter by category
- `GET /api/products?featured=true` - Get featured products
- `GET /api/products?search=wireless` - Search products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Health

- `GET /api/health` - Check server status

## 🛠️ Available Scripts

```bash
npm run dev          # Start frontend + backend
npm run dev:frontend # Start Next.js only
npm run dev:backend  # Start Express only
npm run build        # Build for production
npm run start        # Start production server
npm run seed         # Seed database with sample data
npm run lint         # Run ESLint
```

## 🌍 Environment Variables

Create `.env` and `.env.local` files (see `.env.example`):

```bash
# .env (Backend)
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000

# .env.local (Frontend)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📸 Screenshots

Visit the running application to see:

- Home page with hero section
- Shop with filtering and sorting
- Product detail pages
- Shopping cart
- Checkout flow

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 💡 Need Help?

- Check [QUICKSTART.md](./QUICKSTART.md) for quick setup
- See [SETUP.md](./SETUP.md) for detailed documentation
- Run `./check-setup.sh` to diagnose issues

---

Built with ❤️ using Next.js, Express, and MongoDB
