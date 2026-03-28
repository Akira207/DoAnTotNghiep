import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  description: String
}, { timestamps: true });

export default mongoose.model("Accessory", accessorySchema);