import ProductionTask from "../models/ProductionTask.js";
import User from "../models/User.js";
import OrderDetail from "../models/OrderDetail.js";

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
      return res.status(400).json({
        message: "productId or orderDetailId is required",
      });
    }

    let finalProductId = productId;

    // nếu tạo từ đơn hàng → lấy product từ orderDetail
    if (!finalProductId && orderDetailId) {
      const orderDetail = await OrderDetail.findById(orderDetailId).populate(
        "productId"
      );

      if (!orderDetail) {
        return res.status(404).json({
          message: "OrderDetail not found",
        });
      }

      finalProductId = orderDetail.productId?._id;
    }

    // worker optional
    let worker = null;
    if (workerId) {
      worker = await User.findById(workerId);
      if (!worker) {
        return res.status(404).json({
          message: "Worker not found",
        });
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

    return res.status(201).json(result);
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    return res.status(500).json({
      message: error.message,
    });
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
      const product =
        task.productId || task.orderDetailId?.productId || null;

      return {
        ...task.toObject(),
        product, // frontend chỉ dùng field này
      };
    });

    return res.json(result);
  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    return res.status(500).json({
      message: error.message,
    });
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
      return res.status(404).json({ message: "Not found" });
    }

    const product =
      task.productId || task.orderDetailId?.productId || null;

    return res.json({
      ...task.toObject(),
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   UPDATE TASK
========================= */
export const updateProductionTask = async (req, res) => {
  try {
    const { status, startDate, note, images, progress } = req.body;

    const allowedStatus = ["pending", "in-progress", "completed"];

    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

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
      })
      .populate("workerId", "username role");

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    const product =
      updated.productId || updated.orderDetailId?.productId || null;

    return res.json({
      ...updated.toObject(),
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   DELETE TASK
========================= */
export const deleteProductionTask = async (req, res) => {
  try {
    const deleted = await ProductionTask.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};