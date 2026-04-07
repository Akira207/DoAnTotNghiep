import Accessory from "../models/Accessory.js";


// 🟢 CREATE
export const createAccessory = async (req, res) => {
  try {

    const { name, type, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const accessory = new Accessory({
      name,
      type,
      price,
      description
    });

    const saved = await accessory.save();

    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔵 GET ALL + FILTER + SEARCH
export const getAllAccessories = async (req, res) => {
  try {

    const { type, minPrice, maxPrice, keyword } = req.query;

    let filter = {};

    if (type) filter.type = type;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    const accessories = await Accessory.find(filter);

    res.json(accessories);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🟡 GET BY ID
export const getAccessoryById = async (req, res) => {
  try {

    const accessory = await Accessory.findById(req.params.id);

    if (!accessory) {
      return res.status(404).json({ message: "Accessory not found" });
    }

    res.json(accessory);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🟠 UPDATE
export const updateAccessory = async (req, res) => {
  try {

    const updated = await Accessory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Accessory not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔴 DELETE
export const deleteAccessory = async (req, res) => {
  try {

    const deleted = await Accessory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Accessory not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};