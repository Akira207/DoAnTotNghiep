import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import {
  successResponse,
  createdResponse,
  badRequest,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      material,
      width,
      height,
      depth,
      price,
      description,
    } = req.body;

    const imagePaths = req.files
      ? req.files.map(
          (file) => `http://localhost:5000/uploads/${file.filename}`,
        )
      : [];

    const product = await Product.create({
      name,
      category,
      material,
      width,
      height,
      depth,
      price,
      images: imagePaths,
      description,
    });

    return createdResponse(res, product, "Product created successfully");
  } catch (error) {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    return errorResponse(res, 500, error.message);
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const products = await Product.find(filter);
    return successResponse(res, products, "Products fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return notFound(res, "Product not found");
    }
    return successResponse(res, product, "Product fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      material,
      width,
      height,
      depth,
      price,
      images,
      description,
    } = req.body;
    if (price && price < 0) {
      return badRequest(res, "Price must be >= 0");
    }
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        material,
        width,
        height,
        depth,
        price,
        images,
        description,
      },
      { new: true },
    );
    if (!updated) {
      return notFound(res, "Product not found");
    }
    return successResponse(res, updated, "Product updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return notFound(res, "Product not found");
    }

    // Xoá các file hình ảnh vật lý
    if (product.images && product.images.length > 0) {
      product.images.forEach((imageUrl) => {
        // Trích xuất filename từ URL (ví dụ: http://localhost:5000/uploads/123.jpg -> uploads/123.jpg)
        const fileName = imageUrl.split("/uploads/")[1];
        if (fileName) {
          const filePath = path.join("uploads", fileName);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    return successResponse(res, null, "Product and associated images deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
