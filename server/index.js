import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Vite frontend origin
  credentials: true              // Required for cookies across domains/ports
}));
app.use(express.json());
app.use(cookieParser());           // Parse incoming cookies

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});