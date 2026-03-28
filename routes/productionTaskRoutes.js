import express from "express";
import ProductionTask from "../models/ProductionTask.js";

const router = express.Router();

// Create
router.post("/", async (req, res) => {
  const task = new ProductionTask(req.body);
  const saved = await task.save();
  res.json(saved);
});

// Get all
router.get("/", async (req, res) => {
  const tasks = await ProductionTask.find();
  res.json(tasks);
});

// Get by ID
router.get("/:id", async (req, res) => {
  const task = await ProductionTask.findById(req.params.id);
  res.json(task);
});

// Update
router.put("/:id", async (req, res) => {
  const updated = await ProductionTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await ProductionTask.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;