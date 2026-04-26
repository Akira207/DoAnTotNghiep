import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, default: "Khác" },
    price: { type: Number, required: true },
    description: String,
    image: { type: String, default: "" },
    sku: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Accessory", accessorySchema);