import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },

  orderDate: Date,

  totalAmount: Number,

  status: {
    type: String,
    default: "created"
  },

  note: String

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);