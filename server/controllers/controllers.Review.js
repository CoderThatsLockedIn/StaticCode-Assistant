import ReviewSession from '../models/models.ReviewSession.js';
import { analyzeCode } from '../utils/staticAnalyzer.js';

export const createReviewSession = async (req, res) => {
  try {
    const { title, language, sourceCode } = req.body;

    if (!sourceCode || !language) {
      return res.status(400).json({ error: 'Please provide both sourceCode and language.' });
    }

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

export const getReviewById = async (req, res) => {
  try {
    const review = await ReviewSession.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
