import express from "express";
import {
  createWarehouse,
  getAllWarehouse,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse
} from "../controllers/warehouseController.js";

const router = express.Router();

router.post("/", createWarehouse);
router.get("/", getAllWarehouse);
router.get("/:id", getWarehouseById);
router.put("/:id", updateWarehouse);
router.delete("/:id", deleteWarehouse);

export default router;