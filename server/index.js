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
  'http://localhost:5173',
  'https://static-code-assistant.vercel.app',
  'https://static-code-assistant-2ihaf4wo2.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile, server-to-server)
    if (!origin) return callback(null, true);
    
    // Check exact whitelist or allow any .vercel.app deployment preview
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle OPTIONS preflight requests explicitly
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

// Only listen locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
