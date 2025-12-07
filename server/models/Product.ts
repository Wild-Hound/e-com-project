import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  tags?: string[];
  specifications?: Record<string, string>;
}

const ProductSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: { type: Number, required: true, default: 0 },
    inStock: { type: Boolean, required: true, default: true },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    specifications: { type: Map, of: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
