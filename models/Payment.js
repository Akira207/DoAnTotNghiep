import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },

  amount: Number,

  paymentDate: Date,

  paymentMethod: String,

  status: String

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);