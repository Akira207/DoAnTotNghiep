import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../controllers/customerController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "accountant"), createCustomer);
router.get("/", protect, getAllCustomers);
router.get("/:id", protect, getCustomerById);
router.put("/:id", protect, authorize("admin", "accountant"), updateCustomer);
router.delete("/:id", protect, authorize("admin"), deleteCustomer);

export default router;