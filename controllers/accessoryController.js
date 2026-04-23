import Accessory from "../models/Accessory.js";
import {
  successResponse,
  createdResponse,
  badRequest,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

// CREATE
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
      description
    });
    const saved = await accessory.save();
    return createdResponse(res, saved, "Accessory created successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


// GET ALL + FILTER + SEARCH
export const getAllAccessories = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, keyword } = req.query;
    let filter = {};
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }
    const accessories = await Accessory.find(filter);
    return successResponse(res, accessories, "Accessories fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


// GET BY ID
export const getAccessoryById = async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) {
      return notFound(res, "Accessory not found");
    }
    return successResponse(res, accessory, "Accessory fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


// UPDATE
export const updateAccessory = async (req, res) => {
  try {
    const updated = await Accessory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return notFound(res, "Accessory not found");
    }
    return successResponse(res, updated, "Accessory updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


// DELETE
export const deleteAccessory = async (req, res) => {
  try {
    const deleted = await Accessory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return notFound(res, "Accessory not found");
    }
    return successResponse(res, null, "Accessory deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};