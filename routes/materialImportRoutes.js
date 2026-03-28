import express from "express";
import MaterialImport from "../models/MaterialImport.js";

const router = express.Router();

// Create
router.post("/", async (req, res) => {
  const item = new MaterialImport(req.body);
  const saved = await item.save();
  res.json(saved);
});

// Read
router.get("/", async (req, res) => {
  const list = await MaterialImport.find();
  res.json(list);
});

// Read single
router.get("/:id", async (req, res) => {
  const item = await MaterialImport.findById(req.params.id);
  res.json(item);
});

// Update
router.put("/:id", async (req, res) => {
  const updated = await MaterialImport.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await MaterialImport.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;