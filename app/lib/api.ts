const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}

// Get all products with optional filters
export async function getProducts(params?: {
  category?: string;
  featured?: boolean;
  search?: string;
}): Promise<ApiResponse<any[]>> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append("category", params.category);
    if (params?.featured) queryParams.append("featured", "true");
    if (params?.search) queryParams.append("search", params.search);

    const url = `${API_URL}/products${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await fetch(url, {
      cache: "no-store", // Disable caching for fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      data: [],
    };
  }
}

// Get single product by ID
export async function getProductById(id: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Create new product
export async function createProduct(
  productData: any
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Update product
export async function updateProduct(
  id: string,
  productData: any
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Delete product
export async function deleteProduct(id: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
