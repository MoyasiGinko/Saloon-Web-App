const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  satus: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  hide: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  price: {
    type: Number, // Price in your currency
    required: true,
  },
  category: {
    type: String, // Category of the service
    required: true,
  },
  staff: {
    type: String,
    required: true,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "StaffMember",
  },
  location: {
    type: String, // Location where the service is offered
    required: true,
  },
  image: {
    type: String, // URLs of images showcasing the service
    required: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the user who left the review
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Service = mongoose.model("Service", serviceSchema);
