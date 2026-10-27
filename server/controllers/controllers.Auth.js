import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d'
  });
};

// Helper to send token as an HttpOnly cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: true,        // Force true for HTTPS on Vercel
    sameSite: 'none'     // CRITICAL: Required for cross-subdomain cookies on Vercel
  };

  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const user = await User.create({ username, email, password });

    if (user) {
      sendTokenResponse(user, 201, res);
    } else {
      res.status(400).json({ success: false, error: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Authenticate user & set token cookie
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      sendTokenResponse(user, 200, res);
    } else {
      res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
export const logoutUser = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
  res.status(200).json({ success: true, data: {} });
};
