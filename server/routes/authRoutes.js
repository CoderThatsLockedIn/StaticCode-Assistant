import express from 'express';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  verifySession 
} from '../controllers/controllers.Auth.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/verify', protect, verifySession);

// CRITICAL: Ensure this default export is at the very bottom
export default router;
