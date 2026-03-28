import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

// Craete
router.post("/", async (req, res) => {
  const payment = new Payment(req.body);
  const saved = await payment.save();
  res.json(saved);
});

// Get all
router.get("/", async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

// Get by id
router.get("/:id", async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  res.json(payment);
});

// Update
router.put("/:id", async (req, res) => {
  const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Payment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;