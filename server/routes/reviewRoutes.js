import express from 'express';
import { createReviewSession, getReviewHistory, getReviewById } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getReviewSession)
  .post(protect, createReviewHistory);

// CRITICAL: This route must exist to feed data into ReviewDetail.jsx
router.route('/:id')
  .get(protect, getReviewById);

export default router;
