import Accessory from "../models/Accessory.js";
import {
  successResponse,
  createdResponse,
  badRequest,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

// =======================
// CREATE (có upload ảnh)
// =======================
export const createAccessory = async (req, res) => {
  try {
    const { name, type, price, description } = req.body;

    if (!name || !price) {
      return badRequest(res, "Name and price are required");
    }

    const accessory = new Accessory({
      name,
      type,
      price,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      sku: "ACC-" + Date.now(),
    });

    const saved = await accessory.save();

    return createdResponse(res, saved, "Accessory created successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =======================
// GET ALL + SEARCH + PAGINATION
// =======================
export const getAllAccessories = async (req, res) => {
  try {
    const {
      type,
      minPrice,
      maxPrice,
      keyword,
      page = 1,
      limit = 8,
    } = req.query;

    let filter = {};

    // filter type
    if (type) filter.type = type;

    // filter price
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // search keyword (multi field)
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { type: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const list = await Accessory.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Accessory.countDocuments(filter);

    return successResponse(res, {
      data: list,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =======================
// GET BY ID
// =======================
export const getAccessoryById = async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);

    if (!accessory) {
      return notFound(res, "Accessory not found");
    }

    return successResponse(res, accessory);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =======================
// UPDATE (có update ảnh)
// =======================
export const updateAccessory = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Accessory.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!updated) {
      return notFound(res, "Accessory not found");
    }

    return successResponse(res, updated, "Updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// =======================
// DELETE
// =======================
export const deleteAccessory = async (req, res) => {
  try {
    const deleted = await Accessory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return notFound(res, "Accessory not found");
    }

    return successResponse(res, null, "Deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};