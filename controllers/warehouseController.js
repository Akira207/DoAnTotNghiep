import Warehouse from "../models/WareHouse.js";
import {
  successResponse,
  createdResponse,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

// CREATE
export const createWarehouse = async (req, res) => {
  try {
    const { quantity } = req.body;
    let status = req.body.status;

    if (quantity !== undefined) {
      if (quantity === 0) {
        status = "out_of_stock";
      } else if (quantity < 10) {
        status = "low_stock";
      } else {
        status = "in_stock";
      }
    }

    const data = new Warehouse({ ...req.body, status });
    const saved = await data.save();
    return createdResponse(res, saved, "Warehouse created successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET ALL
export const getAllWarehouse = async (req, res) => {
  try {
    const data = await Warehouse.find().populate("productId");

    const result = data.map((item) => {
      const product = item.productId || null;

      return {
        ...item.toObject(),
        product,
      };
    });

    return successResponse(res, result, "Warehouses fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET BY ID
export const getWarehouseById = async (req, res) => {
  try {
    const data = await Warehouse.findById(req.params.id).populate("productId");
    if (!data) {
      return notFound(res, "Warehouse not found");
    }
    return successResponse(res, data, "Warehouse fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// UPDATE
export const updateWarehouse = async (req, res) => {
  try {
    const { quantity } = req.body;
    let status = req.body.status;

    if (quantity !== undefined) {
      if (quantity === 0) {
        status = "out_of_stock";
      } else if (quantity < 10) {
        status = "low_stock";
      } else {
        status = "in_stock";
      }
    }

    const updated = await Warehouse.findByIdAndUpdate(
      req.params.id,
      { ...req.body, status },
      { new: true },
    );
    if (!updated) {
      return notFound(res, "Warehouse not found");
    }
    return successResponse(res, updated, "Warehouse updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// DELETE
export const deleteWarehouse = async (req, res) => {
  try {
    const deleted = await Warehouse.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return notFound(res, "Warehouse not found");
    }
    return successResponse(res, null, "Warehouse deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
