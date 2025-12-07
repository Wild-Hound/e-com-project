import { Request, Response } from "express";
import Product from "../models/Product";

// Get all products with optional filtering
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, featured, search } = req.query;
    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search as string, "i")] } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Create new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
