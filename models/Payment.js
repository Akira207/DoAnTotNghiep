import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: false,
    },

    amount: {
      type: Number,
      required: true,
      default: 0,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
      default: "income",
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "card", "bank"],
      default: "cash",
    },

    materialImportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaterialImport",
      required: false,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"], 
      default: "pending", 
    },
  },
  { timestamps: true },
);

export default mongoose.model("Payment", paymentSchema);
