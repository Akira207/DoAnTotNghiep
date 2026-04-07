import Product from "../models/Product.js";


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
      images,
      description
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    if (price < 0) {
      return res.status(400).json({ message: "Price must be >= 0" });
    }

    const product = new Product({
      name,
      category,
      material,
      width,
      height,
      depth,
      price,
      images,
      description
    });

    const saved = await product.save();
    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL PRODUCTS (có filter nhẹ)
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

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
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
      description
    } = req.body;

    if (price && price < 0) {
      return res.status(400).json({ message: "Price must be >= 0" });
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
        description
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};