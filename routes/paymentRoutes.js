import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} from "../controllers/paymentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "accountant"), createPayment);
router.get("/", protect, getAllPayments);
router.get("/:id", protect, getPaymentById);
router.put("/:id", protect, authorize("admin", "accountant"), updatePayment);
router.delete("/:id", protect, authorize("admin"), deletePayment);

export default router;