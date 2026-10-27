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

const allowedOrigins = [
  'http://localhost:5173',                  // For local development
  'https://static-code-assistant.vercel.app',
  'https://static-code-assistant.vercel.app/'// Your live frontend Vercel URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Blocked by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true // Required for sending cookies across domains
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
