import express from "express";
import {
  createFullOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controllers/orderController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// CORE API
router.post("/create-full-order", protect, authorize("admin", "accountant"), createFullOrder);

// CRUD
router.get("/", protect, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, authorize("admin", "accountant"), updateOrder);
router.delete("/:id", protect, authorize("admin", "accountant"), deleteOrder);

export default router;