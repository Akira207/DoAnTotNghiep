import express from "express";
import {
  createAccessory,
  getAllAccessories,
  getAccessoryById,
  updateAccessory,
  deleteAccessory
} from "../controllers/accessoryController.js";

const router = express.Router();

router.post("/", createAccessory);
router.get("/", getAllAccessories);
router.get("/:id", getAccessoryById);
router.put("/:id", updateAccessory);
router.delete("/:id", deleteAccessory);

export default router;