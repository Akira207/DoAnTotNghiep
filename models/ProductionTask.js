import mongoose from "mongoose";

const productionTaskSchema = new mongoose.Schema(
  {
    orderDetailId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetail",
      required: true,
    },

    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 🔥 thêm batch
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionBatch",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    // 🔥 thêm tiến độ (rất hữu ích cho production)
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    startDate: Date,
    endDate: Date, // 👈 thêm để track hoàn thành

    note: String,

    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("ProductionTask", productionTaskSchema);