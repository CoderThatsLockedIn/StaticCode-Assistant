import express from 'express';
import { 
  getReviewHistory, 
  getReviewById, 
  createReviewSession 
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js'; // Adjust path to your auth middleware

const router = express.Router();

// All review routes require authentication
router.route('/')
  .get(protect, getReviewHistory)
  .post(protect, createReviewSession);

router.route('/:id')
  .get(protect, getReviewById);

export default router;
