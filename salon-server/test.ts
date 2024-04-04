import mongoose, { ConnectOptions } from 'mongoose';
import './dotenv'
import { Product } from './src/models/Product';

const uri = process.env.DB_URI || '';

const connectToDatabase = async()  =>{
  try {
    await mongoose.connect(uri);
    console.log('Database connected');
  } catch (error: any) {
    console.error('Error connecting to the database:', error.message);
  }
}

const disconnectFromDatabase = async() => {
  try {
    await mongoose.connection.close();
    console.log('Database disconnected');
  } catch (error:any) {
    console.error('Error disconnecting from the database:', error.message);
  }
}

const createProduct = async () => {
  const productData = {
    name : 'Product 1',
    description : 'This is product description',
    price : 22,
    quantity : 10,
    image : 'http://img.example',
  }
  const product = new Product(productData)
  await product.save()
}

const main = async()  =>{
  await connectToDatabase();
  await createProduct();
  await disconnectFromDatabase();
}

main();

