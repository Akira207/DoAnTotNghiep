import ProductionTask from "../models/ProductionTask.js";
import User from "../models/User.js";
import OrderDetail from "../models/OrderDetail.js";

// CREATE
export const createProductionTask = async (req, res) => {
  try {
    const { orderDetailId, workerId, status, startDate, note, images } =
      req.body;
    // check required
    if (!orderDetailId || !workerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // check tồn tại
    const worker = await User.findById(workerId);
    const orderDetail = await OrderDetail.findById(orderDetailId);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    if (!orderDetail) {
      return res.status(404).json({ message: "OrderDetail not found" });
    }
    const task = new ProductionTask({
      orderDetailId,
      workerId,
      status,
      startDate,
      note,
      images,
    });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL (populate)
export const getAllProductionTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) filter.status = status;
    const tasks = await ProductionTask.find(filter)
      .populate("workerId", "username role")
      .populate("orderDetailId");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
export const getProductionTaskById = async (req, res) => {
  try {
    const task = await ProductionTask.findById(req.params.id)
      .populate("workerId", "username role")
      .populate("orderDetailId");
    if (!task) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateProductionTask = async (req, res) => {
  try {
    const { status, startDate, note, images } = req.body;
    const allowedStatus = ["pending", "in_progress", "completed"];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updated = await ProductionTask.findByIdAndUpdate(
      req.params.id,
      { status, startDate, note, images },
      { new: true },
    );
    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteProductionTask = async (req, res) => {
  try {
    const deleted = await ProductionTask.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
