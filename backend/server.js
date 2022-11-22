import express from 'express';
import data from './data.js';
import mongose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import stripeRouter from './routes/stripeRouter.js';

dotenv.config();

mongose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);

app.use('/api/products', productRouter);

app.use('/api/users', userRouter);

app.use('/api/orders', orderRouter);

app.use('/api/stripe', stripeRouter);

//if any error cought by express asyc handler then it will be handle by below middle ware.

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
