import mongoose from "mongoose";

const materialImportSchema = new mongoose.Schema({
  materialName: String,
  materialType: String,
  quantity: Number,
  unit: String,
  price: Number,
  importDate: Date,
  supplier: String,
  note: String
}, { timestamps: true });

export default mongoose.model("MaterialImport", materialImportSchema);