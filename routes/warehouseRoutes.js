import express from "express";
import {
  createWarehouse,
  getAllWarehouse,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse
} from "../controllers/warehouseController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "accountant"), createWarehouse);
router.get("/", protect, getAllWarehouse);
router.get("/:id", protect, getWarehouseById);
router.put("/:id", protect, authorize("admin", "accountant"), updateWarehouse);
router.delete("/:id", protect, authorize("admin"), deleteWarehouse);

export default router;