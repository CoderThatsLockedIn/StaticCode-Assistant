import ReviewSession from '../models/models.ReviewSession.js';
import { analyzeCode } from '../utils/staticAnalyzer.js';

// Submit code for static analysis and save session
export const createReviewSession = async (req, res) => {
  try {
    const { title, language, sourceCode } = req.body;

    if (!sourceCode || !language) {
      return res.status(400).json({ error: 'Please provide both sourceCode and language.' });
    }

    // Await AI analysis
    const analysisResult = await analyzeCode(sourceCode, language);

    const newSession = await ReviewSession.create({
      user: req.user._id,
      title: title || 'Untitled Snippet',
      language,
      sourceCode,
      status: 'completed',
      summary: analysisResult.summary,
      findings: analysisResult.findings
    });

    res.status(201).json({
      success: true,
      message: 'Code analysis completed successfully.',
      data: newSession
    });
  } catch (error) {
    console.error('Review generation error:', error);
    res.status(500).json({ error: 'Server error during code analysis.' });
  }
};

// Get all past review sessions for the logged-in user
export const getReviewHistory = async (req, res) => {
  try {
    const sessions = await ReviewSession.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-sourceCode');
      
    res.status(200).json({ success: true, count: sessions.length, data: sessions });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Server error while fetching history.' });
  }
};

// Get a single review session by ID (secured to user)
export const getReviewById = async (req, res) => {
  try {
    const session = await ReviewSession.findOne({ _id: req.params.id, user: req.user._id });
    if (!session) {
      return res.status(404).json({ error: 'Review session not found.' });
    }
    res.status(200).json({ success: true, data: session });
  } catch (error) {
    console.error('Error fetching review session:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};