import express from "express";
import {
  createProductionTask,
  getAllProductionTasks,
  getProductionTaskById,
  updateProductionTask,
  deleteProductionTask
} from "../controllers/productionTaskController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin", "accountant"), createProductionTask);
router.get("/", protect, getAllProductionTasks);
router.get("/:id", protect, getProductionTaskById);
router.put("/:id", protect, authorize("admin", "worker"), updateProductionTask);
router.delete("/:id", protect, authorize("admin", "accountant"), deleteProductionTask);

export default router;