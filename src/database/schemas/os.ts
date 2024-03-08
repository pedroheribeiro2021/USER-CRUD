import mongoose from "mongoose"

const OrderService = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  //   responsible_technician: {
  //     type: String,
  //     required: true,
  //   },
  responsible_technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    // enum: ["pending", "inProgress", "completed"],
    // default: "pending",
  },
  priority: {
    type: String,
  },
  date: {
    start: Date,
    end: Date,
  },
  localization: {
    lat: Number,
    long: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

export default mongoose.model("OrderService", OrderService)
