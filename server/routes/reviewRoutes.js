import express from 'express';
import { createReviewSession, getReviewHistory, getReviewById } from '../controllers/controllers.Review.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createReviewSession)
  .get(protect, getReviewHistory);

router.route('/:id')
  .get(protect, getReviewById);

export default router;