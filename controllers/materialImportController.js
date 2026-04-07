import MaterialImport from "../models/MaterialImport.js";


// 🟢 CREATE
export const createMaterialImport = async (req, res) => {
  try {
    const {
      materialName,
      materialType,
      quantity,
      unit,
      price,
      importDate,
      supplier,
      note
    } = req.body;

    if (!materialName || !quantity || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (quantity < 0 || price < 0) {
      return res.status(400).json({ message: "Quantity and price must be >= 0" });
    }

    const item = new MaterialImport({
      materialName,
      materialType,
      quantity,
      unit,
      price,
      importDate,
      supplier,
      note
    });

    const saved = await item.save();
    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔵 GET ALL (có filter)
export const getAllMaterialImports = async (req, res) => {
  try {
    const { materialName, supplier, fromDate, toDate } = req.query;

    let filter = {};

    if (materialName) {
      filter.materialName = { $regex: materialName, $options: "i" };
    }

    if (supplier) {
      filter.supplier = supplier;
    }

    if (fromDate || toDate) {
      filter.importDate = {};
      if (fromDate) filter.importDate.$gte = new Date(fromDate);
      if (toDate) filter.importDate.$lte = new Date(toDate);
    }

    const list = await MaterialImport.find(filter);
    res.json(list);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🟡 GET BY ID
export const getMaterialImportById = async (req, res) => {
  try {
    const item = await MaterialImport.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(item);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🟠 UPDATE
export const updateMaterialImport = async (req, res) => {
  try {
    const {
      materialName,
      materialType,
      quantity,
      unit,
      price,
      importDate,
      supplier,
      note
    } = req.body;

    if (quantity && quantity < 0) {
      return res.status(400).json({ message: "Quantity must be >= 0" });
    }

    if (price && price < 0) {
      return res.status(400).json({ message: "Price must be >= 0" });
    }

    const updated = await MaterialImport.findByIdAndUpdate(
      req.params.id,
      {
        materialName,
        materialType,
        quantity,
        unit,
        price,
        importDate,
        supplier,
        note
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔴 DELETE
export const deleteMaterialImport = async (req, res) => {
  try {
    const deleted = await MaterialImport.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};