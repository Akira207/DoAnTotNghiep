import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", protect, authorize("admin", "accountant"), upload.array("images", 5), createProduct);

router.get("/", protect, getAllProducts);
router.get("/:id", protect, getProductById);
router.put("/:id", protect, authorize("admin", "accountant"), upload.array("images", 5), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;