import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    location: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["in_stock", "low_stock", "out_of_stock", "ready_to_ship"],
      default: "in_stock"
    },
    reservedQuantity: {
      type: Number,
      default: 0
    },
    note: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Warehouse", warehouseSchema);