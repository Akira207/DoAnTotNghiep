import mongoose from "mongoose";

const productionBatchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["planned", "active", "completed"],
      default: "planned",
    },

    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProductionBatch = mongoose.model(
  "ProductionBatch",
  productionBatchSchema
);

export default ProductionBatch;