import MaterialImport from "../models/MaterialImport.js";
import Payment from "../models/Payment.js";
import {
  successResponse,
  createdResponse,
  badRequest,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

/* =========================
   CREATE
   ========================= */
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

    // ✅ Tự động tạo Payment cho lịch sử nhập kho
    const totalAmount = Number(quantity) * Number(price) || 0;
    console.log(`Creating payment for material import. Amount: ${totalAmount}`);
    await new Payment({
      amount: totalAmount,
      type: "expense",
      paymentMethod: "bank", // mặc định chuyển khoản
      paymentDate: new Date(),
      status: "completed",
      orderId: null, // Không gắn với đơn hàng cụ thể
      materialImportId: saved._id, // Gắn với bản ghi nhập kho
    }).save();

    return createdResponse(res, saved, "Material import and corresponding payment created successfully");
  } catch (error) {
    console.error("CREATE MATERIAL IMPORT ERROR:", error);
    return errorResponse(res, 500, error.message);
  }
};

/* =========================
   GET ALL (SEARCH + FILTER + PAGINATION)
   ========================= */
export const getAllMaterialImports = async (req, res) => {
  try {
    const {
      materialName,
      supplier,
      fromDate,
      toDate,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};

    // SEARCH MATERIAL NAME
    if (materialName) {
      filter.materialName = {
        $regex: materialName,
        $options: "i",
      };
    }

    // SEARCH SUPPLIER
    if (supplier) {
      filter.supplier = {
        $regex: supplier,
        $options: "i",
      };
    }

    // DATE FILTER
    if (fromDate || toDate) {
      filter.importDate = {};
      if (fromDate) filter.importDate.$gte = new Date(fromDate);
      if (toDate) filter.importDate.$lte = new Date(toDate);
    }

    // PAGINATION
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * limitNumber;

    const list = await MaterialImport.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    const total = await MaterialImport.countDocuments(filter);

    // ✅ Tính tổng giá trị của tất cả các bản ghi khớp với filter (không phân trang)
    const aggregation = await MaterialImport.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalSum: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);

    const totalValueAllPages = aggregation.length > 0 ? aggregation[0].totalSum : 0;

    return successResponse(res, {
      data: list,
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      totalValueAllPages,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

/* =========================
   GET BY ID
   ========================= */
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

/* =========================
   UPDATE
   ========================= */
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
      { new: true }
    );

    if (!updated) {
      return notFound(res, "Material import not found");
    }

    // ✅ Cập nhật lại Payment tương ứng nếu quantity hoặc price thay đổi
    if (quantity !== undefined || price !== undefined) {
      const newTotal = Number(updated.quantity) * Number(updated.price) || 0;
      await Payment.findOneAndUpdate(
        { materialImportId: updated._id },
        { amount: newTotal }
      );
    }

    return successResponse(res, updated, "Material import updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

/* =========================
   DELETE
   ========================= */
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
