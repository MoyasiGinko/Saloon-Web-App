import mongoose from 'mongoose';
import '../dotenv'
const uri = process.env.DB_URI || '';

export const connectDb = () => {
  mongoose.connect(uri)
    .then(() => {
      console.log("Connnected to database");
    })
    .catch(() => {
      console.log("Connection failed");
    })

}

