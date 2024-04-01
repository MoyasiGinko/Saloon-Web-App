import mongoose from "mongoose";

const productShema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  price: {
    type: "number",
    required: true,
  },
  quantity: {
    type: "number",
    default: 0,
  },
  image: {
    type: "string",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: new mongoose.Types.ObjectId('660a79ef93737e026d58ab09')
  },
  
});


export const Product = mongoose.model("Product", productShema);

