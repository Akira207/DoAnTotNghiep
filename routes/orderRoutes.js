import express from "express";
import {
  createFullOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

// 🔥 CORE API
router.post("/create-full-order", createFullOrder);

// CRUD
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;