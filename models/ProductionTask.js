import mongoose from "mongoose";

const productionTaskSchema = new mongoose.Schema({
  orderDetailId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderDetail"
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    default: "pending"
  },
  startDate: Date,
  note: String,
  images: [String]
}, { timestamps: true });

export default mongoose.model("ProductionTask", productionTaskSchema);