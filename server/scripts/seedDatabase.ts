import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";

dotenv.config();

const products = [
  // Electronics
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.",
    price: 299.99,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    rating: 4.8,
    reviews: 1243,
    inStock: true,
    featured: true,
    tags: ["wireless", "audio", "premium"],
    specifications: {
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.0",
      Weight: "250g",
      "Driver Size": "40mm",
    },
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.",
    price: 399.99,
    originalPrice: 499.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    rating: 4.6,
    reviews: 892,
    inStock: true,
    featured: true,
    tags: ["fitness", "smartwatch", "health"],
  },
  {
    id: "3",
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charger compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1591290619762-5a2c2a6c2a2e?w=800&h=800&fit=crop",
    category: "Electronics",
    rating: 4.4,
    reviews: 456,
    inStock: true,
    tags: ["charging", "wireless", "accessories"],
  },
  {
    id: "4",
    name: "4K Ultra HD Camera",
    description:
      "Professional mirrorless camera with 4K video recording, 24MP sensor, and interchangeable lenses.",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop",
    category: "Electronics",
    rating: 4.9,
    reviews: 324,
    inStock: true,
    featured: true,
    tags: ["camera", "photography", "professional"],
  },
  {
    id: "5",
    name: "Premium Leather Jacket",
    description:
      "Handcrafted genuine leather jacket with modern slim fit. Perfect for any occasion.",
    price: 349.99,
    originalPrice: 499.99,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
    category: "Fashion",
    rating: 4.7,
    reviews: 678,
    inStock: true,
    featured: true,
    tags: ["leather", "jacket", "men"],
  },
  {
    id: "6",
    name: "Classic Denim Jeans",
    description:
      "Comfortable stretch denim with classic fit. Available in multiple washes.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop",
    category: "Fashion",
    rating: 4.5,
    reviews: 1024,
    inStock: true,
    tags: ["denim", "jeans", "casual"],
  },
  {
    id: "7",
    name: "Designer Sneakers",
    description:
      "Limited edition sneakers with premium materials and cushioned sole for all-day comfort.",
    price: 159.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop",
    category: "Fashion",
    rating: 4.8,
    reviews: 892,
    inStock: true,
    tags: ["shoes", "sneakers", "limited edition"],
  },
  {
    id: "8",
    name: "Elegant Summer Dress",
    description:
      "Flowing summer dress made from breathable fabric. Perfect for warm weather.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=800&fit=crop",
    category: "Fashion",
    rating: 4.6,
    reviews: 543,
    inStock: true,
    featured: true,
    tags: ["dress", "summer", "women"],
  },
  {
    id: "9",
    name: "Designer Handbag",
    description:
      "Luxury leather handbag with gold hardware. Spacious interior with multiple compartments.",
    price: 449.99,
    originalPrice: 599.99,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop",
    category: "Fashion",
    rating: 4.9,
    reviews: 432,
    inStock: true,
    tags: ["handbag", "luxury", "accessories"],
  },
  {
    id: "10",
    name: "Modern Table Lamp",
    description:
      "Minimalist LED table lamp with adjustable brightness and color temperature.",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop",
    category: "Home & Living",
    rating: 4.5,
    reviews: 234,
    inStock: true,
    tags: ["lamp", "lighting", "modern"],
  },
  {
    id: "11",
    name: "Organic Cotton Bedding Set",
    description:
      "Luxurious 100% organic cotton bedding set. Includes duvet cover and pillowcases.",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=800&fit=crop",
    category: "Home & Living",
    rating: 4.7,
    reviews: 456,
    inStock: true,
    featured: true,
    tags: ["bedding", "organic", "cotton"],
  },
  {
    id: "12",
    name: "Ceramic Dinnerware Set",
    description:
      "Elegant 16-piece dinnerware set. Dishwasher and microwave safe.",
    price: 129.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=800&fit=crop",
    category: "Home & Living",
    rating: 4.6,
    reviews: 312,
    inStock: true,
    tags: ["dinnerware", "ceramic", "kitchen"],
  },
  {
    id: "13",
    name: "Yoga Mat Premium",
    description:
      "Extra thick non-slip yoga mat with carrying strap. Eco-friendly materials.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop",
    category: "Sports",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    tags: ["yoga", "fitness", "mat"],
  },
  {
    id: "14",
    name: "Adjustable Dumbbells Set",
    description:
      "Space-saving adjustable dumbbells ranging from 5 to 52.5 lbs. Perfect for home workouts.",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop",
    category: "Sports",
    rating: 4.8,
    reviews: 567,
    inStock: true,
    featured: true,
    tags: ["dumbbells", "fitness", "strength training"],
  },
  {
    id: "15",
    name: "Running Shoes Pro",
    description:
      "Professional running shoes with advanced cushioning and breathable mesh upper.",
    price: 139.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    category: "Sports",
    rating: 4.6,
    reviews: 1123,
    inStock: true,
    tags: ["running", "shoes", "athletic"],
  },
  {
    id: "16",
    name: "The Complete Programming Guide",
    description:
      "Comprehensive guide to modern programming languages and best practices.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=800&fit=crop",
    category: "Books",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    tags: ["book", "programming", "education"],
  },
  {
    id: "17",
    name: "Luxury Skincare Set",
    description:
      "Premium skincare collection with serum, moisturizer, and cleanser. All-natural ingredients.",
    price: 129.99,
    originalPrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop",
    category: "Beauty",
    rating: 4.8,
    reviews: 678,
    inStock: true,
    featured: true,
    tags: ["skincare", "beauty", "luxury"],
  },
  {
    id: "18",
    name: "Professional Hair Dryer",
    description:
      "Ionic hair dryer with multiple heat settings and cool shot button.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=800&fit=crop",
    category: "Beauty",
    rating: 4.5,
    reviews: 432,
    inStock: true,
    tags: ["hair", "styling", "professional"],
  },
];

const seedDatabase = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert new products
    await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
