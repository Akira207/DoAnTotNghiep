import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      unique: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    depositAmount: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "pending", // chờ sản xuất
        "producing", // đang sản xuất
        "transporting", // đang vận chuyển
        "waiting_payment", // chờ thanh toán
        "completed", // hoàn thành
        "cancelled", // huỷ
      ],
      default: "pending",
    },

    note: {
      type: String,
      default: "",
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
