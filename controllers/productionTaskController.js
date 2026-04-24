import ProductionTask from "../models/ProductionTask.js";
import User from "../models/User.js";
import OrderDetail from "../models/OrderDetail.js";
import Warehouse from "../models/WareHouse.js";
import {
  successResponse,
  createdResponse,
  badRequest,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

/* =========================
   CREATE PRODUCTION TASK
========================= */
export const createProductionTask = async (req, res) => {
  try {
    const {
      type,
      productId,
      quantity,
      batch,
      material,
      specs,
      note,
      workerId,
      orderId,
      orderDetailId,
    } = req.body;

    if (!productId && !orderDetailId) {
      return badRequest(res, "productId or orderDetailId is required");
    }

    let finalProductId = productId;

    // nếu tạo từ đơn hàng → lấy product từ orderDetail
    if (!finalProductId && orderDetailId) {
      const orderDetail =
        await OrderDetail.findById(orderDetailId).populate("productId");

      if (!orderDetail) {
        return notFound(res, "OrderDetail not found");
      }

      finalProductId = orderDetail.productId?._id;
    }

    // worker optional
    let worker = null;
    if (workerId) {
      worker = await User.findById(workerId);
      if (!worker) {
        return notFound(res, "Worker not found");
      }
    }

    const task = new ProductionTask({
      type: type || (orderDetailId ? "order" : "stock"),
      productId: finalProductId,
      quantity,
      batch,
      material,
      specs,
      note,
      workerId: workerId || null,
      orderId: orderId || null,
      orderDetailId: orderDetailId || null,
      status: "pending",
    });

    const saved = await task.save();

    const result = await ProductionTask.findById(saved._id)
      .populate("productId")
      .populate({
        path: "orderDetailId",
        populate: { path: "productId" },
      })
      .populate("workerId", "username role");

    return createdResponse(res, result, "Production task created successfully");
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    return errorResponse(res, 500, error.message);
  }
};

/* =========================
   GET ALL TASKS (FIX CORE)
========================= */
export const getAllProductionTasks = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const tasks = await ProductionTask.find(filter)
      .sort({ createdAt: -1 })
      .populate("productId")
      .populate({
        path: "orderDetailId",
        populate: { path: "productId" },
      })
      .populate("workerId", "username role");

    // 🔥 NORMALIZE DATA (QUAN TRỌNG NHẤT)
    const result = tasks.map((task) => {
      const product = task.productId || task.orderDetailId?.productId || null;

      return {
        ...task.toObject(),
        product, // frontend chỉ dùng field này
      };
    });

    return successResponse(
      res,
      result,
      "Production tasks fetched successfully",
    );
  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    return errorResponse(res, 500, error.message);
  }
};

/* =========================
   GET BY ID
========================= */
export const getProductionTaskById = async (req, res) => {
  try {
    const task = await ProductionTask.findById(req.params.id)
      .populate("productId")
      .populate({
        path: "orderDetailId",
        populate: { path: "productId" },
      })
      .populate("workerId", "username role");

    if (!task) {
      return notFound(res, "Production task not found");
    }

    const product = task.productId || task.orderDetailId?.productId || null;

    return successResponse(
      res,
      {
        ...task.toObject(),
        product,
      },
      "Production task fetched successfully",
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

/* =========================
   UPDATE TASK (FIX)
========================= */
export const updateProductionTask = async (req, res) => {
  try {
    const { status, startDate, note, images, progress } = req.body;

    const allowedStatus = ["pending", "in-progress", "completed"];

    if (status && !allowedStatus.includes(status)) {
      return badRequest(res, "Invalid status");
    }

    const oldTask = await ProductionTask.findById(req.params.id);

    const updated = await ProductionTask.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(startDate && { startDate }),
        ...(note && { note }),
        ...(images && { images }),
        ...(progress !== undefined && { progress }),
      },
      { new: true }
    )
      .populate("productId")
      .populate({
        path: "orderDetailId",
        populate: { path: "productId" },
      });

    if (!updated) {
      return notFound(res, "Production task not found");
    }

    // 🔥 AUTO ADD TO WAREHOUSE
    if (status === "completed" && oldTask.status !== "completed") {
      const existing = await Warehouse.findOne({
        productId: updated.productId,
      });

      if (existing) {
        existing.quantity += updated.quantity;
        await existing.save();
      } else {
        await Warehouse.create({
          productId: updated.productId,
          quantity: updated.quantity,
          location: "Kho chính",
        });
      }
    }

    const product =
      updated.productId || updated.orderDetailId?.productId || null;

    return successResponse(res, {
      ...updated.toObject(),
      product,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
/* =========================
   DELETE TASK
========================= */
export const deleteProductionTask = async (req, res) => {
  try {
    const deleted = await ProductionTask.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return notFound(res, "Production task not found");
    }

    return successResponse(res, null, "Production task deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
