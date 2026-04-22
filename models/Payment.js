import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      default: 0,
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

    status: {
      type: String,
      enum: ["pending", "completed", "failed"], 
      default: "pending", 
    },
  },
  { timestamps: true },
);

export default mongoose.model("Payment", paymentSchema);
