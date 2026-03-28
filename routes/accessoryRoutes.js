import express from "express";
import Accessory from "../models/Accessory.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const accessory = new Accessory(req.body);
    const saved = await accessory.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    res.json(accessory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Accessory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Accessory.findByIdAndDelete(req.params.id);
    res.json({ message: "Accessory deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;