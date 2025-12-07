import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import productRoutes from "./routes/productRoutes";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/products", productRoutes);

// Health check route
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`🌐 Network: http://192.168.0.133:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/products`);
});

export default app;
