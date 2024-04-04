import mongoose from "mongoose";

const categoryShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Category = mongoose.model("Category", categoryShema);
