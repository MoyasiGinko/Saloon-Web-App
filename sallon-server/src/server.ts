import express from 'express';
import userRoutes  from './routes/userRoutes';
import loggerMiddleWare from './middlewares/loggerMiddleware';
import { connectDb } from '../config/database';

const app = express();
app.use(loggerMiddleWare)

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api/users', userRoutes);


process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});