import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  type: String
}, { timestamps: true });

export default mongoose.model("Customer", customerSchema);