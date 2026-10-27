import express from 'express';
import { createReviewSession, getReviewHistory, getReviewById } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getReviewHistory)
  .post(protect, createReviewSession);

router.route('/:id')
  .get(protect, getReviewById);

export default router;
