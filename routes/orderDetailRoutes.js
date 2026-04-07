import express from "express";
import {
  createOrderDetail,
  getAllOrderDetails,
  getOrderDetailById,
  updateOrderDetail,
  deleteOrderDetail
} from "../controllers/orderDetailController.js";

const router = express.Router();

router.post("/", createOrderDetail);
router.get("/", getAllOrderDetails);
router.get("/:id", getOrderDetailById);
router.put("/:id", updateOrderDetail);
router.delete("/:id", deleteOrderDetail);

export default router;