import MaterialImport from "../models/MaterialImport.js";
import {
  successResponse,
  createdResponse,
  badRequest,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

// CREATE
export const createMaterialImport = async (req, res) => {
  try {
    const {
      materialName,
      materialType,
      quantity,
      unit,
      price,
      importDate,
      supplier,
      note,
    } = req.body;
    if (!materialName || !quantity || !price) {
      return badRequest(res, "Missing required fields");
    }
    if (quantity < 0 || price < 0) {
      return badRequest(res, "Quantity and price must be >= 0");
    }
    const item = new MaterialImport({
      materialName,
      materialType,
      quantity,
      unit,
      price,
      importDate,
      supplier,
      note,
    });
    const saved = await item.save();
    return createdResponse(res, saved, "Material import created successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET ALL (có filter)
export const getAllMaterialImports = async (req, res) => {
  try {
    const { materialName, supplier, fromDate, toDate } = req.query;
    let filter = {};
    if (materialName) {
      filter.materialName = { $regex: materialName, $options: "i" };
    }
    if (supplier) {
      filter.supplier = supplier;
    }
    if (fromDate || toDate) {
      filter.importDate = {};
      if (fromDate) filter.importDate.$gte = new Date(fromDate);
      if (toDate) filter.importDate.$lte = new Date(toDate);
    }
    const list = await MaterialImport.find(filter);
    return successResponse(res, list, "Material imports fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET BY ID
export const getMaterialImportById = async (req, res) => {
  try {
    const item = await MaterialImport.findById(req.params.id);
    if (!item) {
      return notFound(res, "Material import not found");
    }
    return successResponse(res, item, "Material import fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// UPDATE
export const updateMaterialImport = async (req, res) => {
  try {
    const {
      materialName,
      materialType,
      quantity,
      unit,
      price,
      importDate,
      supplier,
      note,
    } = req.body;
    if (quantity && quantity < 0) {
      return badRequest(res, "Quantity must be >= 0");
    }
    if (price && price < 0) {
      return badRequest(res, "Price must be >= 0");
    }
    const updated = await MaterialImport.findByIdAndUpdate(
      req.params.id,
      {
        materialName,
        materialType,
        quantity,
        unit,
        price,
        importDate,
        supplier,
        note,
      },
      { new: true },
    );
    if (!updated) {
      return notFound(res, "Material import not found");
    }
    return successResponse(res, updated, "Material import updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// DELETE
export const deleteMaterialImport = async (req, res) => {
  try {
    const deleted = await MaterialImport.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return notFound(res, "Material import not found");
    }

    return successResponse(res, null, "Material import deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
