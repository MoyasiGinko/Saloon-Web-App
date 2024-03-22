import mongoose from "mongoose";

const productShema = new mongoose.Schema({
  name: {
    type: "string",
    required: true
  },
  description: {
    type: "string",
    required: true
  },
  price: {
    type: "number",
    required: true
  },
  quantity: {
    type: "number",
    default: 0
  },
  image: {
    type: "string",
    required: true
  }
})

export const Product = mongoose.model('Product', productShema)