import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './src/routes/users.js';
import bookingsRouter from './src/routes/bookings.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);



app.get('/', (req, res) => {
  res.send('Urban Symbiosis API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});