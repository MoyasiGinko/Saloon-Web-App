import mongoose from 'mongoose';
const uri = "mongodb+srv://outsideworkibrahim:Gpu57mlt31IjBMvA@sallondb.71gszpy.mongodb.net/?retryWrites=true&w=majority&appName=SallonDB";

export const connectDb = () => {
  mongoose.connect(uri)
    .then(() => {
      console.log("Connnected to database");
    })
    .catch(() => {
      console.log("Connection failed");
    })

}

