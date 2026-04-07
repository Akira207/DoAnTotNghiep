import express from "express";
import {
  createProductionTask,
  getAllProductionTasks,
  getProductionTaskById,
  updateProductionTask,
  deleteProductionTask
} from "../controllers/productionTaskController.js";

const router = express.Router();

router.post("/", createProductionTask);
router.get("/", getAllProductionTasks);
router.get("/:id", getProductionTaskById);
router.put("/:id", updateProductionTask);
router.delete("/:id", deleteProductionTask);

export default router;