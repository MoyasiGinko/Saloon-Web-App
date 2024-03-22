import express from 'express';
import userRoutes  from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import loggerMiddleWare from './middlewares/loggerMiddleware';
import { connectDb } from '../config/database';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
app.use(cors(
  {
    origin: 'http://localhost:3001',
    credentials: true
  }
))
app.use(cookieParser());
app.use(loggerMiddleWare)

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api/users', userRoutes);
app.use('/api/prod', productRoutes);


process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});