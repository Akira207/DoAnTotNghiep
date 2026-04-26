import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  createAccessory,
  getAllAccessories,
  getAccessoryById,
  updateAccessory,
  deleteAccessory,
} from "../controllers/accessoryController.js";

const router = express.Router();

// CREATE (upload image)
router.post("/", upload.single("image"), createAccessory);

// GET ALL
router.get("/", getAllAccessories);

// GET BY ID
router.get("/:id", getAccessoryById);

// UPDATE (upload image)
router.put("/:id", upload.single("image"), updateAccessory);

// DELETE
router.delete("/:id", deleteAccessory);

export default router;
