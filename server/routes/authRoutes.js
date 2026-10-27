import express from 'express';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  verifySession 
} from '../controllers/controllers.Auth.js';
import { protect } from '../middleware/authMiddleware.js'; // Adjust path to where your protect middleware lives

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// CRITICAL: 'protect' middleware must guard this route so it rejects requests without a valid cookie!
router.get('/verify', protect, verifySession);

export default router;
