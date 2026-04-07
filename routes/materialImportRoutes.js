import express from "express";
import {
  createMaterialImport,
  getAllMaterialImports,
  getMaterialImportById,
  updateMaterialImport,
  deleteMaterialImport
} from "../controllers/materialImportController.js";

const router = express.Router();

router.post("/", createMaterialImport);
router.get("/", getAllMaterialImports);
router.get("/:id", getMaterialImportById);
router.put("/:id", updateMaterialImport);
router.delete("/:id", deleteMaterialImport);

export default router;