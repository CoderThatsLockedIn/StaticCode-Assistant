import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register User (Passes plain password; User model pre-save hook handles hashing safely)
router.post('/register', async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;
    const nameToUse = fullName || username;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const newUser = new User({ 
      fullName: nameToUse, 
      username: nameToUse, 
      email, 
      password // Plain text password, handled by model pre-save hook
    });
    
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ 
      success: true, 
      message: 'Registered successfully', 
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email } 
    });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ 
      success: true, 
      message: 'Logged in successfully', 
      user: { id: user._id, fullName: user.fullName || user.username, email: user.email } 
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Logout User
router.post('/logout', (req, res) => {
  res.clearCookie('token', { 
    httpOnly: true, 
    sameSite: 'strict' 
  });
  res.json({ success: true, message: 'Logged out successfully' });
});

// Verify Session
router.get('/verify', async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.json({ isAuthenticated: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.json({ isAuthenticated: false });
    }

    res.json({ 
      isAuthenticated: true, 
      user 
    });
  } catch (err) {
    res.json({ isAuthenticated: false });
  }
});

export default router;