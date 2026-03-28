import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  material: String,

  width: Number,
  height: Number,
  depth: Number,

  price: Number,

  images: [String],

  description: String
}, { timestamps: true });

export default mongoose.model("Product", productSchema);