const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who made the reservation
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service", // Reference to the service being reserved
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  payment: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
