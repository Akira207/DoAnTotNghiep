import Warehouse from "../models/WareHouse.js";

// CREATE
export const createWarehouse = async (req, res) => {
  try {
    const data = new Warehouse(req.body);
    const saved = await data.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getAllWarehouse = async (req, res) => {
  try {
    const data = await Warehouse.find().populate("productId");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
export const getWarehouseById = async (req, res) => {
  try {
    const data = await Warehouse.findById(req.params.id).populate("productId");
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateWarehouse = async (req, res) => {
  try {
    const updated = await Warehouse.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteWarehouse = async (req, res) => {
  try {
    const deleted = await Warehouse.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
