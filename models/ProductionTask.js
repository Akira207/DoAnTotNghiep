import mongoose from "mongoose";

const ProductionTaskSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["order", "stock"],
      default: "stock",
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    orderDetailId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetail",
      default: null,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    batch: {
      type: Number,
      default: 1,
    },

    material: {
      type: String,
      default: "",
    },

    specs: {
      height: String,
      width: String,
      depth: String,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    note: String,

    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductionTask", ProductionTaskSchema);