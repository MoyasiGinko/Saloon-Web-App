import mangoose from "mongoose";

const categoryShema = new mangoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Category = mangoose.model("Category", categoryShema);
