import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  quantity: Number,
  price: Number,
  note: String

}, { timestamps: true });

export default mongoose.model("OrderDetail", orderDetailSchema);