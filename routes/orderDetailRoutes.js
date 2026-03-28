import express from "express";
import OrderDetail from "../models/OrderDetail.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const item = new OrderDetail(req.body);
  const saved = await item.save();
  res.json(saved);
});

// GET ALL
router.get("/", async (req, res) => {
  const list = await OrderDetail.find();
  res.json(list);
});

// GET ONE
router.get("/:id", async (req, res) => {
  const item = await OrderDetail.findById(req.params.id);
  res.json(item);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await OrderDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await OrderDetail.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;